'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('master_inventory', {
      mi_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      mi_item_id: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true
      },
      mi_description: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      mi_description_sales_purchase: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      mi_item_class: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      mi_gl_sales_account: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'master_coa',
          key: 'mc_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      mi_gl_inventory_account: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'master_coa',
          key: 'mc_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      mi_gl_cogs_account: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'master_coa',
          key: 'mc_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      mi_item_price: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: true
      },
      mi_upc_sku: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      mi_item_type: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      mi_item_location: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      mi_stocking_uom: {
        type: Sequelize.ENUM('EA', 'KG', 'LBS', 'MTR', 'FT', 'BOX', 'PACK', 'SET','PC'),
        allowNull: true
      },
      mi_size: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      mi_weight: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      mi_location: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      mi_brand: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      mi_created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      mi_create_by: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      mi_status: {
        type: Sequelize.ENUM('ACTIVE','INACTIVE'),
        allowNull: true
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('master_inventory');
  }
};
