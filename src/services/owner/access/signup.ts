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
import { RoleCode } from '../../../models/Role';
import OwnerController from '../../../controllers/Owner';


export const signup = [
  validator(schema.signup),
  asyncHandler(async (req, res) => {

    const user = await OwnerController.create({...req.body,role:RoleCode.OWNER})
    if (!user) throw new InternalError('Internal Error');

    new SuccessResponse('Signup Success', {
      user: user
    }).send(res);
  }),
];
