'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dashboard_widget_configs', {
      dwc_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dwc_widget_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'dashboard_widgets',
          key: 'dw_id',
        },
        onDelete: 'CASCADE',
      },
      dwc_card_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dwc_content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      dwc_param: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dwc_api_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dwc_chart_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dwc_table_columns: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      dwc_table_data: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      dwc_custom_styles: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      dwc_refresh_interval: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dwc_card_icon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dwc_created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      dwc_updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('dashboard_widget_configs');
  },
};
