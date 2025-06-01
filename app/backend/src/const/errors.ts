import { STATUS_CODES } from './statusCodes';

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.BadRequest);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.NotFound);
  }
}
