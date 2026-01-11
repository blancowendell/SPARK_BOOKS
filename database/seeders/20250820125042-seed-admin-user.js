"use strict";

const { EncrypterString } = require('../../services/repository/cryptography');
const { STATIC_ROLE } = require('../../services/repository/enum/enums');
let password = 'admin';
let adminEmpId = '000000';
const encryptedPassword = EncrypterString(password);

module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 2: Insert access role
    await queryInterface.bulkInsert("master_access", [
      {
        ma_name: STATIC_ROLE.ADMIN,
        ma_status: "ACTIVE",
        ma_create_date: new Date(),
        ma_create_by: "system",
      },
    ]);

    const [access] = await queryInterface.sequelize.query(
      `SELECT ma_id FROM master_access WHERE ma_name = '${STATIC_ROLE.ADMIN}' LIMIT 1`
    );
    const maId = access[0].ma_id;

    // Step 3: Insert employee
    await queryInterface.bulkInsert("master_employee", [
      {
        me_id: adminEmpId,
        me_first_name: "System",
        me_last_name: STATIC_ROLE.ADMIN,
        me_email: "admin@5lsolutions.com",
      },
    ]);

    const [employee] = await queryInterface.sequelize.query(
      `SELECT me_id FROM master_employee WHERE me_id = '${adminEmpId}' LIMIT 1;`
    );
    const meId = employee[0].me_id;

    // Step 4: Insert admin user
    await queryInterface.bulkInsert("master_users", [
      {
        mu_employeeid: meId,
        mu_access_id: maId,
        mu_username: "admin",
        mu_password: encryptedPassword,
        mu_status: "ACTIVE",
        mu_is_update_password: true,
        mu_create_date: new Date(),
        mu_create_by: "system",
      },
    ]);

    const [user] = await queryInterface.sequelize.query(
      `SELECT mu_id FROM master_users WHERE mu_employeeid = '${meId}' LIMIT 1;`
    );
    const muId = user[0].mu_id;

    // Step 5: Insert maintenance dashboard
    await queryInterface.bulkInsert("maintenance_dashboards", [
      {
        md_user_id: muId,
        md_user_type: STATIC_ROLE.ADMIN,
        md_title: "Dashboard for Admin",
        md_description: "This is the dashboard",
        md_owner: STATIC_ROLE.ADMIN,
        md_created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("master_users", { mu_username: "admin" });
    await queryInterface.bulkDelete("master_employee", { me_id: adminEmpId });
    await queryInterface.bulkDelete("master_access", { ma_name: STATIC_ROLE.ADMIN });
    await queryInterface.bulkDelete("maintenance_dashboards", { md_user_id: adminEmpId });
  },
};
