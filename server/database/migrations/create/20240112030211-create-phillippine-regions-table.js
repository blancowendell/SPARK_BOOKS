'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('philippine_regions', {
      pr_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      pr_psgc_code: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      pr_region_number: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      pr_region_description: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      pr_region_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },

      pr_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      pr_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('philippine_regions');
  },
};
