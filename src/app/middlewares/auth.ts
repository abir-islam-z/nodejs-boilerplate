import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '#app/config/index';
import AppError from '#app/errors/AppError';
import type { DecodedJWTPayload } from '#app/interface/jwtdecoded';
import type { TUserRole } from '#app/modules/user/user.interface';
import { UserModel } from '#app/modules/user/user.model';
import catchAsync from '#app/utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token =
        req.headers.authorization?.split(' ')[1] || req.cookies.token;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt.access_secret as string
      ) as JwtPayload;

      const { role, userId } = decoded;

      // checking if the user exists
      const user = await UserModel.findById(userId);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
      }

      // checking if the user is blocked
      const isBlocked = user?.isBlocked;

      if (isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      req.user = decoded as DecodedJWTPayload;
      next();
    }
  );
};

export default auth;
