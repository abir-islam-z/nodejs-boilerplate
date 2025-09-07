import globalErrorHandler from '@app/middlewares/globalErrorHandler';
import notFound from '@app/middlewares/notFound';
import router from '@app/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
const app: Application = express();

// Security middleware
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  }),
);

// parsers
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(morgan('dev'));

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// routes
app.use('/api', router);

// Test
app.get('/test', (_req, res) => {
  const file = path.join(__dirname, './app/templates', 'test.html');
  res.sendFile(file);
});

// Global Error Handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
