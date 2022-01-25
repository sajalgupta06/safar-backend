import express from 'express';
import ApiKeyController from '../../controllers/ApiKey';
import { ForbiddenError } from '../../helper/ApiError';
import Logger from '../../helper/Logger';
import { PublicRequest } from '../../helper/app-request';
import schema from './schema';
import validator, { ValidationSource } from '../../helper/validator';
import asyncHandler from '../../helper/asyncHandler';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, res, next) => {
    // @ts-ignore
    req.apiKey = req.headers['x-api-key'].toString();

    const apiKey = await ApiKeyController.findByKey(req.apiKey);

    if (!apiKey) throw new ForbiddenError();
    return next();
  }),
);
