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
// import {adminActivityNotification} from '../../lib/setup/firebase'

export const createWorkingTrip = [
  validator(schema.createWorkingTrip),
  
  asyncHandler(async (req:ProtectedRequest, res) => {

      const {companyId,data} = req.body

    const result = await CompanyController.updateWorkingTrip(companyId,data)

    if (!result) throw new InternalError('Unable to updated Information');
   
  //  await adminActivityNotification(result.notificationDAta.adminId,result.notificationData)
   
    new SuccessResponse('Information Updated', {
      trip: result
    }).send(res);
  }),
];



export const createTrip = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

    const  data   = req.body

    const result = await TripController.createTripAdmin(req.user._id,data)

    if (!result) throw new InternalError('Unable to create Trip');
   
  //  await adminActivityNotification(result.notificationDAta.adminId,result.notificationData)
   
    new SuccessResponse('Trip Created Successfully', {
      trip: result.savedTrip
    }).send(res);
  }),
];



export const getAllTrips = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

      const adminid = req.user._id

      const companyTrips = await TripController.findAllTripAdmin(adminid,req.query)
    
    if (!companyTrips) throw new InternalError();

    new SuccessResponse('Trip Fetched', 
    companyTrips.trips
    ).send(res);
  }),
];


export const getSingleTrip = [
  
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



