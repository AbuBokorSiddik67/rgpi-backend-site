import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './lib/swagger.js';
import { errorHandler } from './utils/errorHandler.js';
import { httpLogger } from './lib/logger.js';
import { appRouter } from './routes/app.routes.js';
import { checkDbConnection } from './lib/prisma.js';
import { notFound } from './utils/notFound.js';

const app: Application = express();

// 1. Trust proxy for Railway HTTPS setup
app.set('trust proxy', 1);

app.use(httpLogger);

// 2. Helmet with Cross-Origin Policy configured for Cookies
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
  }),
);

// 3. Dynamic CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CORS_ORIGIN,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman or server-to-server)
      if (!origin) return callback(null, true);

      // Check allowed origins or Vercel preview URLs
      const isAllowed =
        allowedOrigins.includes(origin) || origin.endsWith('.vercel.app');

      if (isAllowed) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: '16kb' }));
app.use(compression());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

setupSwagger(app);
app.use('/api/v1', appRouter); // Mount API routes under /api/v1
checkDbConnection();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get server response
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the rgpi management API!' });
});

app.use(notFound);
app.use(errorHandler);

export default app;
