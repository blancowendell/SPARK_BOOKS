'use strict';

const regions = require('./data/regions.json');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'master_regions',
      regions.map(r => ({
        mr_code: r.code,
        mr_name: r.name,
        mr_create_date: new Date(),
        mr_update_date: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('master_regions', null, {});
  },
};
