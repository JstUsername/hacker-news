import { COOKIE_NAME } from './auth.const';
import { AuthService } from './auth.service';
import { InputLogin, InputRegister } from './auth.types';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '~/constants';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password }: InputRegister = req.body;
      const tokens = await authService.register({ username, password });
      authService.setAccessTokenCookie(res, tokens.accessToken);
      authService.setRefreshTokenCookie(res, tokens.refreshToken);
      res.status(STATUS_CODES.Success).json(tokens);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password }: InputLogin = req.body;
      const tokens = await authService.login({ username, password });
      authService.setAccessTokenCookie(res, tokens.accessToken);
      authService.setRefreshTokenCookie(res, tokens.refreshToken);
      res.status(STATUS_CODES.Success).json(tokens);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { [COOKIE_NAME.Refresh]: refreshToken } = req.cookies;
      const tokens = await authService.refresh(refreshToken);
      authService.setAccessTokenCookie(res, tokens.accessToken);
      authService.setRefreshTokenCookie(res, tokens.refreshToken);
      res.status(STATUS_CODES.Success).json(tokens);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { [COOKIE_NAME.Refresh]: refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie(COOKIE_NAME.Access);
      res.clearCookie(COOKIE_NAME.Refresh);
      res.status(STATUS_CODES.NoContent).json();
    } catch (err) {
      next(err);
    }
  }
}
