import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSwagger } from './config/swagger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import logger from './utils/logger.js';

const app: Application = express();

// মিডলওয়্যারসমূহ
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger Docs
setupSwagger(app);

// বেস রুট (টেস্ট করার জন্য)
app.get('/', (req: Request, res: Response) => {
  logger.info('Root route accessed');
  res.json({ message: "RGPI Institute Modular Backend is Running!" });
});

// গ্লোবাল এরর হ্যান্ডলার মিডলওয়্যার (সব রাউটের নিচে থাকবে)
app.use(errorHandler);

export default app;