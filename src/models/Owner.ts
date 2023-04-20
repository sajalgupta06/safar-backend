import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
export const DOCUMENT_NAME = "Owner";
export const COLLECTION_NAME = "owners";

export default interface Owner extends Document {
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
    },
    lastName: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 100,
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
    password: {
      type: Schema.Types.String,
    },
    photo: {
      type: Schema.Types.String,
      trim: true,
    },
    gender: {
      type: Schema.Types.String,
      enum: ["Male", "Female", "Other"],
    },
    city: {
      type: Schema.Types.String,
    },
    country: {
      type: Schema.Types.String,
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

schema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    let oldPassword = this.password  || " "     
    const hashed_password = await bcrypt.hash(oldPassword, salt);
    this.password = hashed_password;
    console.log(this.password);
    next();
  } catch (error: any) {
    next(error);
  }
});

schema.index({ email: 1 });
schema.index({ phone: 1 });

export const OwnerModel = model<Owner>(DOCUMENT_NAME, schema, COLLECTION_NAME);
