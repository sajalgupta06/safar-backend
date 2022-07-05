import express from 'express';
import { SuccessResponse } from '../../../helper/ApiResponse';
import crypto from 'crypto';
import UserController from '../../../controllers/User';
import KeystoreController from '../../../controllers/Keystore';
import { BadRequestError, AuthFailureError, InternalError } from '../../../helper/ApiError';
import { createTokens, validatePassword } from '../../../lib/auth/authUtils';
import validator, { ValidationSource } from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import { ProtectedRequest, PublicRequest } from '../../../helper/app-request';
import { createOtp, verifyOtp } from '../../../lib/otp';
import role from '../../../helper/role';
import { RoleCode } from '../../../models/Role';
import AdminController from '../../../controllers/Admin';





export const fetchNameLogoPlan = [
  // validator(schema.getCompany,ValidationSource.QUERY),
  asyncHandler(async (req:ProtectedRequest, res) => {

    
    const company =  await AdminController.fetchCompanyNameLogoPlan(
    req.user._id

    )
    if(!company){
      throw new InternalError("Unable to fetch info")
    }

    new SuccessResponse('Fetched',{
      company
    }).send(res);
  }),
];

export const getCompanyInfo = [
  // validator(schema.getCompany,ValidationSource.QUERY),
  asyncHandler(async (req:ProtectedRequest, res) => {

    
    const company =  await AdminController.fetchCompanyInfo(
    req.user._id

    )
    if(!company){
      throw new InternalError("Unable to fetch info")
    }

    new SuccessResponse('Fetched',{
      company
    }).send(res);
  }),
];








