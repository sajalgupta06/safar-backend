import { SuccessResponse } from '../../../helper/ApiResponse';
import crypto from 'crypto';
import UserController from '../../../controllers/User';
import KeystoreController from '../../../controllers/Keystore';
import {  InternalError, NotFoundError } from '../../../helper/ApiError';
import validator from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import { ProtectedRequest } from '../../../helper/app-request';
import TripController from '../../../controllers/Trip';
import CompanyController from '../../../controllers/Company';
import CollectionController from '../../../controllers/Collection';
// import {adminActivityNotification} from '../../lib/setup/firebase'




export const asd = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {
    
      const collections = await CollectionController.getCollectionNamesAdmin()
    
    if (!collections) throw new InternalError();

    new SuccessResponse('Collections Fetched', 
    collections
    ).send(res);
  }),
];






