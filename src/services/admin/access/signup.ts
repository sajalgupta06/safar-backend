import { SuccessResponse } from '../../../helper/ApiResponse';
import { BadRequestError, AuthFailureError, InternalError } from '../../../helper/ApiError';
import { createTokens, validatePassword } from '../../../lib/auth/authUtils';
import validator from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import {createOtp,verifyOtp} from '../../../lib/otp/index'
import AdminController from '../../../controllers/Admin';
import Logger from '../../../helper/Logger';


export const getOtpPhone = [

  validator(schema.phoneOtp),
  asyncHandler(async (req, res) => {

    const {phone} = req.body


    const userByPhone = await AdminController.findByPhone(phone)
    if(userByPhone)
    {
        throw new BadRequestError(`User with Phone Number ${phone} already exists`)
    }

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

    new SuccessResponse('Otp Verified',{
      verify
    }).send(res);
  }),
];


export const getOtpEmail = [

  validator(schema.emailOtp),
  asyncHandler(async (req, res) => {

    const {email} = req.body

    const userByEmail = await AdminController.findByEmail(email)
    if(userByEmail)
    {
        throw new BadRequestError(`User with email ${email} already exists`)
    }


     await createOtp(email)

    new SuccessResponse('Otp Sent',{
      
    }).send(res);
  }),
];


export const checkOtpEmail = [

  validator(schema.checkEmailOtp),
  asyncHandler(async (req, res) => {

      const {email,otp} = req.body

      const verify = await verifyOtp(otp,email)

    new SuccessResponse('Otp Verified',{
      verify
    }).send(res);
  }),
];

export const signup = [

  validator(schema.signup),
  asyncHandler(async (req, res) => {

      const data = req.body
     const admin = await AdminController.create(data)

    new SuccessResponse('Signup Success',{
      user:admin
    }).send(res);
  }),
];

