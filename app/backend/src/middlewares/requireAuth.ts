import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '~/constants';
// @NOTE: Избегаю dependency cycle, из - за него падает сборка
import { AuthService } from '~/entities/auth/auth.service';

const authService = new AuthService();

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return next(new UnauthorizedError());
    const accessToken = authorization.split(' ')[1];
    if (!accessToken) return next(new UnauthorizedError());
    authService.validateAccessToken(accessToken);
    next();
  } catch {
    return next(new UnauthorizedError());
  }
};
