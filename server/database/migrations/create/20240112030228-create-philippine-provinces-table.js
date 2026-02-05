'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('philippine_provinces', {
      pp_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      pp_psgc_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pp_province_description: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      pp_region_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pp_province_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pp_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      pp_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('philippine_provinces');
  },
};
