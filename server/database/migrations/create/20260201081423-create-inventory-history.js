'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventory_history', {
      ih_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      ih_inventory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_inventory',
          key: 'mi_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      ih_quantity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'inventory_quantity',
          key: 'iq_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      ih_qty: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false
      },
      ih_cost: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false
      },
      ih_operation: {
        type: Sequelize.ENUM('IN','OUT'),
        allowNull: false
      },
      ih_method: {
        type: Sequelize.ENUM('INVOICE','CREDIT','DEBIT','CASH','CHECK','PURCHASE','ADJUSTMENTS'),
        allowNull: false
      },
      ih_created_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      ih_created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ih_status: {
        type: Sequelize.ENUM('ACTIVE','INACTIVE'),
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('inventory_history');
  }
};
