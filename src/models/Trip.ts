import { model, Schema, Document } from "mongoose";
import slugify from "slugify";
import User from "./User";

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
  locations: [string];
  region: string;
  about:string;
  ageLimit: number;
  lastDate: string;
  photos: [string];
  days: number;
  nights: number;
  priceSlots: [
    {
      pickupPoint: string;
      pickupMode: string;
      dropPoint: string;
      dropMode: string;
      amount: number;
      key:number;
     date:{
        startDate:string,
        endDate:string,
        key:number
      }
    }
  ];

  itinerary: any;
  highlights: [string];
  inclusions: [string];
  exclusions: [string];
  terms: [string];
  recommendations: [string];
  finalPrice: number;
  discount: number;
  completed: boolean;
  published: boolean;
  allowCancellation: boolean;
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
    key:{ type: Schema.Types.Number}
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
    locations: [Schema.Types.String],

    region: {type:Schema.Types.String} ,

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
    allowCancellation: {
      type: Schema.Types.Boolean,
      default: false,
    },

    priceSlots: [
      {
        pickupPoint: Schema.Types.String,
        pickupMode: Schema.Types.String,
        dropPoint: Schema.Types.String,
        dropMode: Schema.Types.String,
        amount: Schema.Types.Number,
        key:{type: Schema.Types.Number},
        date: {
          key:{type: Schema.Types.Number},
          startDate:{type:Schema.Types.String},
          endDate:{type:Schema.Types.String},
          }
      },
    ],

    itinerary: {},
    highlights: [Schema.Types.String],
    terms: [Schema.Types.String],
    inclusions: [Schema.Types.String],
    exclusions: [Schema.Types.String],
    recommendations: [Schema.Types.String],

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
  region: "text",
  name: "text",
  locations: "text",
  "collections.name": "text",
});


export const TripModel = model<Trip>(DOCUMENT_NAME, schema, COLLECTION_NAME);
