'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('master_coa_type', {
      mct_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      mct_account_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mct_account_type: {
        type: Sequelize.ENUM(
          'Asset Accounts',
          'Liability Accounts',
          'Equity Accounts',
          'Revenue Accounts',
          'COGS Accounts',
          'Expense Accounts',
          'Other Accounts'
        ),
        allowNull: false
      },
      mct_segment_start: {
        type: Sequelize.ENUM(
          '1000-1999',
          '2000-2999',
          '3000-3999',
          '4000-4999',
          '5000-5999',
          '6000-6999',
          '7000-7999'
        ),
        allowNull: false
      },
      mct_create_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      mct_create_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mct_update_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      mct_status: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('master_coa_type');
  }
};
