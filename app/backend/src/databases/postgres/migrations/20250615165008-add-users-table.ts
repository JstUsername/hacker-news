import { DataTypes, QueryInterface, Transaction } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: queryInterface.sequelize.fn('NOW'),
          },
          updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: queryInterface.sequelize.fn('NOW'),
          },
          deleted_at: {
            type: DataTypes.DATE,
          },
        },
        { transaction },
      );
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
      await queryInterface.dropTable('users', { transaction });
    });
  },
};
