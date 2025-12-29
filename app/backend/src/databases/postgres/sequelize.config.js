const DATABASE = process.env.POSTGRES_DB || '';
const USER = process.env.POSTGRES_USER || '';
const PASSWORD = process.env.POSTGRES_PASSWORD || '';
const HOST = process.env.POSTGRES_HOST || 'localhost';
const PORT = parseInt(process.env.POSTGRES_PORT || '5432');

const BASE_DATABASE_CONFIG = {
  dialect: 'postgres',
  database: DATABASE,
  username: USER,
  password: PASSWORD,
  host: HOST,
  port: PORT,
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
