import { InternalError } from '../helper/ApiError';
import Feedback, { FeedbackModel } from '../models/Feedback';

export default class FeedbackController {


  public static async createFeedbackAll(data: {tripId:string,feedback:object}): Promise<Feedback | null> {

    const result = await FeedbackModel.findOneAndUpdate(
      { tripId: data.tripId },
      { $push: { feedback: data.feedback } },
      { new: true, upsert: true }
    ).lean<Feedback>();
  
    if(result){
      throw new InternalError("Unable to create Feedback")
    }
    return result
  }


  public static async getTripFeedbackAll(tripId:string): Promise<Feedback | null> {

    const result = await FeedbackModel.findOne(
      { tripId: tripId }).lean<Feedback>();
  
    if(result){
      throw new InternalError("Unable to fetch Feedback")
    }
    return result
  }

  
}
