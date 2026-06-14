import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http'; // পিনো এইচটিটিপি লগার ইম্পোর্ট
import { setupSwagger } from './config/swagger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import logger from './utils/logger.js';

const app: Application = express();

// ১. পিনো এইচটিটিপি লগার মিডলওয়্যার (সব ট্র্যাকিংয়ের জন্য সবার ওপরে থাকবে)
app.use(
  pinoHttp({
    logger,
    // কেউ সাইটে ঢুকলেই যে যে ইনফরমেশন লগে দেখাবে
    customProps: (req) => {
      return {
        visitorIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
        visitorPort: req.socket.remotePort || 'unknown',
        deviceProfile: req.headers['user-agent'] || 'unknown',
        httpMethod: req.method,
        requestedUrl: req.originalUrl || req.url,
      };
    },
    // লগ মেসেজটিকে সুন্দর ও প্রফেশনাল করার জন্য
    customSuccessMessage: (req, res, time) => {
      return `🚀 [HIT DETECTED] ${req.method} ${req.originalUrl} - Processed in ${time}ms`;
    },
    customErrorMessage: (req, res, err) => {
      return `❌ [HIT ERROR] ${req.method} ${req.originalUrl} - Error: ${err.message}`;
    },
  })
);

// ২. সিকিউরিটি এবং বডি পার্সার মিডলওয়্যারসমূহ
app.use(helmet());
app.use(cors());
app.use(express.json());

// ৩. Swagger Docs সেটআপ
setupSwagger(app);

// ৪. বেস রুট (টেস্ট করার জন্য)
app.get('/', (req: Request, res: Response) => {
  res.json({ message: "RGPI Institute Modular Backend is Running!" });
});

// ৫. গ্লোবাল এরর হ্যান্ডলার মিডলওয়্যার (সব রাউটের নিচে থাকবে)
app.use(errorHandler);

export default app;