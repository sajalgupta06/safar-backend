import { SuccessResponse } from "../../../helper/ApiResponse";
import crypto from "crypto";
import UserController from "../../../controllers/User";
import KeystoreController from "../../../controllers/Keystore";
import { InternalError } from "../../../helper/ApiError";
import { createTokens, validatePassword } from "../../../lib/auth/authUtils";
import validator from "../../../helper/validator";
import asyncHandler from "../../../helper/asyncHandler";
import _ from "lodash";
import { ApiKeyModel } from "../../../models/ApiKey";
import schema from "./schema";
import bcrypt from "bcrypt";
import ApiController from "../../../controllers/ApiKey";
import { ProtectedRequest } from "../../../helper/app-request";

export const createApi = [
  validator(schema.xApiUser),
  asyncHandler(async (req:ProtectedRequest, res) => {
    
    const key = await bcrypt.hash(JSON.stringify(req.body), 10);

    const apiKey = await ApiController.createKey(key,req.body)
    if (!apiKey) throw new InternalError("Cannot generate Api Key");
    new SuccessResponse("Api Key Generated Successfully", {
      key: key,
    }).send(res);
  }),
];


export const getAllApi = [
  asyncHandler(async (req, res) => {
    const apiKeys = await ApiController.findAllKeys();
    if (!apiKeys) throw new InternalError("Cannot generate Api Key");
    new SuccessResponse("Api Key Fetched ", {
      keys: apiKeys,
    }).send(res);
  }),
];
