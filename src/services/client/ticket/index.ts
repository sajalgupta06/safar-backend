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
import { adminNotification } from '../../../lib/setup/firebase';
import Logger from '../../../helper/Logger';





export const bookTicket = [
  validator(schema.bookTicket,ValidationSource.BODY),
  asyncHandler(async (req:ProtectedRequest, res) => {

  
    const ticket =  await TicketController.createTicket({
      passengers:req.body.passengers,
      trip:req.body.trip,
      payment:req.body.payment,
      userDetails:{
        id:req.user._id,
        name:`${req.user.firstName} ${req.user.lastName?req.user.lastName:""}`
      }
    })
    if(!ticket){
      throw new InternalError("Unable to Book Trip")
    }

    Logger.info(ticket)
    
    // const notificationData = {
    //   body: `A new user has booked ${ticket.trip.name} `,
    //   adminId: ticket.trip.admin.toString(),
    //   read: false,
    // };

    // await adminNotification(ticket.trip.admin.toString(),notificationData)

    new SuccessResponse('Ticket Booked',{
      ticket:ticket.savedTicket
    }).send(res);
  }),
];




export const fetchUsersTicket = [
  asyncHandler(async (req:ProtectedRequest, res) => {

    const userId = req.user._id


    const userTicket =  await TicketController.findClientTickets(userId)
    if(!userTicket){
      throw new InternalError()
    }

    new SuccessResponse('Ticket Fetched',{
      ticket:userTicket.tickets
    }).send(res);
  }),
];




