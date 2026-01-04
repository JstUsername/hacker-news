import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '~/constants';
import { COOKIE_NAME } from '~/entities/auth/auth.const';
import { AuthService } from '~/entities/auth/auth.service';
import { TOKEN_TYPES } from '~/entities/tokens';

const authService = new AuthService();

export class MeController {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { [COOKIE_NAME[TOKEN_TYPES.Access]]: accessToken } = req.cookies;
      const accessTokenPayload = authService.validateAccessToken(accessToken);
      res.status(STATUS_CODES.Success).json(accessTokenPayload);
    } catch (err) {
      next(err);
    }
  }
}
