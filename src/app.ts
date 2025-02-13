import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['*'] }));

// routes
app.use('/api', router);

// Test
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Global Error Handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
