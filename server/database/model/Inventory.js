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
};

exports.Inventory = Inventory;