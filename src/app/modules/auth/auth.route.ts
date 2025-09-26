import { Router } from 'express';
import { z } from 'zod';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.registerUser
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

// Password reset request
const passwordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

router.post(
  '/forgot-password',
  validateRequest(passwordResetSchema),
  AuthController.requestPasswordReset
);

export const AuthRoutes = router;
