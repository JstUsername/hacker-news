import { TOKEN_TYPES } from './tokens.const';

export interface CreateAccessToken {
  userId: number;
  username: string;
  sessionId?: string;
}

export interface AccessTokenPayload extends CreateAccessToken {
  iss: string;
  typ: TOKEN_TYPES.Access;
  sid: string;
}

export type CreateRefreshToken = Pick<CreateAccessToken, 'userId'>;

export interface RefreshTokenPayload extends CreateRefreshToken {
  iss: string;
  typ: TOKEN_TYPES.Refresh;
  sid: string;
}
