import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>({
  name: String,
});

export const OrderModel = model<IOrder>('order', orderSchema);
