'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts_payments', {
      ap_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      ap_coa_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "master_coa",
          key: "mc_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      ap_customer_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        references: {
          model: "master_customer_general",
          key: "mcg_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      ap_vendor_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        references: {
          model: "master_vendor_general",
          key: "mvg_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      ap_invoice_ids: {
        type: Sequelize.JSON,
        allowNull: true
      },
      ap_purchase_order_ids: {
        type: Sequelize.JSON,
        allowNull: true
      },
      ap_reference_no: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      ap_reciept_no: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      ap_amount_payment: {
        type: Sequelize.DECIMAL(15, 5),
        allowNull: false
      },
      ap_payment_method: {
        type: Sequelize.ENUM('CASH','CHEQUE','CREDIT CARD','DEBIT CARD','DINERS','ONLINE','OTHER'),
        allowNull: true
      },
      ap_payment_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      ap_created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ap_created_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      ap_status: {
        type: Sequelize.ENUM('ACTIVE','INACTIVE'),
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts_payments');
  }
};
