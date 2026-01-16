import { TOKEN_TYPES } from '~/entities/tokens';

export const COOKIE_NAME = {
  [TOKEN_TYPES.Access]: 'access',
  [TOKEN_TYPES.Refresh]: 'refresh',
};

export const COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax' as const,
};
