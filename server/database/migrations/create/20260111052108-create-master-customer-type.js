'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('master_customer_type', {
      mct_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      mct_type_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mct_description: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      mct_create_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mct_create_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('master_customer_type');
  }
};
