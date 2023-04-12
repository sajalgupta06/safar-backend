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
import AdminController from '../../../controllers/Admin';
// import {adminActivityNotification} from '../../lib/setup/firebase'

export const createWorkingTrip = [
  validator(schema.createWorkingTrip),
  
  asyncHandler(async (req:ProtectedRequest, res) => {

      const data = req.body
      
    const result = await AdminController.updateWorkingTrip(req.user._id,data)

    if (!result) throw new InternalError('Unable to updated Information');
   
  //  await adminActivityNotification(result.notificationDAta.adminId,result.notificationData)
   
    new SuccessResponse('Information Updated', {
      trip: result
    }).send(res);
  }),
];

export const fetchWorkingTrip = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {
      
    const result = await AdminController.fetchWorkingTrip(req.user._id)

    if (!result) throw new InternalError('Unable to updated Information');
   
  //  await adminActivityNotification(result.notificationDAta.adminId,result.notificationData)
   
    new SuccessResponse('Information fetched', result).send(res);
  }),
];


export const createTrip = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

    const  data   = req.body

    const result = await TripController.createTripAdmin(req.user,data)

    if (!result) throw new InternalError('Unable to create Trip');
   
  //  await adminActivityNotification(result.notificationDAta.adminId,result.notificationData)
   
    new SuccessResponse('Trip Created Successfully', {
      trip: result.savedTrip
    }).send(res);
  }),
];


export const updateTrip = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

    const  data   = req.body.data
    const  id   = req.body.id


    const result = await TripController.updateTripAdmin(id,data)

    if (!result) throw new InternalError('Unable to update Trip');
   
  //  await adminActivityNotification(result.notificationDAta.adminId,result.notificationData)
   
    new SuccessResponse('Trip Update Successfully', {
      trip: result
    }).send(res);
  }),
];





export const getAllTrips = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

      const adminid = req.user._id

      const trips = await TripController.findAllTripAdmin(adminid,req.query)
    
    if (!trips) throw new NotFoundError();

    new SuccessResponse('Trips Fetched', 
    trips
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

export const updateAdminWorkingTrip = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

      const tripId = req.body.id
      const data = req.body.data
   
      const result = await AdminController.updateWorkingTrip(tripId,data)

     

    
   

    new SuccessResponse('Trips Deleted',{}).send(res);
  }),
];



export const deleteTrips = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

      const tripIds = req.body
      if(!tripIds)
      {
        throw new NotFoundError("Please Provide Trip Id");
      }

      tripIds.map(async(tripId:any)=>{
        const trip = await TripController.removeTrip(tripId)
        if (trip) throw new InternalError("Unable to delete trip");

      })

    
   

    new SuccessResponse('Trips Deleted',{}).send(res);
  }),
];



export const publishTrip = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

      const tripIds = req.body

      console.log(req.body)
      if(!tripIds)
      {
        throw new NotFoundError("Please Provide Trip Id");
      }

      tripIds.map(async(tripId:any)=>{
        const trip = await TripController.publishTrip(tripId)
        if (!trip) throw new InternalError("Unable to publish trip");

      })

    
   

    new SuccessResponse('Trips Published',{}).send(res);
  }),
];


export const getTripPricePlan = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

      const tripId = req.query.id

      const pricePlan = await TripController.fetchTripPricePlan(tripId)
    
    if (!pricePlan) throw new NotFoundError();

    new SuccessResponse('PricePlan Fetched', 
    pricePlan
    ).send(res);
  }),
];


// export const getPublishedTripsName = [
  
//   asyncHandler(async (req:ProtectedRequest, res) => {

//       const pricePlan = await TripController.fetchTripPricePlan(tripId)
    
//     if (!pricePlan) throw new NotFoundError();

//     new SuccessResponse('PricePlan Fetched', 
//     pricePlan
//     ).send(res);
//   }),
// ];