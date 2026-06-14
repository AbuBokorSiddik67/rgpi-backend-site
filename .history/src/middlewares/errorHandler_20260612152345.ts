import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message || 'Internal Server Error');
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong on the server!',
  });
};