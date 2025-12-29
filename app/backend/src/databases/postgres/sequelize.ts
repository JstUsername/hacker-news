// @ts-ignore: Для sequelize нужен cjs, поэтому config экспортируется через module.exports
import SEQUELIZE_CONFIG from './sequelize.config';
import { Sequelize } from 'sequelize-typescript';
import { ItemsModel } from '~/entities/items';
import { TokensModel } from '~/entities/tokens';
import { UsersModel } from '~/entities/users';

export const sequelize = new Sequelize({
  ...SEQUELIZE_CONFIG.default,
  models: [ItemsModel, UsersModel, TokensModel],
});
