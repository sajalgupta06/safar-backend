import { SuccessResponse } from '../../../helper/ApiResponse';

import {  InternalError, NotFoundError } from '../../../helper/ApiError';
import validator from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import { ProtectedRequest } from '../../../helper/app-request';

import CollectionController from '../../../controllers/Collection';
import AdminController from '../../../controllers/Admin';
// import {adminActivityNotification} from '../../lib/setup/firebase'




export const getAdminInfo = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {
    
      const admin = await AdminController.fetchAdminInfo(req.user._id)
    
    if (!admin) throw new InternalError();

    new SuccessResponse('Admin Info Fetched', 
    admin
    ).send(res);
  }),
];

export const updateAdminInfo = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {
    
    const data = req.body
      const admin = await AdminController.updateAdminInfo(req.user._id,data)
    
    if (!admin) throw new InternalError();

    new SuccessResponse('Admin Info Fetched', 
    admin
    ).send(res);
  }),
];





