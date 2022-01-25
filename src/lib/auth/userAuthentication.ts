import express from 'express';
import { ProtectedRequest } from '../../helper/app-request';
import User from '../../controllers/User';
import { AuthFailureError, AccessTokenError, TokenExpiredError } from '../../helper/ApiError';
import JWT from '../../helper/JWT';
import KeystoreController from '../../controllers/Keystore';
import { Types } from 'mongoose';
import { getAccessToken, validateTokenData } from './authUtils';
import validator, { ValidationSource } from '../../helper/validator';
import schema from './schema';
import asyncHandler from '../../helper/asyncHandler';

const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    try {
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);

      const user = await User.findById(new Types.ObjectId(payload.sub));
      if (!user) throw new AuthFailureError('User not registered');
      req.user = user;

      const keystore = await KeystoreController.findforKey(req.user._id, payload.prm);
      if (!keystore) throw new AuthFailureError('Invalid access token');
      req.keystore = keystore;

      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }),
);
