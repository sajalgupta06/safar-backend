import express from 'express';
import { SuccessResponse } from '../../../helper/ApiResponse';
import crypto from 'crypto';
import UserController from '../../../controllers/User';
import KeystoreController from '../../../controllers/Keystore';
import { BadRequestError, AuthFailureError, InternalError } from '../../../helper/ApiError';
import { createTokens, validatePassword } from '../../../lib/auth/authUtils';
import validator from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import { PublicRequest } from '../../../helper/app-request';
import { createOtp, verifyOtp } from '../../../lib/otp';
import { RoleCode } from '../../../models/Role';
import Logger from '../../../helper/Logger';





export const getOtpPhone = [

  validator(schema.phoneOtp),
  asyncHandler(async (req, res) => {

    const {phone} = req.body

    const user = await UserController.findByPhone(phone)
    
    const otp =  await createOtp(phone)

    new SuccessResponse('Otp Sent',{
      otp
    }).send(res);
  }),
];



export const checkOtpPhone = [

  validator(schema.checkPhoneOtp),
  asyncHandler(async (req, res) => {

      const {phone,otp} = req.body

      const verify = await verifyOtp(otp,phone)
      if(!verify){
        throw new InternalError()
      }

      const user = await UserController.findByPhone(phone)

      if(!user){
       
        const newUser = await UserController.createUser({
          firstName:"guest",
          phone:phone,
          role:RoleCode.CLIENT,
          phoneVerified:true,
          email:" "
        })

        if (!newUser) throw new InternalError();
       

        const accessTokenKey = crypto.randomBytes(64).toString('hex');
        const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    
        await KeystoreController.create(newUser._id, accessTokenKey, refreshTokenKey);
  
        const tokens = await createTokens(newUser, accessTokenKey, refreshTokenKey);
  
      
  
        return new SuccessResponse('User Logged In',{
          user:newUser,
          tokens:tokens
        }).send(res);
        
        
  

      }

      const accessTokenKey = crypto.randomBytes(64).toString('hex');
      const refreshTokenKey = crypto.randomBytes(64).toString('hex');
  
      await KeystoreController.create(user._id, accessTokenKey, refreshTokenKey);

      const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

    

      return new SuccessResponse('User Logged In',{
        user,
        tokens
      }).send(res);

 
  }),
];

