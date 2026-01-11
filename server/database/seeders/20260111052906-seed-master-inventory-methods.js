'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('master_inventory_methods', [
      {
        mim_code: 'FIFO',
        mim_method_name: 'First In, First Out',
        mim_method_description: 'Inventory issued or sold first is the earliest purchased stock.',
        mim_create_date: new Date(),
        mim_update_date: new Date(),
        mim_status: 'ACTIVE'
      },
      {
        mim_code: 'LIFO',
        mim_method_name: 'Last In, First Out',
        mim_method_description: 'Inventory issued or sold first is the most recently purchased stock.',
        mim_create_date: new Date(),
        mim_update_date: new Date(),
        mim_status: 'ACTIVE'
      },
      {
        mim_code: 'WAC',
        mim_method_name: 'Weighted Average Cost',
        mim_method_description: 'Inventory cost is calculated using weighted average cost.',
        mim_create_date: new Date(),
        mim_update_date: new Date(),
        mim_status: 'ACTIVE'
      },
      {
        mim_code: 'STD',
        mim_method_name: 'Standard Costing',
        mim_method_description: 'Inventory is valued using a predefined standard cost.',
        mim_create_date: new Date(),
        mim_update_date: new Date(),
        mim_status: 'ACTIVE'
      },
      {
        mim_code: 'SPEC',
        mim_method_name: 'Specific Identification',
        mim_method_description: 'Each inventory item is tracked with its actual purchase cost.',
        mim_create_date: new Date(),
        mim_update_date: new Date(),
        mim_status: 'ACTIVE'
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('master_inventory_methods', null, {});
  }
};
