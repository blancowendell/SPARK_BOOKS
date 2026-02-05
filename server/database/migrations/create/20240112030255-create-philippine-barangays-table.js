'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('philippine_barangays', {
      pb_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      pb_psgc_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pb_barangay_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      pb_region_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pb_province_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pb_city_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pb_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      pb_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('philippine_barangays');
  },
};
