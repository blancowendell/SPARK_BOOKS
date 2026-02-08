"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("maintenance_sequence", [
      {
        ms_id: 1,
        ms_employee_level: "Customer",
        ms_prefix: "CUST",
        ms_separator: "-",
        ms_start_number: 1,
        ms_padding_length: 4,
        ms_include_year: true,
        ms_year_format: "YYYY",
        ms_include_month: true,
        ms_include_day: false,
        ms_create_at: "2026-02-08 00:55:47",
      },
      {
        ms_id: 2,
        ms_employee_level: "Sales Rep Sequence",
        ms_prefix: "SR",
        ms_separator: "-",
        ms_start_number: 1,
        ms_padding_length: 4,
        ms_include_year: false,
        ms_year_format: null,
        ms_include_month: false,
        ms_include_day: false,
        ms_create_at: "2026-02-08 00:56:00",
      },
      {
        ms_id: 3,
        ms_employee_level: "Sales Order",
        ms_prefix: "SO",
        ms_separator: "-",
        ms_start_number: 1,
        ms_padding_length: 4,
        ms_include_year: true,
        ms_year_format: "YYYY",
        ms_include_month: true,
        ms_include_day: true,
        ms_create_at: "2026-02-08 00:56:33",
      },
      {
        ms_id: 4,
        ms_employee_level: "Vendor",
        ms_prefix: "VEND",
        ms_separator: "-",
        ms_start_number: 1,
        ms_padding_length: 4,
        ms_include_year: true,
        ms_year_format: "YYYY",
        ms_include_month: false,
        ms_include_day: false,
        ms_create_at: "2026-02-08 00:57:33",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("maintenance_sequence", {
      ms_id: [1, 2, 3, 4],
    });
  },
};
