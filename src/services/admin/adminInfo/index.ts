import { SuccessResponse } from "../../../helper/ApiResponse";

import { InternalError, NotFoundError } from "../../../helper/ApiError";
import validator from "../../../helper/validator";
import schema from "./schema";
import asyncHandler from "../../../helper/asyncHandler";
import _ from "lodash";
import { ProtectedRequest } from "../../../helper/app-request";

import CollectionController from "../../../controllers/Collection";
import AdminController from "../../../controllers/Admin";
// import {adminActivityNotification} from '../../lib/setup/firebase'

export const verifyAdminAccess = [
  asyncHandler(async (req: ProtectedRequest, res) => {
    const admin = req.user;

    new SuccessResponse("Admin Verified", admin).send(res);
  }),
];

export const getAdminInfo = [
  asyncHandler(async (req: ProtectedRequest, res) => {
    const id = req.user._id;

    console.log(id);

    const admin = await AdminController.fetchAdminInfo(id);

    new SuccessResponse("Admin Info Fetched", admin).send(res);
  }),
];

export const updateAdminInfo = [
  asyncHandler(async (req: ProtectedRequest, res) => {
    const data = req.body;
    const admin = await AdminController.updateAdminInfo(req.user._id, data);

    if (!admin) throw new InternalError();

    new SuccessResponse("Admin Info Fetched", admin).send(res);
  }),
];

export const checkAdminExists = [
  asyncHandler(async (req, res) => {
    const { email, phone } = req.body;

    const admin = await AdminController.checkAdminExists(phone, email);
    let exists = false;
    if (admin) {
      exists = true;
    }

    new SuccessResponse("Response", exists).send(res);
  }),
];
