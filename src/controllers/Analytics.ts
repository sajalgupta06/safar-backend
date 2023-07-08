import { AllTicketsModel } from '../models/AllTickets';
import Analytics, { AnalyticsModel } from '../models/Analytics';

export default class AnalyticsController {

  public static async fetchRevenue(adminId: string): Promise<Analytics | null> {

    return AnalyticsModel.findOne({admin:adminId}).select('revenue').lean<Analytics>().exec()
    
  }


  public static async fetchBookings(adminId: string): Promise<Analytics | null> {

    return AnalyticsModel.findOne({admin:adminId}).select('bookings').lean<Analytics>().exec()
    
  }

  public static async fetchTripsInsights(adminId: string): Promise<Analytics | null> {

    const res =  AllTicketsModel.find({admin:adminId}).populate('trip',   
   { completed: true }
  ).lean<Analytics>().exec()

   
    return res
    
  }
}
