import { Router } from 'express';
import auth from '#app/middlewares/auth';
import { AdminController } from './admin.controller.ts';

const router = Router();

router.patch('/users/:userId/block', auth('admin'), AdminController.blockUser);
export const AdminRoutes = router;
