import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

type HttpError = Error & { status?: number; message?: string } | { status?: number; message?: string } | unknown;

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = (err as any)?.status || 500;
  const message = err instanceof Error ? err.message : (typeof err === 'string' ? err : (err && (err as any).message) || 'Something went wrong on the server!');

  logger.error(message || 'Internal Server Error');

  res.status(status).json({
    success: false,
    message,
  });
};