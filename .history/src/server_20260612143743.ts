import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// মডার্ন সিকিউরিটি ও রিকোয়েস্ট পার্সিং মিডলওয়্যার
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger Documentation সেটআপ
setupSwagger(app);

/**
 * @openapi
 * /:
 * get:
 * description: Welcome to the application!
 * responses:
 * 200:
 * description: Returns a success message.
 * */
app.get('/', (req: Request, res: Response) => {
  logger.info('Root route hit successfully'); // Pino দিয়ে লগ করা
  res.json({ message: "RGPI Institute TypeScript Backend Server is Running!" });
});

app.listen(PORT, () => {
  logger.info(`⚡ [server]: Server is running at http://localhost:${PORT}`);
  logger.info(`📄 [swagger]: API Docs available at http://localhost:${PORT}/api-docs`);
});