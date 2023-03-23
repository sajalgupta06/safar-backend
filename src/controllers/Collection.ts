import Collection, { CollectionModel } from '../models/Collection';
import ResourceFilter from '../helper/ResourceFilter'
import { InternalError } from '../helper/ApiError';
export default class CollectionController {
  
  public static async findAllCollectionsOwner(query:any): Promise<Collection | null> {

    let collection = new ResourceFilter(CollectionModel, query)
    return  await collection.resource

  }

  public static async deleteCollectionsOwner(collectionIds:string[]): Promise<any | null> {

    return collectionIds.map(async (collectionId) => {
      const deletedCollection = await CollectionModel.findByIdAndDelete({ _id: collectionId });
      if(!deletedCollection)
      {

        throw new InternalError("Error in deleting Collection")
      }
    })
     
  }

  public static async CreateCollectionOwner(data:any): Promise<Collection | null> {

    let collection = new CollectionModel(data)
    
    let savedColl = await collection.save()
    if(!savedColl) throw new InternalError("Unable to create Collection")

    return savedColl
  }


  public static async getCollectionNames(): Promise<any | null> {

    let collection = await  CollectionModel.find({}).select('_id name');
   
  
    if(!collection) throw new InternalError("Unable to fetch Collection")

    return collection
  }



  


}
