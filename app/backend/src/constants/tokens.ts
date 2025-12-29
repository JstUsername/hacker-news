import ms from 'ms';

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '';

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';

export const JWT_ACCESS_TOKEN_EXPIRES_IN = (process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m') as ms.StringValue;

export const JWT_REFRESH_TOKEN_EXPIRES_IN = (process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '30d') as ms.StringValue;
