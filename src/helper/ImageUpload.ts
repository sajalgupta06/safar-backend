import AWS from 'aws-sdk'
import {awsKeys} from '../config'
import { SuccessResponse } from './ApiResponse';

const s3 =  new AWS.S3({
  accessKeyId:awsKeys.accessIDKey,
  secretAccessKey:awsKeys.secreteAccessKey,
  signatureVersion: 'v4',
  region: 'ap-south-1'


})

export default class UploadImage {

public static async single(key:any): Promise<any> {
  
  var params = {Bucket: 'safar-bucket', Key:  key ,};

    
   return  s3.getSignedUrl('putObject', params)
  
 


}

}