const Inventory = {
  inventory_pricing: {
  tablename: "inventory_pricing",
  prefix: "ip",
  prefix_: "ip_",
  insertColumns: [
      "created_at",
      "status"
    ],
  selectColumns: [
      "ip_id",
      "ip_created_at",
      "ip_status"
    ],
  selectOptionColumns: {
    id: "ip_id",
    created_at: "ip_created_at",
    status: "ip_status"
  },
  updateOptionColumns: {
    id: "id",
    created_at: "created_at",
    status: "status"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(ip_created_at, 'T', ' '), 'Z', '') AS ip_created_at"
  },
  selectMiscColumns: {

  }
},
  inventory_quantity: {
  tablename: "inventory_quantity",
  prefix: "iq",
  prefix_: "iq_",
  insertColumns: [
      "inventory_id",
      "created_at",
      "status"
    ],
  selectColumns: [
      "iq_id",
      "iq_inventory_id",
      "iq_quantity",
      "iq_running_balance",
      "iq_created_at",
      "iq_status"
    ],
  selectOptionColumns: {
    id: "iq_id",
    inventory_id: "iq_inventory_id",
    quantity: "iq_quantity",
    running_balance: "iq_running_balance",
    created_at: "iq_created_at",
    status: "iq_status"
  },
  updateOptionColumns: {
    id: "id",
    inventory_id: "inventory_id",
    quantity: "quantity",
    running_balance: "running_balance",
    created_at: "created_at",
    status: "status"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(iq_created_at, 'T', ' '), 'Z', '') AS iq_created_at"
  },
  selectMiscColumns: {

  }
},
  inventory_history: {
  tablename: "inventory_history",
  prefix: "ih",
  prefix_: "ih_",
  insertColumns: [
      "inventory_id",
      "quantity_id",
      "qty",
      "cost",
      "operation",
      "method",
      "created_by",
      "created_at",
      "status"
    ],
  selectColumns: [
      "ih_id",
      "ih_inventory_id",
      "ih_quantity_id",
      "ih_qty",
      "ih_cost",
      "ih_operation",
      "ih_method",
      "ih_created_by",
      "ih_created_at",
      "ih_status"
    ],
  selectOptionColumns: {
    id: "ih_id",
    inventory_id: "ih_inventory_id",
    quantity_id: "ih_quantity_id",
    qty: "ih_qty",
    cost: "ih_cost",
    operation: "ih_operation",
    method: "ih_method",
    created_by: "ih_created_by",
    created_at: "ih_created_at",
    status: "ih_status"
  },
  updateOptionColumns: {
    id: "id",
    inventory_id: "inventory_id",
    quantity_id: "quantity_id",
    qty: "qty",
    cost: "cost",
    operation: "operation",
    method: "method",
    created_by: "created_by",
    created_at: "created_at",
    status: "status"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(ih_created_at, 'T', ' '), 'Z', '') AS ih_created_at"
  },
  selectMiscColumns: {

  }
},
};

exports.Inventory = Inventory;