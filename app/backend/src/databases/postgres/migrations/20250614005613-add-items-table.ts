import { DataTypes, QueryInterface, Transaction } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
      await queryInterface.createTable(
        'items',
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING,
          },
          points: {
            type: DataTypes.INTEGER,
          },
          user: {
            type: DataTypes.STRING,
          },
          time: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          type: {
            type: DataTypes.ENUM({ values: ['link', 'comment'] }),
            allowNull: false,
          },
          content: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          deleted: {
            type: DataTypes.BOOLEAN,
          },
          dead: {
            type: DataTypes.BOOLEAN,
          },
          parent_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'items',
              key: 'id',
            },
          },
          comments_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          url: {
            type: DataTypes.STRING,
          },
          domain: {
            type: DataTypes.STRING,
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
      await queryInterface.dropTable('items', { transaction });
    });
  },
};
