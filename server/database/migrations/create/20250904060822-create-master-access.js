'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_access', {
      ma_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ma_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ma_status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'ACTIVE',
      },
      ma_create_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      ma_create_by: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_access');
  },
};
