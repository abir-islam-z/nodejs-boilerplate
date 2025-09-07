import auth from '@app/middlewares/auth';
import validateRequest from '@app/middlewares/validateRequest';
import { Router } from 'express';
import { z } from 'zod';
import { MailController } from './mail.controller';

const router = Router();

// Test email connection
router.get(
  '/test-connection',
  auth('admin'),
  MailController.testMailConnection,
);

// Get supported providers
router.get('/providers', auth('admin'), MailController.getSupportedProviders);

// Send test email
const sendTestEmailSchema = z.object({
  to: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().optional(),
});

router.post(
  '/send-test',
  auth('admin'),
  validateRequest(sendTestEmailSchema),
  MailController.sendTestEmail,
);

export const MailRoutes = router;
