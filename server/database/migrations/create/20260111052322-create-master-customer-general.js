'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('master_customer_general', {
      mcg_id: {
        type: Sequelize.STRING(255),
        primaryKey: true,
        allowNull: false
      },
      mcg_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_customer_type',
          key: 'mct_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      mcg_sales_rep_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: 'master_employee',
          key: 'me_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      mcg_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mcg_is_prospect: {
        type: Sequelize.BOOLEAN
      },
      mcg_account_number: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      mcg_billing_address: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      mcg_country: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      mcg_region: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      mcg_province: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      mcg_city: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      mcg_zip_code: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      mcg_baranggay_street: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      mcg_is_tax: {
        type: Sequelize.BOOLEAN,
      },
      mcg_telephone: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      mcg_fax: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      mcg_email: {
        type: Sequelize.STRING(255),
        unique: true
      },
      mcg_website: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      mcg_create_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mcg_create_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      mcg_update_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      mcg_status: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('master_customer_general');
  }
};
