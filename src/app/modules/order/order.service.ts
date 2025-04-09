import { IOrder } from './order.interface';
import { OrderModel } from './order.model';

const create = async (data: IOrder) => {
  return await OrderModel.create(data);
};

const findAll = async () => {
  return await OrderModel.find();
};

const findOne = async (id: string) => {
  return await OrderModel.findById(id);
};

const update = async (id: string, data: Partial<IOrder>) => {
  return await OrderModel.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id: string) => {
  return await OrderModel.findByIdAndDelete(id);
};

export const OrderService = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
