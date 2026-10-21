import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import type { TJwtPayload } from './auth.interface.ts';

export const createToken = (payload: TJwtPayload) => {
  const signOptions: SignOptions = {
    expiresIn: payload.expiresIn as '1d',
  };

  return jwt.sign(payload.jwtPayload, payload.secret, signOptions);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
