import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import AppError from '#app/errors/AppError';
import catchAsync from '#app/utils/catchAsync';
import { routeParam } from '#app/utils/routeParam';
import { sendResponse } from '#app/utils/sendResponse';
import { AdminService } from './admin.service.ts';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const currentUser = req?.user?.userId;
  const userId = routeParam(req.params.userId);

  if (currentUser === userId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You cannot block yourself.');
  }

  await AdminService.blockUserFromDB(userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});

export const AdminController = {
  blockUser,
};
