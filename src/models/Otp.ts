import { Schema, model, Document } from 'mongoose';
import { otpInfo } from '../config';
export const DOCUMENT_NAME = 'Otp';
export const COLLECTION_NAME = 'otps';


export default interface Otp extends Document {
  data: string;
  hash:string,
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    data: {
      type: Schema.Types.Number,
      required: true,
      index:true,
     
    },

    hash:{
      type:Schema.Types.String,
      required:true
    },

    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
 
  },
  {
    versionKey: false,
    timestamps:true
  },
);

schema.index({ createdAt: 1 }, { expireAfterSeconds: otpInfo.otpExpiryTimeInSeconds })
schema.index({ data: 1 })

export const OtpModel = model<Otp>(DOCUMENT_NAME, schema, COLLECTION_NAME);
