"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("master_regions", {
      mr_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      mr_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
        comment: "PSGC region code",
      },

      mr_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      mr_create_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      mr_update_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("master_regions");
  },
};
