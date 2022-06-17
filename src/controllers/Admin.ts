import Role, { RoleCode, RoleModel } from '../models/Role';
import { InternalError } from '../helper/ApiError';
import { Types } from 'mongoose';
import KeystoreController from './Keystore';
import Keystore from '../models/KeyStore';
import Admin, { AdminModel } from '../models/Admin';
import ResourceFilter from '../helper/ResourceFilter';

export default class AdminController {

  
 
 
  public static async create(data:object): Promise<Admin | null> {

    const admin = new AdminModel({...data,phoneVerified:true,emailVerified:true,role:RoleCode.ADMIN})

    const savedAdmin = await admin.save()

    if(!savedAdmin)
    {
        throw new InternalError("Unable to create new user")
    }

    return savedAdmin
  }



  
  public static findById(id: Types.ObjectId|string): Promise<Admin | null> {
    return AdminModel.findOne({ _id: id, status: true })
      .lean<Admin>()
      .exec();
  }



  public static async findAll(query:any): Promise<Admin | null> {

    let admin = new ResourceFilter(AdminModel, query).filter().paginate()
    return  await admin.resource
    
      
  }

  
  public static async findByEmail(email: string): Promise<Admin | null> {
    return await AdminModel.findOne({ email: email, status: true })
      .select('+email +password +role')
      .lean<Admin>()
      .exec();
  }

  public static async findByPhone(phone: string): Promise<Admin | null> {
    return await AdminModel.findOne({ phone: phone, status: true })
      .select('+phone +password +role')
      .lean<Admin>()
      .exec();
  }

  

  public static async update(
    user: Admin,
    accessTokenKey: string,
    refreshTokenKey: string,
  ): Promise<{ user: Admin; keystore: Keystore }> {
    user.updatedAt = new Date();
    await AdminModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
    const keystore = await KeystoreController.create(user._id, accessTokenKey, refreshTokenKey);
    return { user: user, keystore: keystore };
  }

  public static updateInfo(user: Admin): Promise<any> {
    user.updatedAt = new Date();
    return AdminModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
  }


  public static fetchCompanyNameLogoPlan(id: Types.ObjectId|string): Promise<Admin | null> {
   
    return AdminModel.findById(id).select("companyRegistration")
      .lean<Admin>()
      .exec();
  }



}
