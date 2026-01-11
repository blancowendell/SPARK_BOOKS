'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('master_vendor_general', {
      mvg_id: {
        type: Sequelize.STRING(255),
        primaryKey: true,
        allowNull: false
      },
      mvg_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_vendor_type',
          key: 'mvt_id'
        }
      },
      mvg_coa_account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_coa',
          key: 'mc_id'
        }
      },
      mvg_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mvg_account_number: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      mvg_billing_address: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      mvg_country: Sequelize.TEXT('long'),
      mvg_region: Sequelize.TEXT('long'),
      mvg_city: Sequelize.TEXT('long'),
      mvg_zip_code: Sequelize.TEXT('long'),
      mvg_baranggay_street: Sequelize.TEXT('long'),
      mvg_is_tax: Sequelize.BOOLEAN,
      mvg_telephone: Sequelize.STRING(255),
      mvg_fax: Sequelize.STRING(255),
      mvg_email: {
        type: Sequelize.STRING(255),
        unique: true
      },
      mvg_website: Sequelize.STRING(255)
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('master_vendor_general');
  }
};
