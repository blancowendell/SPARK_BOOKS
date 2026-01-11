'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('master_coa', {
      mc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      mc_coa_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_coa_type',
          key: 'mct_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      mc_account_code: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mc_description: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      mc_running_bal: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false
      },
      mc_create_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mc_create_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      mc_update_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      mc_status: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('master_coa');
  }
};
