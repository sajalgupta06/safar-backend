import { RoleCode } from '../models/Role';
import { RoleRequest } from '../helper/app-request';
import { Response, NextFunction } from 'express';

export default (roleCode: RoleCode) => (req: RoleRequest, res: Response, next: NextFunction) => {
  req.currentRoleCode = roleCode;
  next();
};
