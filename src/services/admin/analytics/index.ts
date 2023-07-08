import { SuccessResponse } from '../../../helper/ApiResponse';
import KeystoreController from '../../../controllers/Keystore';
import {  InternalError, NotFoundError } from '../../../helper/ApiError';
import validator from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import AnalyticsController from '../../../controllers/Analytics';
import { ProtectedRequest } from '../../../helper/app-request';




export const getRevenue = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {
    
      const adminId = req.user._id


      const result = await AnalyticsController.fetchRevenue(adminId) ;
    
    if (!result) throw new InternalError();

    new SuccessResponse('Data Fetched', 
    result
    ).send(res);
  }),
];


export const getBookings = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {
    
      const adminId = req.user._id


      const result = await AnalyticsController.fetchBookings(adminId) ;
    
    if (!result) throw new InternalError();

    new SuccessResponse('Data Fetched', 
    result
    ).send(res);
  }),
];


export const getTripsInsights = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {
    
      const adminId = req.user._id


      const result = await AnalyticsController.fetchTripsInsights(adminId) ;
    
    if (!result) throw new InternalError();

    new SuccessResponse('Data Fetched', 
    result
    ).send(res);
  }),
];




