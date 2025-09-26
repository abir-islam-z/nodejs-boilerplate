import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { OrderService } from './order.service';

const create = catchAsync(async (req, res) => {
  const result = await OrderService.create(req.body);
  sendResponse(res, {
    success: true,
    message: 'Order created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const findAll = catchAsync(async (_req, res) => {
  const result = await OrderService.findAll();
  sendResponse(res, {
    success: true,
    message: 'Orders retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const findOne = catchAsync(async (req, res) => {
  const result = await OrderService.findOne(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Order retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await OrderService.update(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    message: 'Order updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await OrderService.remove(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Order deleted successfully',
    statusCode: httpStatus.NO_CONTENT,
    data: result,
  });
});

export const OrderController = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
