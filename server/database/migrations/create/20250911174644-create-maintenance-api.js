'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('maintenance_api', {
      ma_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ma_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ma_api_name: { 
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ma_api_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ma_status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'ACTIVE',
      },
      ma_create_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      ma_update_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('maintenance_api');
  },
};
