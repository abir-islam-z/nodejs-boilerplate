/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { sendResponse } from '../utils/sendResponse';

// eslint-disable-next-line no-unused-vars
const notFound = (_req: Request, res: Response, _next: NextFunction) => {
  sendResponse(res, {
    success: false,
    message: 'Not Found',
    statusCode: httpStatus.NOT_FOUND,
    data: null,
  });
};

export default notFound;
