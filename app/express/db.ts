import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequalize = new Sequelize(
  process.env.POSTGRES_DB || '',
  process.env.POSTGRES_USER || '',
  process.env.POSTGRES_PASSWORD || '',
  {
    dialect: 'postgres',
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT || '5432'),
  },
);
