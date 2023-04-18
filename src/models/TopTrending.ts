import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Top_Trending';
export const COLLECTION_NAME = 'Top_Trending';



export default interface TopTrending extends Document {
  locations:[{
    name:string,
    slug:string,
    photo:string,
  }],

  collections:[{
    name:string,
    slug:string,
    photo:string,
  }]

}

const schema = new Schema(
  {
    locations:[{
      name:{type:Schema.Types.String,unique:true},
      slug:Schema.Types.String,
      photo:Schema.Types.String
      
    }],
    collections:[{
      name:{type:Schema.Types.String,unique:true},
      slug:Schema.Types.String,
      photo:Schema.Types.String
    }]  
  },
  {
    versionKey: false,
    timestamps:true
  },
);

export const TopTrendingModel = model<TopTrending>(DOCUMENT_NAME, schema, COLLECTION_NAME);
