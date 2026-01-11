'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_users', {
      mu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      mu_employeeid: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: 'master_employee',
          key: 'me_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      mu_access_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_access',
          key: 'ma_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      mu_username: {
        type: Sequelize.TEXT,
      },
      mu_password: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      mu_status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'ACTIVE',
      },
      mu_is_update_password: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      mu_create_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      mu_create_by: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_users');
  },
};
