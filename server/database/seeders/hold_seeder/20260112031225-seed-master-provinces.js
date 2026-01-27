// 'use strict';

// const provinces = require('./data/provinces.json');

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert(
//       'master_provinces',
//       provinces.map(p => ({
//         mp_code: p.code,
//         mp_name: p.name,
//         mp_region_id: Sequelize.literal(`
//           (SELECT mr_id FROM master_regions WHERE mr_code = '${p.region_code}')
//         `),
//         mp_create_date: new Date(),
//         mp_update_date: new Date(),
//       }))
//     );
//   },

//   async down(queryInterface) {
//     await queryInterface.bulkDelete('master_provinces', null, {});
//   },
// };
