import { InputLogin, InputRegister } from './auth.types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  BadRequestError,
  ConflictError,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  NotFoundError,
  SERVER_URL,
  UnauthorizedError,
} from '~/constants';
import { AccessTokenPayload, RefreshTokenPayload, TokensModel, TokensService } from '~/entities/tokens';
import { UsersModel } from '~/entities/users';

const tokensService = new TokensService();

export class AuthService {
  async register({ username, password }: InputRegister) {
    await this.throwIfUserAlreadyExists(username);
    const hashPassword = await bcrypt.hash(password, 10);
    const { id: userId } = await UsersModel.create({ username, password: hashPassword });
    const { sessionId, accessToken, refreshToken, expiresAt } = await tokensService.generateTokens({
      userId,
      username,
    });
    await tokensService.saveToken({ userId, sessionId, refreshToken, expiresAt });
    return { accessToken, refreshToken };
  }

  async login({ username, password }: InputLogin) {
    const user = await UsersModel.findOne({ where: { username } });
    this.throwIfUserNotFound(username, user);
    await this.throwIfPasswordNotEquals(password, user.password);
    const { sessionId, accessToken, refreshToken, expiresAt } = await tokensService.generateTokens({
      userId: user.id,
      username,
    });
    await tokensService.saveToken({ userId: user.id, sessionId, refreshToken, expiresAt });
    return { accessToken, refreshToken };
  }

  async refresh(oldRefreshToken: string | undefined) {
    this.throwIfRefreshTokenIsMissing(oldRefreshToken);
    const { userId, sid: sessionId } = this.validateRefreshToken(oldRefreshToken);
    await this.throwIfRefreshTokenNotFoundInDb(oldRefreshToken);
    const { username } = (await UsersModel.findByPk(userId))!;

    const { accessToken, refreshToken, expiresAt } = await tokensService.generateTokens({
      userId,
      username,
      sessionId,
    });

    await tokensService.saveToken({ userId, sessionId, refreshToken, expiresAt });
    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string | undefined) {
    this.throwIfRefreshTokenIsMissing(refreshToken);
    await TokensModel.destroy({ where: { refreshToken } });
  }

  validateAccessToken(accessToken: string) {
    try {
      return jwt.verify(accessToken, JWT_ACCESS_SECRET, { issuer: SERVER_URL }) as AccessTokenPayload;
    } catch {
      throw new UnauthorizedError();
    }
  }

  private async throwIfUserAlreadyExists(username: string) {
    const user = await UsersModel.findOne({ where: { username } });
    if (user) throw new ConflictError(`User with username: ${username} already exists`);
  }

  private throwIfUserNotFound(username: string, user: UsersModel | null): asserts user is UsersModel {
    if (!user) throw new NotFoundError(`User with username: ${username} not found`);
  }

  private async throwIfPasswordNotEquals(password: string, hash: string) {
    if (!(await bcrypt.compare(password, hash))) {
      throw new BadRequestError({ message: 'Incorrect password' });
    }
  }

  private throwIfRefreshTokenIsMissing(refreshToken: string | undefined): asserts refreshToken is string {
    if (!refreshToken) throw new UnauthorizedError();
  }

  private validateRefreshToken(refreshToken: string) {
    try {
      return jwt.verify(refreshToken, JWT_REFRESH_SECRET, { issuer: SERVER_URL }) as RefreshTokenPayload;
    } catch (err) {
      throw new UnauthorizedError();
    }
  }

  private async throwIfRefreshTokenNotFoundInDb(refreshToken: string) {
    const tokenItem = await TokensModel.findOne({ where: { refreshToken } });
    if (!tokenItem) throw new UnauthorizedError();
  }
}
