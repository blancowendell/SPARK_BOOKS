"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales_orders_items", {
      soi_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      soi_sales_order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sales_orders",
          key: "so_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      soi_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "master_inventory",
          key: "mi_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      soi_quantity: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false,
      },
      soi_oum: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      soi_item_description: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      soi_unit_price: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false,
      },
      soi_amount: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: true,
      },
      soi_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      soi_status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("sales_orders_items");
  },
};
