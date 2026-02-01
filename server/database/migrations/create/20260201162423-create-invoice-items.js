"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("invoice_items", {
      ii_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ii_invoice_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sales_invoice",
          key: "si_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      ii_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "master_inventory",
          key: "mi_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      ii_quantity: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false,
      },
      ii_oum: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      ii_item_description: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      ii_unit_price: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: false,
      },
      ii_amount: {
        type: Sequelize.DECIMAL(10, 5),
        allowNull: true,
      },
      ii_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ii_status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("invoice_items");
  },
};
