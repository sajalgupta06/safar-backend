import { Schema, model, Document } from 'mongoose';
import slugify from 'slugify';
import User from './User'
import Trip from './Trip'

export const DOCUMENT_NAME = 'Company';
export const COLLECTION_NAME = 'companies';

export default interface Company extends Document {
  name:string;
  admin:User;
  trips:Trip[];
  photo:string;
  about:string;
  // pricingPlan:string;
  status:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
   
  name: {
      type: Schema.Types.String,
      required: true,
     
    },
    slug: {
      type: Schema.Types.String,

    },
    about: {
      type: Schema.Types.String,

    },
    photo: {
      type: Schema.Types.String,

    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
     
    },
    trips: [{
      type: Schema.Types.ObjectId,
      ref: "Trip",
      
    }],

  

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

schema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

schema.index({admin:1})



export const CompanyModel = model<Company>(DOCUMENT_NAME, schema, COLLECTION_NAME);
