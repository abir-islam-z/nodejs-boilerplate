import { model, Schema } from 'mongoose';
import type { IOrder } from './order.interface.ts';

const orderSchema = new Schema<IOrder>({
  name: String,
});

export const OrderModel = model<IOrder>('order', orderSchema);
