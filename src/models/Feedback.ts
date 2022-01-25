import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Feedback';
export const COLLECTION_NAME = 'feedbacks';

export default interface Feedback extends Document {
  tripId:string
  feedback: [
    {
      body: { type: string },
      rating: { type: number },
      user:{
          name:string,
          logo:string,
          userId:string
      },
    },
  ],
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    tripId: String,
    feedback: [
      {
        body: { type: String },
        rating: { type: Number },
        user:{
            name:String,
            logo:String,
            userId:String
        },
      },
    ],
   
  },
  
  {
    versionKey: false,
    timestamps:true
  },
);



schema.index({tripId:1})
export const FeedbackModel = model<Feedback>(DOCUMENT_NAME, schema, COLLECTION_NAME);
