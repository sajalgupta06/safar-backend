import { InternalError } from '../helper/ApiError';
import { Types } from 'mongoose';
import KeystoreController from './Keystore';
import Keystore from '../models/KeyStore';
import Owner, { OwnerModel } from '../models/Owner';
import ResourceFilter from '../helper/ResourceFilter';

export default class OwnerController { 
 
  public static async create(data:object): Promise<Owner | null> {


    const owner = new OwnerModel(data)
    const savedOwner = await owner.save()

    if(!savedOwner)
    {
        throw new InternalError("Unable to create new user")
    }

    return savedOwner
  }

  
  public static findById(id: Types.ObjectId|string): Promise<Owner | null> {
    return OwnerModel.findOne({ _id: id, status: true })
      .lean<Owner>()
      .exec();
  }


  public static async findAll(query:any): Promise<Owner | null> {
    let owner = new ResourceFilter(OwnerModel, query).filter().paginate()
    return  await owner.resource
  }


  
  public static findByEmail(email: string): Promise<Owner | null> {
    return OwnerModel.findOne({ email: email, status: true })
      .lean<Owner>()
      .exec();
  }


  public static async update(
    user: Owner,
    accessTokenKey: string,
    refreshTokenKey: string,
  ): Promise<{ user: Owner; keystore: Keystore }> {
    user.updatedAt = new Date();
    await OwnerModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
    const keystore = await KeystoreController.create(user._id, accessTokenKey, refreshTokenKey);
    return { user: user, keystore: keystore };
  }


  public static updateInfo(user: Owner): Promise<any> {

    return OwnerModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
  }



}
