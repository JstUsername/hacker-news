import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '~/constants';
import { COOKIE_NAME } from '~/entities/auth/auth.const';
import { AuthService } from '~/entities/auth/auth.service';
import { TOKEN_TYPES } from '~/entities/tokens';

const authService = new AuthService();

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { [COOKIE_NAME[TOKEN_TYPES.Access]]: accessToken } = req.cookies;
    if (!accessToken) return next(new UnauthorizedError());
    authService.validateAccessToken(accessToken);
    next();
  } catch {
    return next(new UnauthorizedError());
  }
};
