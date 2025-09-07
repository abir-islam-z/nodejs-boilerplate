import { mailService } from '@app/services/mail.service';
import catchAsync from '@app/utils/catchAsync';
import { sendResponse } from '@app/utils/sendResponse';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const testMailConnection = catchAsync(async (_req: Request, res: Response) => {
  const isConnected = await mailService.testConnection();

  sendResponse(res, {
    success: isConnected,
    message: isConnected
      ? 'Mail service is working'
      : 'Mail service connection failed',
    statusCode: isConnected ? httpStatus.OK : httpStatus.SERVICE_UNAVAILABLE,
  });
});

const sendTestEmail = catchAsync(async (req: Request, res: Response) => {
  const { to, subject, message } = req.body;

  const success = await mailService.sendMail({
    to,
    subject: subject || 'Test Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Test Email</h2>
        <p>${message || 'This is a test email from your application.'}</p>
        <p>If you received this email, your mail service is working correctly!</p>
      </div>
    `,
  });

  sendResponse(res, {
    success,
    message: success
      ? 'Test email sent successfully'
      : 'Failed to send test email',
    statusCode: success ? httpStatus.OK : httpStatus.INTERNAL_SERVER_ERROR,
  });
});

const getSupportedProviders = catchAsync(
  async (_req: Request, res: Response) => {
    const providers = mailService.getSupportedProviders();

    sendResponse(res, {
      success: true,
      message: 'Supported mail providers retrieved',
      statusCode: httpStatus.OK,
      data: { providers },
    });
  },
);

export const MailController = {
  testMailConnection,
  sendTestEmail,
  getSupportedProviders,
};
