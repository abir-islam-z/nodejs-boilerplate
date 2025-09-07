import catchAsync from '@app/utils/catchAsync';
import { sendResponse } from '@app/utils/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './user.service';

const create = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'User created successfully',
    statusCode: httpStatus.CREATED,
    data: user,
  });
});

const findAll = catchAsync(async (_req, res) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    success: true,
    message: 'Users retrieved successfully',
    statusCode: httpStatus.OK,
    data: users,
  });
});

const findOne = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});

const update = catchAsync(async (req, res) => {
  const user = await UserService.updateUser(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    message: 'User updated successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});

const remove = catchAsync(async (req, res) => {
  await UserService.deleteUser(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'User deleted successfully',
    statusCode: httpStatus.NO_CONTENT,
    data: null,
  });
});

export const UserController = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
