import express from 'express';


import { TokenRefreshResponse } from '../../../helper/ApiResponse';
import { ProtectedRequest } from '../../../helper/app-request';
import { Types } from 'mongoose';
import UserController from '../../../controllers/User';
import { AuthFailureError } from '../../../helper/ApiError';
import JWT from '../../../helper/JWT';
import KeystoreController from '../../../controllers/Keystore';
import crypto from 'crypto';
import { validateTokenData, createTokens, getAccessToken } from '../../../lib/auth/authUtils';
// import validator, { ValidationSource } from '../../../helper/validator';
// import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';

const router = express.Router();

router.post(
  '/refresh',
  // validator(schema.auth, ValidationSource.HEADER),
  // validator(schema.refreshToken),
  asyncHandler(async (req: ProtectedRequest, res) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    const accessTokenPayload = await JWT.decode(req.accessToken);
    validateTokenData(accessTokenPayload);

    const user = await UserController.findById(new Types.ObjectId(accessTokenPayload.sub));
    if (!user) throw new AuthFailureError('User not registered');
    req.user = user;

    const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
    validateTokenData(refreshTokenPayload);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub)
      throw new AuthFailureError('Invalid access token');

    const keystore = await KeystoreController.find(
      req.user._id,
      accessTokenPayload.prm,
      refreshTokenPayload.prm,
    );

    if (!keystore) throw new AuthFailureError('Invalid access token');
    await KeystoreController.remove(keystore._id);

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreController.create(req.user._id, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(req.user, accessTokenKey, refreshTokenKey);

    new TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
  }),
);



export default router;
