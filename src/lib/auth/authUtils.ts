import { Tokens } from '../../helper/app-request';
import { AuthFailureError, InternalError } from '../../helper/ApiError';
import JWT, { JwtPayload } from '../../helper/JWT';
import { Types } from 'mongoose';
import UserModel from '../../models/User';
import AdminModel from '../../models/Admin';
import OwnerModel from '../../models/Owner';
import { tokenInfo } from '../../config';
import bcrypt from 'bcrypt'

export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError('Invalid Authorization');
  if (!authorization.startsWith('Bearer ')) throw new AuthFailureError('Invalid Authorization');
  return authorization.split(' ')[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience ||
    !Types.ObjectId.isValid(payload.sub)
  )
    throw new AuthFailureError('Invalid Access Token');
  return true;
};

export const createTokens = async (
  user: UserModel | AdminModel | OwnerModel,
  accessTokenKey: string,
  refreshTokenKey: string,
): Promise<Tokens> => {
  const accessToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      user._id.toString(),
      accessTokenKey,
      tokenInfo.accessTokenValidityDays,
    ),
  );

  if (!accessToken) throw new InternalError();

  const refreshToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      user._id.toString(),
      refreshTokenKey,
      tokenInfo.refreshTokenValidityDays,
    ),
  );

  if (!refreshToken) throw new InternalError();

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  } as Tokens;
};


export const validatePassword = async (password:string,hashedPassword:string): Promise<boolean> => {
  
      try {
        return await bcrypt.compare(password,hashedPassword);
      } catch (error) {
        throw error;
      }
  
  };
