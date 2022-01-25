import { Schema, model, Document } from 'mongoose';
import slugify from 'slugify';

export const DOCUMENT_NAME = 'Collection';
export const COLLECTION_NAME = 'collections';

export default interface Collection extends Document {
  name:string;
  photo:string;
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
    photo: {
      type: Schema.Types.String,

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


export const CollectionModel = model<Collection>(DOCUMENT_NAME, schema, COLLECTION_NAME);
