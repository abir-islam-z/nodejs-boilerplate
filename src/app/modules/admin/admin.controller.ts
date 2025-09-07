import AppError from '@app/errors/AppError';
import catchAsync from '@app/utils/catchAsync';
import { sendResponse } from '@app/utils/sendResponse';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AdminService } from './admin.service';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const currentUser = req?.user?.userId;
  const { userId } = req.params;

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
