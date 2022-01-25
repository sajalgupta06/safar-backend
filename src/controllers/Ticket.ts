import Ticket, { TicketModel } from '../models/Ticket';
import ResourceFilter from '../helper/ResourceFilter'
import { BadRequestError, InternalError } from '../helper/ApiError';
import { ObjectId, Types } from 'mongoose';
import Trip, { TripModel } from '../models/Trip';
import mongoose from 'mongoose'
import AllTickets, { AllTicketsModel } from '../models/AllTickets';
import User,{ UserModel } from '../models/User';
import { object } from '@hapi/joi';
import Logger from '../helper/Logger';


export default class TicketController {
  
  public static async findAllTicketsOwner(query:any): Promise<Ticket | null> {

    let ticket = new ResourceFilter(TicketModel, query)
    return  await ticket.resource

  }

  public static async findTripTickets(tripId:ObjectId): Promise<AllTickets | null> {

    const tickets = await AllTicketsModel.findOne({tripId:tripId}).populate('tickets').lean<AllTickets>()
    
    if(!tickets)
    {
      throw new InternalError("Error in fetching Tickets")

    }
    return tickets

  }


  public static async createTicket(data:{passengers:object[],tripId: string ,priceSlot:object,userDetails:{id:Types.ObjectId,name:string}}): Promise<{savedTicket:object,trip:any}> {


    const session = await mongoose.startSession();
    session.startTransaction();

    const trip = await TripModel.findById(data.tripId).select("name admin").lean<Trip>()

    if(!trip){
      throw new BadRequestError("Trip Not Found")
    }

      const ticket = new TicketModel(data)

      const savedTicket = await ticket.save({session})

  if (!savedTicket) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in saving Tickets")
    }

    const updatedAllTickets = await AllTicketsModel.findOneAndUpdate(
      { trip: data.tripId },
      { $push: { tickets: savedTicket._id } ,  $inc: { ticketCount: data.passengers.length } },
      { new: true,upsert:true }
    ).lean<AllTickets>().session(session);

    if (!updatedAllTickets) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in updating trip")
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      data.userDetails.id ,
      { $push: { tickets: savedTicket._id } },
      { new: true }
    ).session(session);

    if (!updatedUser) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in updating user")
    }

    await session.commitTransaction();
    await session.endSession();

    

    return {savedTicket,trip}

  }




  public static async createTicketManual(data:{passengers:object[],tripId: string ,priceSlot:object}): Promise<object | null> {

    const session = await mongoose.startSession();
    session.startTransaction();

      const ticket = new TicketModel(data)

      const savedTicket = await ticket.save({session})

  if (!savedTicket) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in saving Tickets")
    }

    const updatedAllTickets = await AllTicketsModel.findOneAndUpdate(
      { trip: data.tripId },
      { $push: { tickets: savedTicket._id } ,  $inc: { ticketCount: data.passengers.length } },
      { new: true,upsert:true }
    ).lean<AllTickets>().session(session);



    if (!updatedAllTickets) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in updating trip")
    }



    const trip = await TripModel.findById(data.tripId).select("name")


    await session.commitTransaction();
    await session.endSession();

    return {savedTicket,trip}

  }
  // Delete Ticket







  public static async findClientTickets(userId:ObjectId): Promise<User | null> {

    const tickets = await UserModel.findById(userId).select('tickets').populate('tickets').lean<User>()
    
    if(!tickets)
    {
      throw new InternalError("Error in fetching Tickets")

    }
    return tickets

  }

}
