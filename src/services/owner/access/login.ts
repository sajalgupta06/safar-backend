import express from 'express';
import { SuccessResponse } from '../../../helper/ApiResponse';
import crypto from 'crypto';
import KeystoreController from '../../../controllers/Keystore';
import { BadRequestError, AuthFailureError } from '../../../helper/ApiError';
import { createTokens, validatePassword } from '../../../lib/auth/authUtils';
import validator from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import OwnerController from '../../../controllers/Owner';


export const login = [
  validator(schema.loginByEmail),
  asyncHandler(async (req, res) => {
    const user = await OwnerController.findByEmail(req.body.email);
    if (!user) throw new BadRequestError('User not registered');
    if (!user.password) throw new BadRequestError('Credential not set');

    const match = await validatePassword(req.body.password,user.password);
    if (!match) throw new AuthFailureError('Authentication failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreController.create(user._id, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

    new SuccessResponse('Login Success', {
      user: _.pick(user, ['_id', 'name', 'roles', 'profilePicUrl']),
      tokens: tokens,
    }).send(res);
  }),
];




