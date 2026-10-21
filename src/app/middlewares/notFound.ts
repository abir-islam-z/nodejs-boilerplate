/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { sendResponse } from '#app/utils/sendResponse';

const notFound = (_req: Request, res: Response, _next: NextFunction) => {
  sendResponse(res, {
    success: false,
    message: 'Not Found',
    statusCode: httpStatus.NOT_FOUND,
    data: null,
  });
};

export default notFound;
