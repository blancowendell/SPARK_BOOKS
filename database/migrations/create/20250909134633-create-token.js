'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('token', {
      t_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      t_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      t_token: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      t_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      t_reference_table_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      t_table_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      t_email: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
      },
      t_create_date: {
        type: Sequelize.DATE,
        allowNull: true,     
      },
      t_expired_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      t_status: {
        type: Sequelize.ENUM('AVAILABLE', 'UNAVAILABLE'),
        defaultValue: 'AVAILABLE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('token');
  },
};
