import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

// এররের জন্য একটি প্রপার ইন্টারফেস তৈরি করা, যাতে status কোড সাপোর্ট করে
interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError, // এখানে any-র বদলে CustomError টাইপ ব্যবহার করা হলো
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction // next ভেরিয়েবলটি নিচে ব্যবহার না করায় ESLint যেন এরর না দেয়
) => {
  logger.error(err.message || 'Internal Server Error');
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong on the server!',
  });
};