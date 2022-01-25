import Company, { CompanyModel } from '../models/Company';
import ResourceFilter from '../helper/ResourceFilter'
import { InternalError } from '../helper/ApiError';
import { ObjectId ,Types} from 'mongoose';
import Logger from '../helper/Logger';

export default class CompanyController {
  
  public static async findAllCompanyOwner(query:any): Promise<Company | null> {

    let company = new ResourceFilter(CompanyModel, query)
    return  await company.resource.lean()

  }

  public static async findSingleCompanyOwner(adminId:Types.ObjectId): Promise<Company | null> {

    let company = await CompanyModel.findOne({admin:adminId})
    if(!company)
    {
      throw new InternalError("Error in fetching Company")

    }
    return company

  }

  public static async findByIdAndUpdate(companyId:Types.ObjectId,update:any): Promise<Company | null> {

    let company = await CompanyModel.findByIdAndUpdate(companyId,{$set:update},{new:true}).lean<Company>()
    if(!company)
    {
      throw new InternalError("Error in fetching Company")

    }
    return company

  }

  public static async updateWorkingTrip(companyId:Types.ObjectId|string,data:object): Promise<Company | null> {

    

    let company = await CompanyModel.findByIdAndUpdate(companyId,{$set:{workingTrip:data}},{new:true}).lean<Company>()

    if(!company)
    {
      throw new InternalError("Error in fetching Company")

    }
    return company

  }


  public static async create(data:object): Promise<Company | null> {

    Logger.info(data)

    let company = new CompanyModel(data)

    const savedCompany = await company.save()
    if(!savedCompany)
    {
      throw new InternalError("Error in saving Company")

    }
    return savedCompany

  }


}
