import { DataTypes, QueryInterface, Transaction } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
      await queryInterface.createTable(
        'tokens',
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          session_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            allowNull: false,
          },
          refresh_token: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          expires_at: {
            type: DataTypes.DATE,
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
      await queryInterface.dropTable('tokens', { transaction });
    });
  },
};
