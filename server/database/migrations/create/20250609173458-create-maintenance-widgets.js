'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('maintenance_widgets', {
      mw_widget_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      mw_dashboard_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'maintenance_dashboards',
          key: 'md_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      mw_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      mw_title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      mw_content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      mw_api_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      mw_param: {
        type: Sequelize.TEXT('long'), 
        allowNull: true,
      },
      mw_x: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      mw_y: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      mw_width: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 300,
      },
      mw_height: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 200,
      },
      mw_headers: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      mw_has_actions: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      mw_chart_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      mw_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('maintenance_widgets');
  }
};
