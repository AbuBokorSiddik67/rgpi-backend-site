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

// 2. Helmet with Cross-Origin Resource Sharing allowed
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

// 3. Dynamic CORS Configuration (Supports local & production frontend URLs)
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CORS_ORIGIN, // e.g., "https://your-frontend.vercel.app"
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      // Check allowed origins or match any vercel preview deployment
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      return callback(null, true); // Or callback(new Error("Not allowed by CORS"))
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
