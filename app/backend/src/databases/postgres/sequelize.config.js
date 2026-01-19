import { env } from '../../config/env';

const BASE_DATABASE_CONFIG = {
  dialect: 'postgres',
  database: env.POSTGRES_DB,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  host: env.EXPRESS_HOST,
  port: env.POSTGRES_PORT,
  logging: false,
  define: {
    underscored: true,
    paranoid: true,
  },
};

const SEQUELIZE_DATABASE_CONFIG = {
  ...BASE_DATABASE_CONFIG,
  migrationStorageTableName: '_migrations_',
  seederStorageTableName: '_seeders_',
  seederStorage: 'sequelize',
};

module.exports = {
  default: BASE_DATABASE_CONFIG,
  development: SEQUELIZE_DATABASE_CONFIG,
  test: SEQUELIZE_DATABASE_CONFIG,
  production: SEQUELIZE_DATABASE_CONFIG,
};
