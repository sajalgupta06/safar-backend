import { InternalError } from '../helper/ApiError';
import Otp, { OtpModel } from '../models/Otp';

export default  class OtpController {

  public static async findOtp(data: string): Promise<Otp> {
    const otp = await OtpModel.findOne({ data: data, status: true }).lean<Otp>().exec();

    if(!otp)
    {
      throw new InternalError("Unable to get Otp")
    }
    return otp
  }


  public static async create(data: string,hash:string): Promise<Otp | null> {

    const savedOtp = await OtpModel.findOneAndUpdate({data:data},{data:data,hash:hash},{new:true,upsert:true})
   
    if(!savedOtp)
    {
      throw new InternalError("Unable to get Otp")
    }

    return savedOtp
  }


  public static async delete(data:string): Promise<Otp | null> {

    const deletedOtp = await OtpModel.findOneAndDelete({data:data})
   
    if(!deletedOtp)
    {
      throw new InternalError("Unable to delete Otp doc")
    }

    return deletedOtp
  }


}
