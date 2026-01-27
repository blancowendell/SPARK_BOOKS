// 'use strict';

// const cities = require('./data/cities_municipalities.json');

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert(
//       'master_cities_municipalities',
//       cities.map(c => ({
//         mcm_code: c.code,
//         mcm_name: c.name,
//         mcm_is_city: c.is_city,
//         mcm_province_id: Sequelize.literal(`
//           (SELECT mp_id FROM master_provinces WHERE mp_code = '${c.province_code}')
//         `),
//         mcm_create_date: new Date(),
//         mcm_update_date: new Date(),
//       }))
//     );
//   },

//   async down(queryInterface) {
//     await queryInterface.bulkDelete('master_cities_municipalities', null, {});
//   },
// };
