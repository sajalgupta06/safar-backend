import { SuccessResponse } from '../../../helper/ApiResponse';
import {  InternalError, NotFoundError } from '../../../helper/ApiError';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import { PublicRequest } from '../../../helper/app-request';
import TrendingController from '../../../controllers/TopTrending';





export const getTrendingLocations = [
  
  asyncHandler(async (req:PublicRequest, res) => {
    
   
    const result = await TrendingController.FETCH_TOP_TRENDING_LOCATIONS()

    if(!result)
    {
      throw new InternalError("Unable to fetch documents")

    }

  new SuccessResponse("Documents Fetched Successfully",result.locations).send(res);
  }),
];






