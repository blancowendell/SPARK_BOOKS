'use strict';

const barangays = require('./data/barangays.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    const BATCH_SIZE = 1000;

    for (let i = 0; i < barangays.length; i += BATCH_SIZE) {
      const batch = barangays.slice(i, i + BATCH_SIZE);

      await queryInterface.bulkInsert(
        'master_barangays',
        batch.map(b => ({
          mb_code: b.code,
          mb_name: b.name,
          mb_city_municipality_id: Sequelize.literal(`
            (SELECT mcm_id FROM master_cities_municipalities WHERE mcm_code = '${b.city_code}')
          `),
          mb_create_date: new Date(),
          mb_update_date: new Date(),
        }))
      );
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('master_barangays', null, {});
  },
};
