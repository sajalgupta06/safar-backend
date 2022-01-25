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
import AdminController from '../../../controllers/Admin'
import _ from 'lodash';
import { ProtectedRequest } from '../../../helper/app-request';


export const singleAdmin = [
    asyncHandler(async (req, res) => {
   
        const id = req.body.id
      const users = await AdminController.findById(id)
  
      if(!users){
          throw new InternalError("Unable to fetch user")
      }
  
      new SuccessResponse('Details fetched', {
        users,
      }).send(res);
    }),
  ];



export const allAdmins = [

  validator(schema.query),

  asyncHandler(async (req:ProtectedRequest, res) => {
   
  
      const users = await AdminController.findAll(req.query)
  
      if(!users){
          throw new InternalError("Unable to fetch users")
      }
  
      new SuccessResponse('Details fetched', {
        users,
      }).send(res);
    }),
  ];




