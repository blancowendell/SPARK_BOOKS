'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventory_quantity', {
      iq_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      iq_inventory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_inventory',
          key: 'mi_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      iq_quantity: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false,
        defaultValue: 0
      },
      iq_running_balance: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: true,
        defaultValue: 0
      },
      iq_created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      iq_status: {
        type: Sequelize.ENUM('ACTIVE','INACTIVE'),
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('inventory_quantity');
  }
};
