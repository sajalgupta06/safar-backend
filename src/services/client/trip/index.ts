import { SuccessResponse } from '../../../helper/ApiResponse';
import crypto from 'crypto';
import UserController from '../../../controllers/User';
import KeystoreController from '../../../controllers/Keystore';
import {  InternalError, NotFoundError } from '../../../helper/ApiError';
import validator, { ValidationSource } from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import { ProtectedRequest } from '../../../helper/app-request';
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


      const trips = await TripController.searchTrip(req.query)
    
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
