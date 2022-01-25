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
// import {adminActivityNotification} from '../../lib/setup/firebase'


export const createTrip = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {
    const result = await TripController.createTripAdmin(req.user._id,req.body)

    if (!result) throw new InternalError('Unable to create Trip');
   

  //  await adminActivityNotification(result.notificationDAta.adminId,result.notificationData)
   
    new SuccessResponse('Trip Created Successfully', {
      trip: result.savedTrip
    }).send(res);
  }),
];





export const getAllTripsOwner = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {


      const allTrips = await TripController.findAllTripsOwner(req.query)
    
    if (!allTrips) throw new InternalError();

    new SuccessResponse('Trip Fetched', {
      trips:allTrips
    }).send(res);
  }),
];



export const getSingleTripAdmin = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

      const tripId = req.query.id?.toString()
      if(!tripId)
      {
        throw new NotFoundError("Please Provide Trip Id");
      }

      const companyTrip = await TripController.findSingleTripAdmin(tripId)
    
    if (!companyTrip) throw new InternalError("Unable to fetch trip");

    new SuccessResponse('Trip Fetched', {
      trip:companyTrip
    }).send(res);
  }),
];



