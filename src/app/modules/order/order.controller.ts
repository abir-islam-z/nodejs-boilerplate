import catchAsync from '../../utils/catchAsync';
import { OrderService } from './order.service';

const create = catchAsync(async (req, res) => {
  const result = await OrderService.create(req.body);
  res.status(201).json({ data: result });
});

const findAll = catchAsync(async (_req, res) => {
  const result = await OrderService.findAll();
  res.status(200).json({ data: result });
});

const findOne = catchAsync(async (req, res) => {
  const result = await OrderService.findOne(req.params.id);
  res.status(200).json({ data: result });
});

const update = catchAsync(async (req, res) => {
  const result = await OrderService.update(req.params.id, req.body);

  res.status(200).json({ data: result });
});

const remove = catchAsync(async (req, res) => {
  const result = await OrderService.remove(req.params.id);

  res.status(204).json({ data: result });
});

export const OrderController = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
