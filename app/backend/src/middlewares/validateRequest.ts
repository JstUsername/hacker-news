import { RequestHandler } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import { BadRequestError, VALIDATION_SOURCES } from '~/constants';

export const validateRequest = (schema: ZodTypeAny, source: VALIDATION_SOURCES): RequestHandler => {
  return async (req, _res, next) => {
    try {
      await schema.parseAsync(req[source]);
      next();
    } catch (err) {
      if (!(err instanceof ZodError)) return next(err);
      return next(new BadRequestError({ messages: err.errors }));
    }
  };
};
