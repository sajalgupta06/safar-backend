import { InternalError } from '../helper/ApiError';
import TopTrending ,{TopTrendingModel} from '../models/TopTrending'

export default  class TopTrendingController {


  public static async ADD_LOCATIONS(data: any): Promise<
  TopTrending | null> {

    const result = await TopTrendingModel.findOneAndUpdate({},{ $push: { locations: data } },{new:true,upsert:true}).populate("locations")
   
    if(!result)
    {
      throw new InternalError("Unable to Add Location")
    }

    return result
  }


  public static async ADD_COLLECTIONS(data: string): Promise<
  TopTrending | null> {

    const result = await TopTrendingModel.findOneAndUpdate({},{ $push: { collections: data } },{new:true,upsert:true})
   
    if(!result)
    {
      throw new InternalError("Unable to Add Location")
    }

    return result
  }



  public static async DELETE_FROM_LOCATIONS(id:string): Promise<TopTrending | null> {

    const deletedLocation = await TopTrendingModel.findOneAndUpdate({}, {
      $pull: {
          locations: {_id: id},
      },
  })
   
    if(!deletedLocation)
    {
      throw new InternalError("Unable to delete Location")
    }

    return deletedLocation
  }

  public static async DELETE_FROM_COLLECTIONS(id:string): Promise<TopTrending | null> {
    const deletedCollection = await TopTrendingModel.findOneAndUpdate({}, {
      $pull: {
          collections: {_id: id},
      },
  })
   
    if(!deletedCollection)
    {
      throw new InternalError("Unable to delete Collection")
    }

    return deletedCollection
  }

  public static async FETCH_TOP_TRENDING(): Promise<
  TopTrending | null> {

    const result = await TopTrendingModel.findOne()
   
    if(!result)
    {
      throw new InternalError("Unable to fetch document")
    }

    return result
  }


}


