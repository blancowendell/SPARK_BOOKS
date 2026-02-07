"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("master_sequence", [
      {
        ms_id: 1,
        ms_name: "Customer",
        ms_prefix: "CUST-",
        ms_separator: "-",
        ms_start: 1,
        ms_length: 4,
        ms_increment: 1,
        ms_last_value: null,
        ms_is_active: 1,
        ms_is_editable: 0,
        ms_created_at: "2026-02-08 00:55:47",
      },
      {
        ms_id: 2,
        ms_name: "Sales Rep Sequence",
        ms_prefix: "SR",
        ms_separator: "-",
        ms_start: 1,
        ms_length: 4,
        ms_increment: 1,
        ms_last_value: null,
        ms_is_active: 1,
        ms_is_editable: 0,
        ms_created_at: "2026-02-08 00:56:00",
      },
      {
        ms_id: 3,
        ms_name: "Sales Order",
        ms_prefix: "SO-",
        ms_separator: "-",
        ms_start: 1,
        ms_length: 4,
        ms_increment: 1,
        ms_last_value: null,
        ms_is_active: 1,
        ms_is_editable: 0,
        ms_created_at: "2026-02-08 00:56:33",
      },
      {
        ms_id: 4,
        ms_name: "Vendor",
        ms_prefix: "VEND-",
        ms_separator: "-",
        ms_start: 1,
        ms_length: 4,
        ms_increment: 1,
        ms_last_value: null,
        ms_is_active: 1,
        ms_is_editable: 1,
        ms_created_at: "2026-02-08 00:57:33",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("master_sequence", {
      ms_id: [1, 2, 3, 4],
    });
  },
};
