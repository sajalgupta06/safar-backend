import { Schema, model, Document } from 'mongoose';
import Ticket from './Ticket'
import Trip from './Trip';

export const DOCUMENT_NAME = 'AllTickets';
export const COLLECTION_NAME = 'all_tickets';

export default interface AllTickets extends Document {
  trip:Trip ;
  tickets:Ticket[];
  ticketCount: number;
  metadata: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    trip: {
      type: Schema.Types.ObjectId,
      ref:"Trip",
      required: true,
      unique: true,
    },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    
    ticketCount:{
        type:Number,
        default:0
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

schema.index({tripId:1})

export const AllTicketsModel = model<AllTickets>(DOCUMENT_NAME, schema, COLLECTION_NAME);
