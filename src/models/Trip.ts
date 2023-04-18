import { model, Schema, Document } from "mongoose";
import slugify from "slugify";
import User from "./User";
import Ticket from './Ticket'

export const DOCUMENT_NAME = "Trip";
export const COLLECTION_NAME = "trips";

export default interface Trip extends Document {
  name: string;
  slug: string;
  dates:[{
    startDate:string,
    endDate:string
  }]
  admin:User;
  noOfPlaces: number;
  location: string;
  about:string;
  ageLimit: number;
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
      basePrice: number;
    }
  ];

  itinerary: any;
  highlights: [string];
  conditions: [string];
  inclusions: [string];
  exclusions: [string];
  finalPrice: number;
  discount: number;
  completed: boolean;
  published: boolean;
  cancelled: boolean;
  collections: [{
    name:string,
    id:string
  }];
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
   
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
   dates:[
    {

    startDate:{type:Schema.Types.String},
    endDate:{type:Schema.Types.String},
    }
   ],
  
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
   
    noOfPlaces: {
      type: Schema.Types.Number,
    },
    location: {
      type: Schema.Types.String,
    },
    ageLimit: {
      type: Schema.Types.Number,
    },
    lastDate: {
      type: Schema.Types.String,
    },

    about: {
      type: Schema.Types.String,
    },
    photos: [
      {
        type: Schema.Types.String,
      },
    ],
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

    priceSlots: [
      {
        pickupPoint: Schema.Types.String,
        pickupTransMode: Schema.Types.String,
        pickupAc: Schema.Types.Boolean,
        dropPoint: Schema.Types.String,
        dropTransMode: Schema.Types.String,
        dropAc: Schema.Types.Boolean,
        basePrice: Schema.Types.Number,
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

schema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

schema.index({ admin: 1 });
schema.index({ company: 1 });
schema.index({ slug: 1 });
schema.index({ "collections.id": -1 });
schema.index({
  location: "text",
  name: "text",
  allDestinations: "text",
  "collections.name": "text",
});


export const TripModel = model<Trip>(DOCUMENT_NAME, schema, COLLECTION_NAME);
