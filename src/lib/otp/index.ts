import validator from "../../helper/validator"
import asyncHandler from "../../helper/asyncHandler"
import crypto from 'crypto'
import schema from "./schema"
import { AuthFailureError, InternalError, NotFoundError, TokenExpiredError } from "../../helper/ApiError"
import OtpController from "../../controllers/Otp"
import { otpInfo } from "../../config"
import Logger from "../../helper/Logger"
import generateRandomNumber from '../../helper/GenerateRandomNumber'


export const createOtp =async (data:string)=> {
  
  if(!data)
  {
    throw new NotFoundError("Data Not Found")
  }

  

  
  const otp =  generateRandomNumber(otpInfo.otpLength)
  const ttl = otpInfo.otpExpiryTimeInSeconds * 1000;
  const expires = Date.now() + ttl;
  const hashData = `${data}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", otpInfo.otpSecret).update(hashData).digest("hex");
  const fullHash = `${hash}.${expires}`;


const savedOtp   = await OtpController.create(data,fullHash)

  // sendOtp Via SMTP

  Logger.info(otp)
  
  return otp

}


export const  verifyOtp =async (userOtp:string,data:string)=> {
  
  if(!data)
  {
    throw new NotFoundError("data  not found")
  }

  const otpData = await OtpController.findOtp(data)

  const hash = otpData.hash 


  let [hashValue, expires] = hash.split(".");
  let now = Date.now();

  if (now > parseInt(expires)) {
    throw new TokenExpiredError("Timeout. Please resend OTP");
  }

  const hashData = `${data}.${userOtp}.${expires}`;

  const newCalculatedHash = crypto
    .createHmac("sha256", otpInfo.otpSecret)
    .update(hashData)
    .digest("hex");

  if (newCalculatedHash === hashValue) {

    Logger.info("verified")

    const deleteOtp = await OtpController.delete(data)
     if(deleteOtp){

       return userOtp;
     }
     throw new InternalError();


  } else {
      
    throw new AuthFailureError("Wrong OTP");
  }
  

}

