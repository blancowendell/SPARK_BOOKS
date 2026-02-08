'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_orders', {
      so_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      so_sales_order_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      so_customer_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        references: {
          model: "master_customer_general",
          key: "mcg_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      so_vendor_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        references: {
          model: "master_vendor_general",
          key: "mvg_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      so_sales_rep_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        references: {
          model: "master_employee",
          key: "me_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      so_bill_to_address: {
        type: Sequelize.TEXT("long"),
        allowNull: true
      },
      so_bill_to_name: {
        type: Sequelize.TEXT("long"),
        allowNull: true
      },
      so_ship_to_address: {
        type: Sequelize.TEXT("long"),
        allowNull: true
      },
      so_ship_to_name: {
        type: Sequelize.TEXT("long"),
        allowNull: true
      },
      so_sales_order_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      so_shipping_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      so_sales_tax: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: true
      },
      so_freight: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: true
      },
      so_total: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: true
      },
      so_net_due: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false
      },
      so_created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      so_create_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      so_process_status: {
        type: Sequelize.ENUM('APPROVED','PENDING','REJECTED','HOLD','CANCELLED'),
        allowNull: false
      },
      so_status: {
        type: Sequelize.ENUM('ACTIVE','INACTIVE'),
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('sales_orders');
  }
};
