import { Schema, model, Document } from "mongoose";
import Admin from "./Admin";

export const DOCUMENT_NAME = "Analytics";
export const COLLECTION_NAME = "analytics";

export default interface Analytics extends Document {
  admin: Admin;
  revenue:[any],
  bookings:[any],
  status?: boolean;
  createdAt?: Date;
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
