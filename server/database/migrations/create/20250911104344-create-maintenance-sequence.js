'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('maintenance_sequence', {
      ms_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ms_employee_level: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      ms_prefix: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      ms_separator: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      ms_start_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ms_padding_length: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ms_include_year: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      ms_year_format: {
        type: Sequelize.STRING(4),
        allowNull: true
      },
      ms_include_month: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      ms_include_day: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      ms_create_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('maintenance_sequence');
  }
};
 