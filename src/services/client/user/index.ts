import express from "express";
import { SuccessResponse } from "../../../helper/ApiResponse";
import crypto from "crypto";
import UserController from "../../../controllers/User";
import KeystoreController from "../../../controllers/Keystore";
import {
  BadRequestError,
  AuthFailureError,
  InternalError,
} from "../../../helper/ApiError";
import { createTokens, validatePassword } from "../../../lib/auth/authUtils";
import validator from "../../../helper/validator";
import schema from "./schema";
import asyncHandler from "../../../helper/asyncHandler";
import _ from "lodash";
import { ProtectedRequest, PublicRequest } from "../../../helper/app-request";
import { createOtp, verifyOtp } from "../../../lib/otp";
import role from "../../../helper/role";
import { RoleCode } from "../../../models/Role";
import UploadImage from "../../../helper/ImageUpload";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const updateUser = [
  validator(schema.userUpdate),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const data = req.body;
    const userId = req.user._id;
    
    
    console.log(data)
    console.log("files",req.files)

    const updatedUser = await UserController.updateInfo(userId, data);
    if (!updatedUser) {
      throw new InternalError();
    }

    new SuccessResponse("User Updated", {
      user: updatedUser,
    }).send(res);
  }),
];


  



export const getUser = [
  asyncHandler(async (req: ProtectedRequest, res) => {
    const userId = req.user._id;

    console.log(userId);
    const user = await UserController.findUserForClient(userId);
    if (!user) {
      throw new InternalError();
    }

    new SuccessResponse("User Fetched", {
      user: user,
    }).send(res);
  }),
];

export const uploadProfilePicture = async (req: any, res: any) => {
  const key = "profile/" + uuidv4();

  const result = await UploadImage.single(key);

  const data = req.files.photo.data;
  const type = req.files.photo.mimetype;

  await axios.put(result, data, {
    headers: {
      "Content-Type": type,
    },
  });

  return new SuccessResponse("Photo saved", key).send(res);
};
