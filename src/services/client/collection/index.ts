import { SuccessResponse } from '../../../helper/ApiResponse';
import {  InternalError, NotFoundError } from '../../../helper/ApiError';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import { PublicRequest } from '../../../helper/app-request';
import CollectionController from '../../../controllers/Collection';





export const getAllCollectionsNames = [
  
  asyncHandler(async (req:PublicRequest, res) => {
    
      const collections = await CollectionController.getCollectionNames()
    
    if (!collections) throw new InternalError();

    new SuccessResponse('Collections Fetched', 
    collections
    ).send(res);
  }),
];






