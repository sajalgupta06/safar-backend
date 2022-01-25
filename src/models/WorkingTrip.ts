import { model, Schema, Document, ObjectId } from "mongoose";

export const DOCUMENT_NAME = "WorkingTrip";
export const COLLECTION_NAME = "workingTrips";

export default interface WorkingTrip extends Document {

  name: string;
  from: string;
  to: string;
 
  noOfPlaces: Number;
  location: string;
  ageLimit: string;
  about:string;
  lastDate: string;
  photos: [string];
  days: number;
  nights: number;
  allDestinations: [string];
  priceSlots: [
    {
      pickupPoint: string;
      pickupTransMode: string;
      pickupAc: boolean;
      dropPoint: string;
      dropTransMode: string;
      dropAc: boolean;
      basePrice: string;
    }
  ];

  itinerary: any;
  highlights: [string];
  conditions: [string];
  inclusions: [string];
  exclusions: [string];
  finalPrice: boolean;
  discount: number;
  completed: boolean;
  published: boolean;
  cancelled: boolean;
  collections: [{
    name:string,
    id:ObjectId
  }];
  status?: boolean;
  progress:number;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
  
    collections: [{
      name: Schema.Types.String,
      id: Schema.Types.String,
    }],
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: Schema.Types.String,
      trim: true,
    },
    from: {
      type: Schema.Types.String,
    },
    to: {
      type: Schema.Types.String,
    },
    noOfPlaces: {
      type: Schema.Types.String,
    },
    location: {
      type: Schema.Types.String,
    },
    ageLimit: {
      type: Schema.Types.String,
    },
    lastDate: {
      type: Schema.Types.String,
    },
    photos: [
      {
        type: Schema.Types.String,
      },
    ],
    about: {
      type: Schema.Types.Number,
    },
    days: {
      type: Schema.Types.Number,
    },
    nights: {
      type: Schema.Types.Number,
      trim: true,
    },
    discount: Schema.Types.Number,
    finalPrice: Schema.Types.Number,
    completed: {
      type: Schema.Types.Boolean,
      default: false,
    },
    published: {
      type: Schema.Types.Boolean,
      default: false,
    },
    cancelled: {
      type: Schema.Types.Boolean,
      default: false,
    },
    progress: {
      type: Schema.Types.Number,
      default: 0,
    },

    priceSlots: [
      {
        pickupPoint: Schema.Types.String,
        pickupTransMode: Schema.Types.String,
        pickupAc: Schema.Types.Boolean,
        dropPoint: Schema.Types.String,
        dropTransMode: Schema.Types.String,
        dropAc: Schema.Types.Boolean,
        basePrice: Schema.Types.String,
      },
    ],  

    itinerary: {},
    highlights: [Schema.Types.String],
    conditions: [Schema.Types.String],
    inclusions: [Schema.Types.String],
    exclusions: [Schema.Types.String],
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
   
  },
  {
    versionKey: false,
    timestamps:true
  }
);





export const WorkingTripModel = model<WorkingTrip>(DOCUMENT_NAME, schema, COLLECTION_NAME);
