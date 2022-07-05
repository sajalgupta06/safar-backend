import { Schema, model, Document } from "mongoose";

export const DOCUMENT_NAME = "Ticket";
export const COLLECTION_NAME = "tickets";

export default interface Ticket extends Document {
  passengers: [
    {
      name: string;
      phone: number;
      email: string;
      age: number;
      gender: string;
      adhr: string;
    }
  ];
  priceSlot: {
    pickupPoint: string;
    dropPoint: string;
    basePrice: number;
    pickupAc: boolean;
    pickupTransMode: string;
    dropTransMode: string;
    dropAc: boolean;
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
        phone: {
          type: Number,
          min: 10,
        },
        age: {
          type: Number,
        },
        gender: {
          type: String,
        },
        adhr: {
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

    completed: {
      type: Boolean,
      default: false,
    },

    priceSlots: {
      pickupPoint: String,
      dropPoint: String,
      basePrice: Number,
      pickupTransMode: String,
      dropTransMode: String,
      finalPrice: Number

    },

    userDetails: {
      name: String,
      id:Schema.Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


export const TicketModel = model<Ticket>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
