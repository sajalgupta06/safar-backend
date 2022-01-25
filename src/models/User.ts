import { model, Schema, Document } from "mongoose";
import Ticket from "./Ticket";
import Trip from "./Trip";
export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface User extends Document {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  city?: string;
  country?: string;
  photo?: string;
  phone?: string;
  role: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  gender?: string;
  tickets:Ticket[];
  favouriteTrips:Trip[];
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 100,
      lowercase:true,
    },
    lastName: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 100,
      lowercase:true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
    },
    phone: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
    },
    
    photo: {
      type: Schema.Types.String,
      trim: true,
    },
    gender: {
      type: Schema.Types.String,
      enum: ["male", "female", "other"],
    },
    city: {
      type: Schema.Types.String,
      lowercase:true,
    },
    country: {
      type: Schema.Types.String,
      lowercase:true,
    },
    role: {
      type: Schema.Types.String,
      required: true,
    },
    phoneVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },

    emailVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    tickets:[{
      type:Schema.Types.ObjectId,
      ref:"Ticket"
    }],

    favouriteTrips:[{
      type:Schema.Types.ObjectId,
      ref:"Trip"
    }],
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


schema.index({ email: 1 });
schema.index({ phone: 1 });
schema.index({ status: 1 });

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
