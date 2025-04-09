/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TUserRole = 'admin' | 'customer' | 'provider';
export interface TUser {
  readonly _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: TUserRole;
  isBlocked: boolean;
  passwordChangedAt: Date;
  profileImage?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
}

export interface TUserModel extends Model<TUser> {
  isUserExistsByEmail: (email: string) => Promise<TUser | null>;
  isPasswordMatched: (
    password: string,
    encryptedPassword: string,
  ) => Promise<boolean>;

  isJWTIssuedBeforePasswordChanged: (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ) => boolean;
}
