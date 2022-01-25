import User, { UserModel } from '../models/User';
import { InternalError } from '../helper/ApiError';
import { Types } from 'mongoose';
import KeystoreController from './Keystore';
import Keystore from '../models/KeyStore';
import Logger from '../helper/Logger';
import ResourceFilter from '../helper/ResourceFilter';

export default class UserController {

  
  // Owner
 
  public static async createUser(data:any): Promise<User | null> {
  
    const user =  new UserModel(data)
    return  await user.save()
  }


  // Customer
  
  public static findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true })
      .lean<User>().cache({key:id})
      .exec();
  }

  public static findUserForClient(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true })
      .lean<User>()
      .exec();
  }



  public static findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email, status: true })
      .select('+email +password +role')
      .lean<User>()
      .exec();
  }


  public static async findByPhone(phone: string): Promise<User | null> {
    const user = await  UserModel.findOne({ phone: phone, status: true })
      .lean<User>()
      .exec();

      return user
  }



  public static async findAll(query: any): Promise<User | null> {

    let users = new ResourceFilter(UserModel, query).filter().paginate()
    return  await users.resource.lean()

    
  }



  public static async update(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
  ): Promise<{ user: User; keystore: Keystore }> {
    user.updatedAt = new Date();
    await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
    const keystore = await KeystoreController.create(user._id, accessTokenKey, refreshTokenKey);
    return { user: user, keystore: keystore };
  }


  public static async updateInfo(id:Types.ObjectId,data:any): Promise<any> {
   return  await  UserModel.findByIdAndUpdate( id , { $set: { ...data } },{new:true})
      .lean()
      .exec();

 
  }



}
