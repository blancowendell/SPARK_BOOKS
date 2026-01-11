'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coa_run_bal', {
      crb_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      crb_coa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_coa',
          key: 'mc_id'
        }
      },
      crb_history_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      crb_debits: Sequelize.DECIMAL(10, 5),
      crb_credits: Sequelize.DECIMAL(10, 5),
      crb_total_deb_cred: Sequelize.DECIMAL(10, 5),
      crb_total_running_bal: Sequelize.DECIMAL(10, 5),
      crb_create_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      crb_update_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      crb_status: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('coa_run_bal');
  }
};
