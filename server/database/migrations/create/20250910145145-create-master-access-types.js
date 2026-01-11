'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_access_types', {
      mat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      mat_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      mat_access_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_access',
          key: 'ma_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      mat_permission_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      mat_status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      mat_create_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      mat_create_by: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_access_types');
  },
};
