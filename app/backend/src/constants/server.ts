import { env } from '~/config/env';

export const SERVER_URL = `http://${env.EXPRESS_HOST}:${env.EXPRESS_PORT}/`;
