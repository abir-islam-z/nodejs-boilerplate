import { z } from 'zod';

const createOrderSchema = z.object({});

const updateOrderSchema = z.object({});

export const OrderValidation = {
  createOrderSchema,
  updateOrderSchema,
};
export type TCreateOrder = z.infer<typeof createOrderSchema>;
export type TUpdateOrder = z.infer<typeof updateOrderSchema>;
