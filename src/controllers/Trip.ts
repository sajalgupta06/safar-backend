import { ObjectId, Types } from "mongoose";
import mongoose from "mongoose";
import { InternalError, NotFoundError } from "../helper/ApiError";
import Trip, { TripModel } from "../models/Trip";
import Logger from "../helper/Logger";
import User, { UserModel } from "../models/User";
import ResourceFilter from "../helper/ResourceFilter";
import { AdminModel } from "../models/Admin";
export default class TripController {
  public static async findAllTripAdmin(
    id: ObjectId,
    query: any
  ): Promise<Trip | null> {
    // const page = query.page * 1 || 1;
    // const limit = query.limit * 1 || 20;
    // const skip = (page - 1) * limit;

    let trips = new ResourceFilter(TripModel, query).filter().paginate();
    return await trips.resource;
  }

  public static async createTripAdmin(
    user: any,
    data: any
  ): Promise<any | null> {
    if (!user) {
      throw new NotFoundError("Unable to Find Associated User");
    }

    const workingTripData = user.workingTrip;

    const session = await mongoose.startSession();
    session.startTransaction();

    function getLowestPrice(priceSlots: any) {
      let lowestPrice = Number.MAX_SAFE_INTEGER;
      for (const slot of priceSlots) {
        const basePrice = parseInt(slot.basePrice);
        if (basePrice < lowestPrice) {
          lowestPrice = basePrice;
        }
      }
      return lowestPrice;
    }

    const finalPrice = getLowestPrice(workingTripData.priceSlots);

    const tripData = {
      admin: user._id,
      name: workingTripData.name,
      collections: workingTripData.type,
      dates: workingTripData.dates,
      noOfPlaces: workingTripData.noOfPlaces,
      location: workingTripData.location,
      ageLimit: workingTripData.ageLimit,
      lastDate: workingTripData.lastDate,
      photos: workingTripData.photos,
      discount: workingTripData.discount,
      finalPrice: finalPrice,
      priceSlots: workingTripData.priceSlots,
      itinerary: workingTripData.itinerary,
      about: workingTripData.about,
      highlights: workingTripData.highlights,
      conditions: workingTripData.conditions,
      inclusions: workingTripData.inclusions,
      exclusions: workingTripData.exclusions,
      completed: workingTripData.published,
      cancelled: workingTripData.published,
      published: data.published,
    };

    const trip = new TripModel(tripData);
    const savedTrip = await trip.save({ session });
    if (!savedTrip) {
      await session.abortTransaction();
      await session.endSession();
      throw new InternalError("Failed to save Trip");
    }

    await session.commitTransaction();
    await session.endSession();

    const notificationData = {
      body: `A new trip ${savedTrip.name} has been created`,
      adminId: user._id,
      read: false,
    };
    return { savedTrip, notificationData };
  }

  public static async updateTripAdmin(
    id: Types.ObjectId,
    data: any
  ): Promise<any> {
    return await TripModel.findByIdAndUpdate(
      id,
      { $set: { ...data } },
      { new: true }
    )
      .lean()
      .exec();
  }

  public static async findSingleTripAdmin(
    tripId: string
  ): Promise<Trip | null> {
    return await TripModel.findById({ _id: tripId }).lean<Trip>().exec();
  }

  public static async findSingleTripClient(
    tripId: string
  ): Promise<Trip | null> {
    return await TripModel.findById({ _id: tripId }).lean<Trip>().exec();
  }
  public static async findSingleTripClientBySlug(
    slug: string
  ): Promise<Trip | null> {
    return await TripModel.findOne({ slug: slug })
      .lean<Trip>()
      .cache({ key: slug })
      .exec();
  }

  public static async findFavouriteTripsClient(
    userId: string | Types.ObjectId
  ): Promise<User | null> {
    return await UserModel.findById({ _id: userId })
      .select("favouriteTrips")
      .populate("favouriteTrips")
      .lean<User>()
      .exec();
  }

  public static async removeFavouriteTripsClient(
    userId: string | Types.ObjectId,
    tripId: string | Types.ObjectId
  ): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: { favouriteTrips: tripId },
      },
      { new: true }
    )
      .lean<User>()
      .exec();
  }

  public static async addFavouriteTripsClient(
    userId: string | Types.ObjectId,
    tripId: string | Types.ObjectId
  ): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        $addToSet: { favouriteTrips: tripId },
      },
      { new: true }
    )
      .lean<User>()
      .exec();
  }

  public static async FETCH_SEARCH_TRIPS_NAME_SLUG_FINALPRICE(
    query: any
  ): Promise<any | null> {
    const search = query.search || " ";
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const minDays = parseInt(query?.minDays || 0);
    const maxDays = parseInt(query?.maxDays || 20);
    const minPrice = parseInt(query?.minPrice || 0);
    const maxPrice = parseInt(query?.maxPrice || 100000);
    const sortDirection = parseInt(query?.sortDirection);
    const sort = query?.sort;


    let findQuery = {
      $text: { $search: search },
      days: { $gte: minDays, $lte: maxDays },
      finalPrice: { $gte: minPrice, $lte: maxPrice },
    };
    let sortQuery = {};

    if (sort == "price") {
      sortQuery = { finalPrice: sortDirection || 1 };
    }

    if (sort == "newestFirst") {
      sortQuery = { updatedAt: sortDirection || 1 };
    } else {
      sortQuery = { popular: sortDirection || -1 };
    }


    return await TripModel.find({

        $and: [
          { $text: { $search: search } },
          { days: { $gte: minDays, $lte: maxDays } },
          { finalPrice: { $gte: minPrice, $lte: maxPrice } },
          // { ...(collectionName && { "collections.name": collectionName }) }
        ],
    
    })
      .select(' name slug finalPrice ')
      .skip(skip)
      .limit(limit)
      .sort(sortQuery)
      .lean<Trip>()
      .cache({ key: query });

 

  }

  public static async findAllTripsOwner(query: any): Promise<User | null> {
    let trips = new ResourceFilter(TripModel, query).filter().paginate();
    return await trips.resource;
  }

  // For CLient

  public static async findAllPublishedTrips(query: any): Promise<User | null> {
    let trips = new ResourceFilter(TripModel, query).filter().paginate();
    return await trips.resource.cache({ key: query }).exec();
  }

  public static async FETCH_POPULAR_TRIPS_NAME_SLUG_FINALPRICE(): Promise<User | null> {
    // let trips = new ResourceFilter(TripModel, query).filter().paginate()
    return await TripModel.find({ published: true })
      .select("+name +slug +finalPrice")
      .cache({ key: "FETCH_POPULAR_TRIPS_NAME_SLUG_FINALPRICE" })
      .exec();
  }

  public static async searchTripByCollection(query: any): Promise<Trip | null> {
    const search = query.search || " ";
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    return await TripModel.find({ "collection.id": search })
      .skip(skip)
      .limit(limit)
      .lean<Trip>();
  }

  public static async removeTrip(tripId: Object | any): Promise<any | null> {
    await TripModel.findByIdAndDelete(tripId);

    return;
  }

  public static async publishTrip(
    tripId: string | Types.ObjectId
  ): Promise<Trip | null> {
    return await TripModel.updateOne(
      { _id: tripId },
      {
        $set: { published: true },
      },
      { new: true }
    )
      .lean<Trip>()
      .exec();
  }

  public static async fetchTripPricePlan(
    tripId: string | Types.ObjectId | any
  ): Promise<Trip | null> {
    return await TripModel.findById(tripId)
      .select("priceSlots")
      .lean<Trip>()
      .exec();
  }

  public static async fetchPublishedTripsNames(
    adminId: string | Types.ObjectId | any
  ): Promise<Trip | null> {
    return await TripModel.find({ adminId: adminId })
      .select("name")
      .lean<Trip>()
      .exec();
  }
}
