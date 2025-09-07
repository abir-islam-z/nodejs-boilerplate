import config from '@app/config';
import { logger } from '@app/utils/logger';
import nodemailer, { Transporter } from 'nodemailer';

export interface MailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  context?: Record<string, any>;
}

export interface MailProvider {
  name: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class MailService {
  private transporter!: Transporter;
  private providers: Record<string, MailProvider> = {
    gmail: {
      name: 'Gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.mail.user || '',
        pass: config.mail.pass || '',
      },
    },
    outlook: {
      name: 'Outlook',
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: config.mail.user || '',
        pass: config.mail.pass || '',
      },
    },
    yahoo: {
      name: 'Yahoo',
      host: 'smtp.mail.yahoo.com',
      port: 587,
      secure: false,
      auth: {
        user: config.mail.user || '',
        pass: config.mail.pass || '',
      },
    },
    sendgrid: {
      name: 'SendGrid',
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: config.mail.pass || '',
      },
    },
    mailgun: {
      name: 'Mailgun',
      host: 'smtp.mailgun.org',
      port: 587,
      secure: false,
      auth: {
        user: config.mail.user || '',
        pass: config.mail.pass || '',
      },
    },
    custom: {
      name: 'Custom SMTP',
      host: config.mail.host || 'localhost',
      port: parseInt(config.mail.port || '587'),
      secure: false,
      auth: {
        user: config.mail.user || '',
        pass: config.mail.pass || '',
      },
    },
  };

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter(): void {
    const provider = config.mail.provider || 'gmail';
    const providerConfig = this.providers[provider] || this.providers.custom;

    // Override with custom config if provided
    if (config.mail.host) {
      providerConfig.host = config.mail.host;
    }
    if (config.mail.port) {
      providerConfig.port = parseInt(config.mail.port);
    }

    this.transporter = nodemailer.createTransport({
      host: providerConfig.host,
      port: providerConfig.port,
      secure: providerConfig.secure,
      auth: providerConfig.auth,
      tls: {
        rejectUnauthorized: false,
      },
    });

    logger.info(`Mail service initialized with ${providerConfig.name}`);
  }

  async sendMail(options: MailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"${config.mail.from_name}" <${config.mail.from_email}>`,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${options.to}`, {
        messageId: result.messageId,
      });
      return true;
    } catch (error) {
      logger.error('Failed to send email', error);
      return false;
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    return this.sendMail({
      to,
      subject: 'Welcome to Our App!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome ${name}!</h2>
          <p>Thank you for joining our app. We're excited to have you on board!</p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <br>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
    });
  }

  async sendPasswordResetEmail(
    to: string,
    resetToken: string,
  ): Promise<boolean> {
    const resetUrl = `${config.frontend_url || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    return this.sendMail({
      to,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You requested a password reset. Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p><strong>This link will expire in 1 hour.</strong></p>
          <p>If you didn't request this password reset, please ignore this email.</p>
        </div>
      `,
    });
  }

  async sendVerificationEmail(
    to: string,
    verificationToken: string,
  ): Promise<boolean> {
    const verificationUrl = `${config.frontend_url || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;

    return this.sendMail({
      to,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Verify Your Email Address</h2>
          <p>Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verify Email</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p><strong>This link will expire in 24 hours.</strong></p>
        </div>
      `,
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      logger.info('Mail service connection test successful');
      return true;
    } catch (error) {
      logger.error('Mail service connection test failed', error);
      return false;
    }
  }

  getSupportedProviders(): string[] {
    return Object.keys(this.providers);
  }
}

export const mailService = new MailService();
