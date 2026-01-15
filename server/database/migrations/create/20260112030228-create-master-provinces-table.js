'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_provinces', {
      mp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      mp_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
        comment: 'PSGC province code',
      },

      mp_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      mp_region_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'master_regions',
          key: 'mr_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      mp_create_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      mp_update_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('master_provinces');
  },
};
