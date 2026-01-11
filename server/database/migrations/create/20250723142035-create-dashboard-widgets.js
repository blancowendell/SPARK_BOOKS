'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dashboard_widgets', {
      dw_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dw_dashboard_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'maintenance_dashboards',
          key: 'md_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      dw_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dw_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dw_position_x: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      dw_position_y: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      dw_width: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      dw_height: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      dw_created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      dw_updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('dashboard_widgets');
  },
};
