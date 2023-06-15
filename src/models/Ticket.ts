import { Schema, model, Document } from "mongoose";
import Admin from "./Admin";

export const DOCUMENT_NAME = "Ticket";
export const COLLECTION_NAME = "tickets";

export default interface Ticket extends Document {
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

  payment: {
    status: boolean;
    amount: number;
    mode: string;
  };
  admin:Admin ;

  tripDetails: {
    name: string;
    slug: string;
    priceSlot: {
      pickupPoint: string;
      dropPoint: string;
      basePrice: number;
      pickupTransMode: string;
      dropTransMode: string;
      key:number,
      date: {
        startDate: string;
        endDate: string;
        key:number,
      };
    };
    id: string;
   
  };

  userDetails: {
    name: string;
    city: string;
  };

  confirmed?: boolean;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    passengers: [
      {
        name: {
          type: String,
          trim: true,
          max: 32,
          required: true,
        },
        mobileNumber: {
          type: Number,
          min: 10,
        },
        age: {
          type: Number,
        },
        gender: {
          type: String,
        },
        aadharNumber: {
          type: Number,
        },
        email: {
          type: String,
        },
      },
    ],

    confirmed: {
      type: Boolean,
      default: true,
    },
    admin:{
      type: Schema.Types.ObjectId,
      ref:"Admin",
      required: true,
      unique:false

    },
    completed: {
      type: Boolean,
      default: false,
    },

    tripDetails: {
      name: String,
      slug: String,
      priceSlot: {
        pickupPoint: String,
        dropPoint: String,
        amount: Number,
        pickupMode: String,
        dropMode: String,
        key:Number,
        date: {
          startDate: String,
          endDate: String,
          key:Number,
        }
      },
      id: String,
   
    },

    payment: {
      status: Boolean,
      amount: Number,
      mode: String,
    },
    userDetails: {
      name: String,
      id: Schema.Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
schema.index({admin:1}, {unique:false})

export const TicketModel = model<Ticket>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
