import { model, Schema, Document, ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import slugify from "slugify";
import Trip from "./Trip";
import AllTickets from "./AllTickets";
export const DOCUMENT_NAME = "Admin";
export const COLLECTION_NAME = "admins";

export default interface Admin extends Document {
  
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    city?: string;
    country?: string;
    phone?: string;
    role: string;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    gender?: string;
    photo?: string;
    companyType?: string;
    onBoardingStatus?: string;
    companyRegistration:{
      legalCompanyName: { type: String },
      logo:{type:String},
      gstin: { type: String },
      yearOfFoundation: { type: String },
      about:string;
      companyPan : {type:String},
      address: {
        country: { type: String },
        state: { type: String },
        city: { type: String },
        code: { type: String },
        address1: { type: String },
        address2: { type: String },
        phone: { type: Number },
      },
      companyWebsite: { type: String },
    }
    bankDetails:{
      accountNumber:Number,
      accountHolderName:String,
      IfscCode:String,
    },
    slug:string,
    trips?:Trip[];
    alltickets?:AllTickets[];
    workingTrip:any;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema(
  {

    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    phone: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    password: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    age: {
      type: Number,
    
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: Schema.Types.String,
      default:"ADMIN",
    },

    about: {
      type: Schema.Types.String,
    },


    trips: [{
      type: Schema.Types.ObjectId,
      ref: "Trip",
    }],
    allTickets: [{
      type: Schema.Types.ObjectId,
      ref: "AllTickets",
    }],

    status: {
      type: Boolean,
      default: true,
    },
    slug:String,

    companyType: {
      type: String,
      enum: ["ORGANISATION", "INDIVIDUAL"],
      default: "INDIVIDUAL",
    },

    onBoardingStatus: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
    },

   
    companyRegistration: {

      legalCompanyName: { type: String },
      logo: { type: String },
      gstin: { type: String },
      anuualTurnover:{type:String},
      yearOfFoundation: { type: String },
      pan : {String},
      address: {
        state: { type: String },
        city: { type: String },
        address: { type: String },
      },

      companyWebsite: { type: String },
     
    },

    socialMediaLinks:{
      instagram:String,
      facebook:String,
      youtube:String,
    }
    ,
    bankDetails:{
      accountNumber:Number,
      accountHolderName:String,
      IfscCode:String,
    },

    workingTrip: {
      type: {},  
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
    let oldpassword = this.password ||""
    const hashed_password = await bcrypt.hash(oldpassword, salt);
    this.password = hashed_password;
    console.log(this.password);
    next();
  } catch (error: any) {
    next(error);
  }
});

schema.pre("save", function (next) {
  this.slug = slugify(this?.companyRegistration?.legalCompanyName||"default", { lower: true });
  next();
});

schema.index({ email: 1 });
schema.index({ phone: 1 });

export const AdminModel = model<Admin>(DOCUMENT_NAME, schema, COLLECTION_NAME);
