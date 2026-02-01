'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sql = fs.readFileSync(
      path.join(__dirname, '../../sql/triggers/after_insert/after_insert_master_inventory.sql'),
      'utf8'
    );
    await queryInterface.sequelize.query(sql);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS after_insert_master_inventory;
    `);
  }
};
