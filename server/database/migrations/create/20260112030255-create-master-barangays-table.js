'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_barangays', {
      mb_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      mb_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
        comment: 'PSGC barangay code',
      },

      mb_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      mb_city_municipality_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_cities_municipalities',
          key: 'mcm_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      mb_create_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      mb_update_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('master_barangays');
  },
};
