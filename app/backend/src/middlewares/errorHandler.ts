import { NextFunction, Request, Response } from 'express';
import { AppError, STATUS_CODES } from '~/constants';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      ...(err.message ? { message: err.message } : {}),
      ...(err.messages ? { messages: err.messages } : {}),
      timestamp: new Date(),
    });

    return;
  }

  res.status(STATUS_CODES.InternalServerError).json({
    status: STATUS_CODES.InternalServerError,
    message: 'An unexpected error occurred. Please try again later',
    timestamp: new Date(),
  });

  console.error('Unexpected error:', err);
};
