'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('philippine_cities', {
      pc_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      pc_psgc_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pc_city_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      pc_region_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pc_province_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pc_city_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      pc_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      pc_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('philippine_cities');
  },
};
