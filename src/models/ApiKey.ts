import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'ApiKey';
export const COLLECTION_NAME = 'api_keys';

export default interface ApiKey extends Document {
  key: string;
  version: number;
  metadata: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    key: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      maxlength: 1024,
      index:true
    },
    version: {
      type: Schema.Types.Number,
      
      min: 1,
      max: 100,
    },
    metaData: {
      type: {},
      required: true,
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

export const ApiKeyModel = model<ApiKey>(DOCUMENT_NAME, schema, COLLECTION_NAME);

