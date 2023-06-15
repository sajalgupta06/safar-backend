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


    const savedTicket  =  await TicketController.createTicketManual({
      passengers:req.body.passengers,
      payment:req.body.payment,
      tripDetails:req.body.tripDetails,
      userDetails:{name:"ADMIN",id:req.user._id},
      admin:req.user._id
    })
    if(!savedTicket){
      throw new InternalError("Unable to Book Trip")
    }

  

    new SuccessResponse('Ticket Booked',{
      ticket:savedTicket
    }).send(res);
  }),
];




export const fetchTripTicket = [
  asyncHandler(async (req:ProtectedRequest, res) => {

    const tripId = req.body.tripId


    const tickets =  await TicketController.findTripTickets(tripId)
    if(!tickets){
      throw new InternalError()
    }

    new SuccessResponse('Ticket Fetched',{
      tickets:tickets 
    }).send(res);
  }),
];


export const fetchRecentTicketsAdmin = [
  asyncHandler(async (req:ProtectedRequest, res) => {

    const adminId = req.user._id
    const query = req.query


    const tickets =  await TicketController.findRecentTicketsAdmin(query,adminId)
    if(!tickets){

      throw new InternalError()
    }

    new SuccessResponse('Ticket Fetched',{
      tickets:tickets 
    }).send(res);
  }),
];


export const fetchAllBookingsTrips = [
  asyncHandler(async (req:ProtectedRequest, res) => {

    const adminId = req.user._id
    const query = req.query


    const trips =  await TicketController.findAllBookingsTrip(query,adminId)
    if(!trips){

      throw new InternalError()
    }

    new SuccessResponse('Trips Fetched',{
      trips:trips 
    }).send(res);
  }),
];


export const fetchActiveTripsBookingDetails = [
  asyncHandler(async (req:ProtectedRequest, res) => {

    const adminId = req.user._id
    const query = req.query


    const trips =  await TicketController.findActiveTripsBookingDetail(query,adminId)
    if(!trips){

      throw new InternalError()
    }

    new SuccessResponse('Trips Fetched',{
      trips:trips 
    }).send(res);
  }),
];