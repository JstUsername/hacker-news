import { QueryInterface, Transaction } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
      // TODO: Add migration code here
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
      // TODO: Revert migration code here
    });
  },
};
