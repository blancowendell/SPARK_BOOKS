'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('master_vendor_type', {
      mvt_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      mvt_type_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mvt_description: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      mvt_create_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mvt_create_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      mvt_update_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      mvt_status: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('master_vendor_type');
  }
};
