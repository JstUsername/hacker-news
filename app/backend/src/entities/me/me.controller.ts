import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES, UnauthorizedError } from '~/constants';
import { COOKIE_NAME } from '~/entities/auth/auth.const';
import { AuthService } from '~/entities/auth/auth.service';
import { TOKEN_TYPES } from '~/entities/tokens';

const authService = new AuthService();

export class MeController {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { [COOKIE_NAME[TOKEN_TYPES.Access]]: accessToken, [COOKIE_NAME[TOKEN_TYPES.Refresh]]: refreshToken } =
        req.cookies;

      if (!accessToken) {
        if (!refreshToken) throw new UnauthorizedError();
        const tokens = await authService.refresh(refreshToken);
        authService.setAccessTokenCookie(res, tokens.accessToken);
        authService.setRefreshTokenCookie(res, tokens.refreshToken);
        const accessTokenPayload = authService.validateAccessToken(tokens.accessToken);
        res.status(STATUS_CODES.Success).json(accessTokenPayload);
        return;
      }

      const accessTokenPayload = authService.validateAccessToken(accessToken);
      res.status(STATUS_CODES.Success).json(accessTokenPayload);
    } catch (err) {
      next(err);
    }
  }
}
