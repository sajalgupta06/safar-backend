import { Request } from 'express';
import User from '../models/User';
import Keystore from '../models/KeyStore';
import Admin from '../models/Admin';
import Owner from '../models/Owner';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User | Admin | Owner;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
