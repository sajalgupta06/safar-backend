import { Schema, model, Document } from "mongoose";
import Admin from "./Admin";
import Trip from "./Trip";
import User from "./User";

export const DOCUMENT_NAME = "Queries";
export const COLLECTION_NAME = "queries";

export default interface Analytics extends Document {
  trip: Trip;
  admin:Admin,
  client:User,
  resolved?: boolean;
  query?: [{
    question:string,
    answer:string
  }];
  updatedAt?: Date;
}

const schema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: false,
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: false,
    },


    trip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      unique: false,
    },

    revenue: [{type:{}}],
    bookings: [{type:{}}],

    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

schema.index({ admin: 1 });

export const AnalyticsModel = model<Analytics>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
