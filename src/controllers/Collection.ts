import Collection, { CollectionModel } from "../models/Collection";
import ResourceFilter from "../helper/ResourceFilter";
import { InternalError } from "../helper/ApiError";
import slugify from "slugify";
export default class CollectionController {
  public static async findAllCollectionsOwner(
    query: any
  ): Promise<Collection | null> {
    let collection = new ResourceFilter(CollectionModel, query);
    return await collection.resource;
  }

  public static async deleteCollectionsOwner(
    collectionIds: string[]
  ): Promise<any | null> {
    return collectionIds.map(async (collectionId) => {
      const deletedCollection = await CollectionModel.findByIdAndDelete({
        _id: collectionId,
      });
      if (!deletedCollection) {
        throw new InternalError("Error in deleting Collection");
      }
    });
  }

  public static async CreateCollectionOwner(data: {
    name: string;
    photo: string | null;
  }): Promise<Collection | null> {
    let slug = slugify(data.name).toLowerCase();

    let newData = { ...data, slug };

    let collection = new CollectionModel(newData);

    let savedColl = await collection.save();
    if (!savedColl) throw new InternalError("Unable to create Collection");

    return savedColl;
  }

  public static async getCollectionNames(): Promise<any | null> {
    let collection = await CollectionModel.find({}).select("_id name");

    if (!collection) throw new InternalError("Unable to fetch Collection");

    return collection;
  }

  public static async getCollections(): Promise<any | null> {
    let collection = await CollectionModel.find({});

    if (!collection) throw new InternalError("Unable to fetch Collection");

    return collection;
  }

  public static async getSingleCollection(slug:string): Promise<any | null> {
    let collection = await CollectionModel.findOne({slug:slug});

    if (!collection) throw new InternalError("Unable to fetch Collection");

    return collection;
  }
  public static async updateCollection(
    collectionId: string,
    data: { name: string; photo: string | null }
  ): Promise<Collection | null> {
    let slug = slugify(data.name).toLowerCase();
    let newData = { ...data, slug };

    return await CollectionModel.findByIdAndUpdate(
      collectionId,
      { $set: newData },
      { upsert: true, new: true }
    ).lean();
  }
}
