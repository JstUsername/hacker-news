import { Sequelize } from 'sequelize';

const database = process.env.POSTGRES_DB || '';
const user = process.env.POSTGRES_USER || '';
const password = process.env.POSTGRES_PASSWORD || '';
const host = process.env.POSTGRES_HOST || 'localhost';
const port = parseInt(process.env.POSTGRES_PORT || '5432');

export const sequelize = new Sequelize(database, user, password, {
  dialect: 'postgres',
  host,
  port,
});
