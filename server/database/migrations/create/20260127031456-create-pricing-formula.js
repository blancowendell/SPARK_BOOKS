'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pricing_formula', {
      pf_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pf_code: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      pf_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      pf_pricing_type: {
        type: Sequelize.ENUM('PERCENT', 'AMOUNT'),
        allowNull: false
      },
      pf_operation: {
        type: Sequelize.ENUM('INCREASE', 'DECREASE'),
        allowNull: false
      },
      pf_value: {
        type: Sequelize.DECIMAL(10,5),
        allowNull: false,
      },
      pf_rounding_rule: {
        type: Sequelize.ENUM(
          'NONE',
          'ROUND_UP',
          'ROUND_DOWN',
          'ROUND_NEAREST'
        ),
        allowNull: false,
      },
      pf_rounding_precision: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      pf_status: {
        type: Sequelize.ENUM('ACTIVE','INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },
      pf_created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      pf_created_by: {
        type: Sequelize.STRING(50),
        allowNull: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('pricing_formula');
  }
};
