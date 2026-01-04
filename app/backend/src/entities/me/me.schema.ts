import { z } from 'zod';
import { COOKIE_NAME } from '~/entities/auth/auth.const';
import { TOKEN_TYPES } from '~/entities/tokens';

export const InputMeSchema = z.object({
  [COOKIE_NAME[TOKEN_TYPES.Access]]: z.string().jwt(),
});
