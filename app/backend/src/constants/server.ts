export const SERVER_HOST = process.env.EXPRESS_HOST || 'localhost';

export const SERVER_PORT = process.env.EXPRESS_PORT || 3001;

export const SERVER_URL = `http://${SERVER_HOST}:${SERVER_PORT}/`;
