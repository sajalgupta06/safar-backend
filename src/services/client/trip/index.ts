import { SuccessResponse } from '../../../helper/ApiResponse';
import crypto from 'crypto';
import UserController from '../../../controllers/User';
import KeystoreController from '../../../controllers/Keystore';
import {  InternalError, NotFoundError } from '../../../helper/ApiError';
import validator, { ValidationSource } from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import { ProtectedRequest, PublicRequest } from '../../../helper/app-request';
import TripController from '../../../controllers/Trip';
// import {adminActivityNotification} from '../../lib/setup/firebase'






export const getFavouriteTrips = [
  
  asyncHandler(async (req:ProtectedRequest, res) => {

      const id = req.user._id

      const favouriteTrips = await TripController.findFavouriteTripsClient(id)
    
    if (!favouriteTrips) throw new InternalError();

    new SuccessResponse('Trips Fetched', {
      trips:favouriteTrips.favouriteTrips
    }).send(res);
  }),
];



export const addFavouriteTrip = [
  validator(schema.favouriteTrip),
  asyncHandler(async (req:ProtectedRequest, res) => {

      const id = req.user._id
      
      const favouriteTrips = await TripController.addFavouriteTripsClient(id,req.body.id)
    
    if (!favouriteTrips) throw new InternalError();

    new SuccessResponse('Added to Favourite Trips', {
      trips:favouriteTrips.favouriteTrips
    }).send(res);
  }),
];


export const removeFavouriteTrip = [
  validator(schema.favouriteTrip),
  asyncHandler(async (req:ProtectedRequest, res) => {

      const id = req.user._id

      const favouriteTrips = await TripController.removeFavouriteTripsClient(id,req.body.id)
    
    if (!favouriteTrips) throw new InternalError();

    new SuccessResponse('Remove from Favourite Trips', {
      trips:favouriteTrips.favouriteTrips
    }).send(res);
  }),
];


export const searchTrip = [
  validator(schema.query,ValidationSource.QUERY),
  asyncHandler(async (req:ProtectedRequest, res) => {

    const filter = req.body.filter
    const sorter = req.body.sorter

    const trips = await TripController.searchTrip(req.query,filter,sorter)
    
    if (!trips) throw new InternalError();

    new SuccessResponse('Trips Fetched', {
      trips
    }).send(res);
  }),

];


export const searchTripByCollection = [
    validator(schema.query,ValidationSource.QUERY),
    asyncHandler(async (req:ProtectedRequest, res) => {
  
  
        const trips = await TripController.searchTripByCollection(req.query)
      
      if (!trips) throw new InternalError();
  
      new SuccessResponse('Trips Fetched', {
        trips
      }).send(res);
    }),

  ];


  export const getAllPublishedTrips = [
   
    asyncHandler(async (req:PublicRequest, res) => {
  
  
        const trips = await TripController.findAllPublishedTrips({published:"true"})
      
      if (!trips) throw new InternalError();
  
      new SuccessResponse('Trips Fetched', {
        trips
      }).send(res);
    }),
  
  ];
  

  export const getSingleTrip = [
    validator(schema.searchById,ValidationSource.QUERY),
    asyncHandler(async (req:PublicRequest, res) => {
  
        const tripId = req.query.id?.toString()
        if(!tripId)
        {
          throw new NotFoundError("Please Provide Trip Id");
        }
  
        const companyTrip = await TripController.findSingleTripClient(tripId)
      
      if (!companyTrip) throw new InternalError("Unable to fetch trip");
  
      new SuccessResponse('Trip Fetched', {
        trip:companyTrip
      }).send(res);
    }),
  ];

  export const getMultipleTrips = [
    // validator(schema.searchById,ValidationSource.QUERY),
    asyncHandler(async (req:PublicRequest, res) => {
  
      const data:any=[];

      

        const tripIds = req.body;
      

        for (let index = 0; index < tripIds.length; index++) {
          const tripId = tripIds[index];
          if(!tripId)
          {
            throw new NotFoundError("Please Provide Trip Id");
          }

          const companyTrip = await TripController.findSingleTripClient(tripId)
         
          if (!companyTrip) throw new InternalError("Unable to fetch trip");

          data.push(companyTrip)
          
        }
        // tripIds.forEach(async(tripId:any) => {
          
        //   if(!tripId)
        //   {
        //     throw new NotFoundError("Please Provide Trip Id");
        //   }

        //   const companyTrip = await TripController.findSingleTripClient(tripId)
         
        //   if (!companyTrip) throw new InternalError("Unable to fetch trip");

        //   data.push(companyTrip)

        // });
       
  
      
  
      new SuccessResponse('Trips Fetched', {
        trips:data
      }).send(res);
    }),
  ];