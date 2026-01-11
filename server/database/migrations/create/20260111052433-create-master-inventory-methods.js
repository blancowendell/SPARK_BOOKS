'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('master_inventory_methods', {
      mim_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      mim_code: {
        type: Sequelize.ENUM('FIFO', 'LIFO', 'WAC', 'STD', 'SPEC'),
        allowNull: false
      },
      mim_method_name: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      mim_method_description: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      mim_create_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      mim_update_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      mim_status: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('master_inventory_methods');
  }
};
