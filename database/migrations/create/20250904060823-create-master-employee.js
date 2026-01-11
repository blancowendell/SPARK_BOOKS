'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_employee', {
      me_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      me_first_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      me_last_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      me_email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_employee');
  },
};
