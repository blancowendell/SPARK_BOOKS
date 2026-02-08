"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales_invoice", {
      si_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      si_invoice_no: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      si_sales_order_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "sales_orders",
          key: "so_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      si_customer_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references: {
          model: "master_customer_general",
          key: "mcg_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      si_sales_rep_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: "master_employee",
          key: "me_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      si_bill_to_address: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      si_bill_to_name: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      si_ship_to_address: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      si_ship_to_name: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      si_invoice_date: {
        type: Sequelize.DATE,
      },
      si_due_date: {
        type: Sequelize.DATE,
      },
      si_shipping_date: {
        type: Sequelize.DATE,
      },
      si_sales_tax: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: true,
      },
      si_freight: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: true,
      },
      si_invoice_total: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: true,
      },
      si_net_due: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false,
      },
      si_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      si_create_by: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      si_status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("sales_invoice");
  },
};
