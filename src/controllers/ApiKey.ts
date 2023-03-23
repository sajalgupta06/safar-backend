import ApiKey, { ApiKeyModel } from '../models/ApiKey';

export default class ApiController {
  public static async findByKey(key: string): Promise<ApiKey | null> {
    return ApiKeyModel.findOne({ key: key, status: true }).lean<ApiKey>()
    .cache({key:key}).exec();
    
  }

  public static async findAllKeys(): Promise<ApiKey | null> {
    return ApiKeyModel.find({ status: true }).lean<ApiKey>().exec();
  }


  public static async createKey(key:string,metaData:object): Promise<ApiKey | null> {
    return ApiKeyModel.create({ key,metaData });
  }
}
