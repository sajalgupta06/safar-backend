import express from 'express';
import { SuccessResponse } from '../../../helper/ApiResponse';
import crypto from 'crypto';
import UserController from '../../../controllers/User';
import KeystoreController from '../../../controllers/Keystore';
import { BadRequestError, AuthFailureError, InternalError } from '../../../helper/ApiError';
import { createTokens, validatePassword } from '../../../lib/auth/authUtils';
import validator, { ValidationSource } from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../helper/asyncHandler';
import _ from 'lodash';
import { ProtectedRequest, PublicRequest } from '../../../helper/app-request';
import { createOtp, verifyOtp } from '../../../lib/otp';
import role from '../../../helper/role';
import { RoleCode } from '../../../models/Role';
import TicketController from '../../../controllers/Ticket';





export const bookTicketManual = [
  validator(schema.bookTicket,ValidationSource.BODY),
  asyncHandler(async (req:ProtectedRequest, res) => {

  
    const ticket =  await TicketController.createTicketManual({
      passengers:req.body.passengers,
      tripId:req.body.tripId,
      priceSlots:req.body.priceSlots,
      userDetails:{name:"ADMIN",id:req.user._id}

    })
    if(!ticket){
      throw new InternalError("Unable to Book Trip")
    }

    new SuccessResponse('Ticket Booked',{
      ticket
    }).send(res);
  }),
];




export const fetchTripTicket = [
  asyncHandler(async (req:ProtectedRequest, res) => {

    const tripId = req.body.id


    const tickets =  await TicketController.findTripTickets(tripId)
    if(!tickets){
      throw new InternalError()
    }

    new SuccessResponse('Ticket Fetched',{
      tickets:tickets 
    }).send(res);
  }),
];




