import Ticket, { TicketModel } from "../models/Ticket";
import ResourceFilter from "../helper/ResourceFilter";
import { BadRequestError, InternalError } from "../helper/ApiError";
import { ObjectId, Types } from "mongoose";
import mongoose from "mongoose";
import AllTickets, { AllTicketsModel } from "../models/AllTickets";
import User, { UserModel } from "../models/User";
import Analytics, { AnalyticsModel } from "../models/Analytics";
import Logger from "../helper/Logger";
import { object_equals } from "../helper/ObjectEquals";
import { adminNotification, notificationFormat } from "../lib/setup/firebase";
import {generateId} from '../helper/GenerateUniqueID'
export default class TicketController {
  public static async findAllTicketsOwner(query: any): Promise<Ticket | null> {
    let ticket = new ResourceFilter(TicketModel, query);
    return await ticket.resource;
  }

  public static async findTripTickets(
    tripId: ObjectId
  ): Promise<AllTickets | null> {
    const tickets = await AllTicketsModel.findOne({ trip: tripId })
      .populate("tickets")
      .lean<AllTickets>();

    if (!tickets) {
      throw new InternalError("Tickets Not Found");
    }
    return tickets;
  }

  public static async findRecentTicketsAdmin(
    query: any,
    adminId: ObjectId
  ): Promise<Ticket | null> {
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const sort = { createdAt: -1 };

    return await TicketModel.find({ admin: adminId })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean<Ticket>();
  }

  public static async findAllBookingsTrip(
    query: any,
    adminId: ObjectId
  ): Promise<AllTickets | null> {
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const sort = { createdAt: -1 };

    return await AllTicketsModel.find({ admin: adminId })
      .select("trip ticketCount updatedAt")
      .populate("trip", "name completed")
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean<AllTickets>();
  }

  public static async findActiveTripsBookingDetail(
    query: any,
    adminId: ObjectId
  ): Promise<AllTickets | null> {
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const sort = { createdAt: -1 };

    return await AllTicketsModel.find({ admin: adminId, status: true })
      .select("trip ticketCount updatedAt tickets")
      .populate("trip", "name region dates priceSlots slug")
      .populate("tickets")
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean<AllTickets>();
  }

  public static async createTicket(
    data: any
  ): Promise<{ savedTicket: object }> {
    const session = await mongoose.startSession();
    session.startTransaction();

    const ticket = new TicketModel(data);

    const savedTicket = await ticket.save({ session });

    if (!savedTicket) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in saving Tickets");
    }

    const updatedAllTickets = await AllTicketsModel.findOneAndUpdate(
      { trip: data.trip.id },
      {
        $push: { tickets: savedTicket._id },
        $inc: { ticketCount: data.passengers.length },
      },
      { new: true, upsert: true }
    )
      .lean<AllTickets>()
      .session(session);

    if (!updatedAllTickets) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in updating trip");
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      data.userDetails.id,
      { $push: { tickets: savedTicket._id } },
      { new: true }
    ).session(session);

    if (!updatedUser) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in updating user");
    }

    await session.commitTransaction();
    await session.endSession();

    return { savedTicket };
  }

  public static async createTicketManual(data: {
    passengers: [
      {
        name: string;
        mobileNumber: number;
        email: string;
        age: number;
        gender: string;
        aadharNumber: string;
      }
    ];
    tripDetails: {
      id: Types.ObjectId;
      name: string;
      slug: string;
      priceSlot: {
        pickupPoint: string;
        dropPoint: string;
        basePrice: number;
        pickupTransMode: string;
        dropTransMode: string;
        key: number;
        date: {
          startDate: string;
          endDate: string;
          key: number;
        };
      };
    };
    payment: {
      status: boolean;
      amount: string;
      mode: string;
    };
    userDetails: { id: Types.ObjectId; name: string };
    admin: Types.ObjectId;
  }): Promise<any | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    const tripId = data.tripDetails.id;
    const tripName = data.tripDetails.name;
    const adminId = data.admin;

    const ticketId = generateId()

    const ticketData  = {...data, ticketId:ticketId}

    const ticket = new TicketModel(ticketData);

    const savedTicket = await ticket.save({ session });

    if (!savedTicket) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in saving Tickets");
    }

    const updatedAllTickets = await AllTicketsModel.findOneAndUpdate(
      { trip: tripId, admin: adminId },
      {
        $push: { tickets: savedTicket._id },
        $inc: { ticketCount: data.passengers.length },
      },
      { new: true, upsert: true }
    )
      .populate("tickets")
      .populate("trip", "dates priceSlots")
      .lean<AllTickets>()
      .session(session);

    if (!updatedAllTickets) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in updating trip");
    }

    let revenue = {
      mode: data.payment.mode,
      amount: data.payment.amount,
      createdAt: Date.now(),
    };

    let bookings = {
      count: data.passengers.length,
      createdAt: Date.now(),
    };

    const updateAnalytics = await AnalyticsModel.findOneAndUpdate(
      { admin: data.admin },
      { $push: { revenue: revenue, bookings: bookings } },
      { new: true, upsert: true }
    )
      .lean<Analytics>()
      .session(session);

    if (!updateAnalytics) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Error in saving analytics model");
    }

    await session.commitTransaction();
    await session.endSession();



  




  
    await adminNotification(adminId.toString(), "BOOK_TICKET",{
      message: `A new user is registered to ${data.tripDetails.name}`,
      body: {
        tripId: data.tripDetails.id,
        tripName: data.tripDetails.name,
        
      }
    })




    return { savedTicket };
  }
  // Delete Ticket

  public static async findClientTickets(
    userId: ObjectId
  ): Promise<User | null> {
    const tickets = await UserModel.findById(userId)
      .select("tickets")
      .populate("tickets")
      .lean<User>();

    if (!tickets) {
      throw new InternalError("Error in fetching Tickets");
    }
    return tickets;
  }
}
