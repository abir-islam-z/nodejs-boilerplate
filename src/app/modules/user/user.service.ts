import type { TRegisterUser } from '#app/modules/auth/auth.interface';
import type { TUser } from './user.interface.ts';
import { UserModel } from './user.model.ts';

const createUser = async (data: TRegisterUser) => {
  return await UserModel.create(data);
};

const getAllUsers = async () => {
  return await UserModel.find();
};

const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

const updateUser = async (id: string, data: TUser) => {
  return await UserModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
