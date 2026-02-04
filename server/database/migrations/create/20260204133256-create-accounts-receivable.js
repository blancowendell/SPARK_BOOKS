'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts_receivable', {
      ar_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      ar_invoice_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "sales_invoice",
          key: "si_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      ar_purchase_order_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "purchase_orders",
          key: "po_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      ar_customer_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        references: {
          model: "master_customer_general",
          key: "mcg_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      ar_vendor_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        references: {
          model: "master_vendor_general",
          key: "mvg_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      ar_reference_no: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      ar_reciept_no: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      ar_amount_due: {
        type: Sequelize.DECIMAL(15, 5),
        allowNull: false
      },
      ar_amount_paid: {
        type: Sequelize.DECIMAL(15, 5),
        allowNull: false
      },
      ar_payment_method: {
        type: Sequelize.ENUM('CASH','CHEQUE','CREDIT CARD','DEBIT CARD','DINERS','ONLINE','OTHER'),
        allowNull: true
      },
      ar_payment_status: {
        type: Sequelize.ENUM('PAID','UNPAID', 'PARTIAL'),
        allowNull: false,
        defaultValue: 'UNPAID'
      },
      ar_payment_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      ar_created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ar_create_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      ar_status: {
        type: Sequelize.ENUM('ACTIVE','INACTIVE'),
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts_receivable');
  }
};
