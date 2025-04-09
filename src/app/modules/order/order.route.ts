import { Router } from 'express';
import { OrderController } from './order.controller';

const router = Router();

router.post('/register', OrderController.create);

router.get('/', OrderController.findAll);

router.get('/:id', OrderController.findOne);

router.patch('/:id', OrderController.update);

router.delete('/:id', OrderController.remove);

export const OrderRoutes = router;
