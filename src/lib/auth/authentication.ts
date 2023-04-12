import express from 'express';
import { ProtectedRequest } from '../../helper/app-request';
import AdminController from '../../controllers/Admin';
import { AuthFailureError, AccessTokenError, TokenExpiredError } from '../../helper/ApiError';
import JWT from '../../helper/JWT';
import KeystoreController from '../../controllers/Keystore';
import { Types } from 'mongoose';
import { getAccessToken, validateTokenData } from './authUtils';
import validator, { ValidationSource } from '../../helper/validator';
import schema from './schema';
import asyncHandler from '../../helper/asyncHandler';
import { RoleCode } from '../../models/Role';
import UserController from '../../controllers/User';
import OwnerController from '../../controllers/Owner';
import Logger from '../../helper/Logger';

const router = express.Router();

export default router.use(

  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    
    if ( !req.currentRoleCode) throw new AuthFailureError('Permission denied');


    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    try {
      
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);


      if(req.currentRoleCode==RoleCode.ADMIN)
      {
        const admin = await AdminController.findById(new Types.ObjectId(payload.sub));
        if (!admin) throw new AuthFailureError('User not registered');
        req.user = admin;
  
        const keystore = await KeystoreController.findforKey(req.user._id, payload.prm);
        if (!keystore) throw new AuthFailureError('Invalid access token');
        req.keystore = keystore;
  
        // Role Verification 
  
   
      const validRole = req.user.role==req.currentRoleCode
       
      if (!validRole) throw new AuthFailureError('Permission denied');
  
      }

      else if(req.currentRoleCode==RoleCode.CLIENT)
      {
        const user = await UserController.findById(new Types.ObjectId(payload.sub));
        if (!user) throw new AuthFailureError('User not registered');
        req.user = user;
  
        const keystore = await KeystoreController.findforKey(req.user._id, payload.prm);
        if (!keystore) throw new AuthFailureError('Invalid access token');
        req.keystore = keystore;
  
        // Role Verification 
  
   
      const validRole = req.user.role==req.currentRoleCode
       
      if (!validRole) throw new AuthFailureError('Permission denied');
  
      }

      else if(req.currentRoleCode==RoleCode.OWNER)
      {
        const owner = await OwnerController.findById(new Types.ObjectId(payload.sub));
        if (!owner) throw new AuthFailureError('User not registered');
        req.user = owner;
  
        const keystore = await KeystoreController.findforKey(req.user._id, payload.prm);
        if (!keystore) throw new AuthFailureError('Invalid access token');
        req.keystore = keystore;
  
        // Role Verification 
  
      const validRole = req.user.role==req.currentRoleCode


       
      if (!validRole) throw new AuthFailureError('Permission denied');
  
      }
 
    return next();

    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }),
);
