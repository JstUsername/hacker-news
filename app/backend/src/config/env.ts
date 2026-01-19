import { cleanEnv, num, port, str, url } from 'envalid';

export const env = cleanEnv(process.env, {
  EXPRESS_PORT: port({ desc: 'Express server port' }),
  EXPRESS_HOST: str({ desc: 'Express server host' }),
  FRONTEND_URL: url({ desc: 'Frontend application URL' }),
  NEWS_COUNT: num({ desc: 'Number of news items to seed' }),
  MAX_COMMENT_PER_NEWS: num({ desc: 'Maximum comments per news item' }),
  MAX_COMMENT_REPLIES: num({ desc: 'Maximum comment replies depth' }),
  MAX_COMMENT_LEVEL: num({ desc: 'Maximum comment nesting level' }),
  JWT_ACCESS_SECRET: str({ desc: 'Secret for signing access tokens' }),
  JWT_REFRESH_SECRET: str({ desc: 'Secret for signing refresh tokens' }),
  JWT_ACCESS_TOKEN_EXPIRES_IN: str({ desc: 'Access token expiration time' }),
  JWT_REFRESH_TOKEN_EXPIRES_IN: str({ desc: 'Refresh token expiration time' }),
  POSTGRES_USER: str({ desc: 'PostgreSQL user' }),
  POSTGRES_PASSWORD: str({ desc: 'PostgreSQL password' }),
  POSTGRES_DB: str({ desc: 'PostgreSQL database name' }),
  POSTGRES_HOST: str({ desc: 'PostgreSQL host' }),
  POSTGRES_PORT: port({ desc: 'PostgreSQL port' }),
});
