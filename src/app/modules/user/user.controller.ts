import httpStatus from 'http-status';
import catchAsync from '#app/utils/catchAsync';
import { routeParam } from '#app/utils/routeParam';
import { sendResponse } from '#app/utils/sendResponse';
import { UserService } from './user.service.ts';

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
  const user = await UserService.getUserById(routeParam(req.params.id));
  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});

const update = catchAsync(async (req, res) => {
  const user = await UserService.updateUser(routeParam(req.params.id), req.body);
  sendResponse(res, {
    success: true,
    message: 'User updated successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});

const remove = catchAsync(async (req, res) => {
  await UserService.deleteUser(routeParam(req.params.id));
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
