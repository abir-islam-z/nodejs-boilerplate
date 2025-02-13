import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(userValidationSchema),
  UserController.create,
);
router.get('/', auth('admin'), UserController.findAll);
router.get('/:userId', auth('admin'), UserController.findOne);
router.patch(
  '/:userId',
  auth('admin'),
  validateRequest(userValidationSchema),
  UserController.update,
);
router.delete('/:userId', auth('admin'), UserController.remove);

export const UserRoutes = router;
