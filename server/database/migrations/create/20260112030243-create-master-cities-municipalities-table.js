'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_cities_municipalities', {
      mcm_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      mcm_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
        comment: 'PSGC city/municipality code',
      },

      mcm_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      mcm_province_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_provinces',
          key: 'mp_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      mcm_is_city: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'true = city, false = municipality',
      },

      mcm_create_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      mcm_update_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('master_cities_municipalities');
  },
};
