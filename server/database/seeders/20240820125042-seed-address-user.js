'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adjust base path if needed
    const basePath = path.resolve(__dirname, '../sql/insert/');

    await runSqlSeeder(queryInterface, path.join(basePath, 'philippine_regions.sql'));
    await runSqlSeeder(queryInterface, path.join(basePath, 'philippine_barangays.sql'));
    await runSqlSeeder(queryInterface, path.join(basePath, 'philippine_cities.sql'));
    await runSqlSeeder(queryInterface, path.join(basePath, 'philippine_provinces.sql'));
  },

  async down(queryInterface, Sequelize) {
    // Optional rollback logic
    await queryInterface.bulkDelete('philippine_barangays', null, {});
    await queryInterface.bulkDelete('philippine_cities', null, {});
    await queryInterface.bulkDelete('philippine_provinces', null, {});
    await queryInterface.bulkDelete('philippine_regions', null, {});
  },
};

/**
 * Execute raw SQL file
 */
async function runSqlSeeder(queryInterface, sqlFilePath) {
  const sql = fs.readFileSync(sqlFilePath, 'utf8');

  const statements = sql
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length);

  for (const statement of statements) {
    await queryInterface.sequelize.query(statement);
  }
}
