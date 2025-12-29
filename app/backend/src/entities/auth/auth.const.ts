import { TOKEN_TYPES } from '~/entities/tokens';

export const COOKIE_NAME = {
  [TOKEN_TYPES.Access]: 'access',
  [TOKEN_TYPES.Refresh]: 'refresh',
};
