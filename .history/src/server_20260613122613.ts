import app from './app.js';
import dotenv from 'dotenv';
import logger from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
  logger.info(`[swagger]: API Docs available at http://localhost:${PORT}/api-docs`);
});