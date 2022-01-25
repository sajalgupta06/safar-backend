import express from 'express';
import { SuccessResponse } from '../../../helper/ApiResponse';
import crypto from 'crypto';
import AdminController from '../../../controllers/Admin';
import KeystoreController from '../../../controllers/Keystore';
import { BadRequestError, AuthFailureError } from '../../../helper/ApiError';
import { createTokens, validatePassword } from '../../../lib/auth/authUtils';
import validator from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';


export const login = [
  validator(schema.login),
  asyncHandler(async (req, res) => {
    const admin = await AdminController.findByEmail(req.body.email);
    if (!admin) throw new BadRequestError('User not registered');
    if (!admin.password) throw new BadRequestError('Credential not set');

    const match = await validatePassword(req.body.password,admin.password);
    if (!match) throw new AuthFailureError('Authentication failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreController.create(admin._id, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(admin, accessTokenKey, refreshTokenKey);

    new SuccessResponse('Login Success', {
      user: _.pick(admin, ['_id', 'name', 'roles', 'profilePicUrl']),
      tokens: tokens,
    }).send(res);
  }),
];




// export const loginByPhone = [
//   validator(schema.loginByPhone),
//   asyncHandler(async (req, res) => {
//     const admin = await AdminController.findByEmail(req.body.phone);
//     if (!admin) throw new BadRequestError('User not registered');
//     if (!admin.password) throw new BadRequestError('Credential not set');

//     const match = await validatePassword(req.body.password,admin.password);
//     if (!match) throw new AuthFailureError('Authentication failure');

//     const accessTokenKey = crypto.randomBytes(64).toString('hex');
//     const refreshTokenKey = crypto.randomBytes(64).toString('hex');

//     await KeystoreController.create(admin._id, accessTokenKey, refreshTokenKey);
//     const tokens = await createTokens(admin, accessTokenKey, refreshTokenKey);

//     new SuccessResponse('Login Success', {
//       user: _.pick(admin, ['_id', 'name', 'roles', 'profilePicUrl']),
//       tokens: tokens,
//     }).send(res);
//   }),
// ];

