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

  payment: {
    status: boolean;
    amount: string;
    mode: string;
  };

  trip: {
    name: string;
    slug: string;
    priceSlot: {
      pickupPoint: string;
      dropPoint: string;
      basePrice: number;
      pickupTransMode: string;
      dropTransMode: string;
    };
    id: string;
    date: {
      startDate: string;
      endDate: string;
    };
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

    trip: {
      name: String,
      slug: String,
      priceSlot: {
        pickupPoint: String,
        dropPoint: String,
        basePrice: Number,
        pickupTransMode: String,
        dropTransMode: String,
      },
      id: String,
      date: {
        startDate: String,
        endDate: String,
      },
    },

    payment: {
      status: Boolean,
      amount: String,
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

export const TicketModel = model<Ticket>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
