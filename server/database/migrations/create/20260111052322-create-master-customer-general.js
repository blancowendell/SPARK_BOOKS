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
      mcg_country: Sequelize.TEXT('long'),
      mcg_region: Sequelize.TEXT('long'),
      mcg_city: Sequelize.TEXT('long'),
      mcg_zip_code: Sequelize.TEXT('long'),
      mcg_baranggay_street: Sequelize.TEXT('long'),
      mcg_is_tax: Sequelize.BOOLEAN,
      mcg_telephone: Sequelize.STRING(255),
      mcg_fax: Sequelize.STRING(255),
      mcg_email: {
        type: Sequelize.STRING(255),
        unique: true
      },
      mcg_website: Sequelize.STRING(255)
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('master_customer_general');
  }
};
