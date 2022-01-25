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
import { ProtectedRequest, PublicRequest } from '../../../helper/app-request';
import { createOtp, verifyOtp } from '../../../lib/otp';
import role from '../../../helper/role';
import { RoleCode } from '../../../models/Role';


export const updateUser = [
  validator(schema.userUpdate),
  asyncHandler(async (req:ProtectedRequest, res) => {

    const data = req.body.data
    const userId = req.body.id


    const updatedUser =  await UserController.updateInfo(userId,data)
    if(!updatedUser){
      throw new InternalError()
    }

    new SuccessResponse('User Updated',{
      user:updatedUser
    }).send(res);
  }),
];




export const getUser = [
  validator(schema.getUser),
  asyncHandler(async (req:ProtectedRequest, res) => {

    const userId = req.body.id


    const user =  await UserController.findById(userId)
    if(!user){
      throw new InternalError()
    }

    new SuccessResponse('User Updated',{
      user:user
    }).send(res);
  }),
];


export const getAllUsers = [

  validator(schema.query),
  asyncHandler(async (req:ProtectedRequest, res) => {



    const users =  await UserController.findAll(req.query)
    if(!users){
      throw new InternalError()
    }

    new SuccessResponse('User Updated',{
      users
    }).send(res);
  }),
];








