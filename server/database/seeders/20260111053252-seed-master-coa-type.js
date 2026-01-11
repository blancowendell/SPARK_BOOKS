'use strict';

module.exports = {
  up: async (queryInterface) => {
    const now = new Date();

    await queryInterface.bulkInsert('master_coa_type', [
      {
        mct_account_name: 'Assets',
        mct_account_type: 'Asset Accounts',
        mct_segment_start: '1000-1999',
        mct_create_date: now,
        mct_create_by: 'SYSTEM',
        mct_update_date: now,
        mct_status: 'ACTIVE'
      },
      {
        mct_account_name: 'Liabilities',
        mct_account_type: 'Liability Accounts',
        mct_segment_start: '2000-2999',
        mct_create_date: now,
        mct_create_by: 'SYSTEM',
        mct_update_date: now,
        mct_status: 'ACTIVE'
      },
      {
        mct_account_name: 'Equity',
        mct_account_type: 'Equity Accounts',
        mct_segment_start: '3000-3999',
        mct_create_date: now,
        mct_create_by: 'SYSTEM',
        mct_update_date: now,
        mct_status: 'ACTIVE'
      },
      {
        mct_account_name: 'Revenue',
        mct_account_type: 'Revenue Accounts',
        mct_segment_start: '4000-4999',
        mct_create_date: now,
        mct_create_by: 'SYSTEM',
        mct_update_date: now,
        mct_status: 'ACTIVE'
      },
      {
        mct_account_name: 'Cost of Goods Sold',
        mct_account_type: 'COGS Accounts',
        mct_segment_start: '5000-5999',
        mct_create_date: now,
        mct_create_by: 'SYSTEM',
        mct_update_date: now,
        mct_status: 'ACTIVE'
      },
      {
        mct_account_name: 'Expenses',
        mct_account_type: 'Expense Accounts',
        mct_segment_start: '6000-6999',
        mct_create_date: now,
        mct_create_by: 'SYSTEM',
        mct_update_date: now,
        mct_status: 'ACTIVE'
      },
      {
        mct_account_name: 'Other Accounts',
        mct_account_type: 'Other Accounts',
        mct_segment_start: '7000-7999',
        mct_create_date: now,
        mct_create_by: 'SYSTEM',
        mct_update_date: now,
        mct_status: 'ACTIVE'
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('master_coa_type', null, {});
  }
};
