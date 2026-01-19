import { TOKEN_TYPES } from './tokens.const';
import { TokensModel, TokensModelCreate } from './tokens.model';
import { AccessTokenPayload, CreateAccessToken, RefreshTokenPayload } from './tokens.types';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StringValue } from 'ms';
import { Op } from 'sequelize';
import { v4 as uuidV4 } from 'uuid';
import { env } from '~/config/env';
import { SERVER_URL } from '~/constants';

export class TokensService {
  async generateTokens({ userId, username, sessionId }: CreateAccessToken) {
    const sid = sessionId || uuidV4();

    const payloadAccessToken: AccessTokenPayload = {
      userId,
      username,
      typ: TOKEN_TYPES.Access,
      iss: SERVER_URL,
      sid,
    };

    const payloadRefreshToken: RefreshTokenPayload = {
      userId,
      typ: TOKEN_TYPES.Refresh,
      iss: SERVER_URL,
      sid,
    };

    const accessToken = jwt.sign(payloadAccessToken, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN as unknown as StringValue,
    });

    const refreshToken = jwt.sign(payloadRefreshToken, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN as unknown as StringValue,
    });

    const expiresAt = new Date((jwt.decode(refreshToken) as JwtPayload).exp! * 1000);
    return { sessionId: sid, accessToken, refreshToken, expiresAt };
  }

  async saveToken({ userId, sessionId, refreshToken, expiresAt }: TokensModelCreate) {
    const tokenItem = await TokensModel.findOne({ where: { sessionId } });
    if (!tokenItem) return await TokensModel.create({ userId, refreshToken, sessionId, expiresAt });
    return TokensModel.update({ refreshToken, expiresAt }, { where: { sessionId } });
  }

  async deleteAllExpiredTokens() {
    await TokensModel.destroy({ where: { expiresAt: { [Op.lte]: new Date() } } });
  }
}
