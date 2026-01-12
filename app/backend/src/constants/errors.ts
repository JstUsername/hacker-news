import { STATUS_CODES } from './statusCodes';
import { ZodIssue } from 'zod';

export class AppError extends Error {
  public statusCode: number;
  public messages?: Array<ZodIssue>;

  constructor(params: { message?: string; messages?: Array<ZodIssue>; statusCode: number }) {
    super(params.message);
    this.statusCode = params.statusCode;
    if (params.messages) this.messages = params.messages;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(params: { message?: string; messages?: Array<ZodIssue> }) {
    super({ message: params.message, messages: params.messages, statusCode: STATUS_CODES.BadRequest });
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super({ message, statusCode: STATUS_CODES.NotFound });
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super({ message: 'Unauthorized', statusCode: STATUS_CODES.Unauthorized });
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super({ message, statusCode: STATUS_CODES.Forbidden });
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super({ message, statusCode: STATUS_CODES.Conflict });
  }
}
