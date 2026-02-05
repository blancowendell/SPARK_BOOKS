const Purchase = {
  purchase_orders: {
  tablename: "purchase_orders",
  prefix: "po",
  prefix_: "po_",
  insertColumns: [
      "created_at",
      "status"
    ],
  selectColumns: [
      "po_id",
      "po_created_at",
      "po_status"
    ],
  selectOptionColumns: {
    id: "po_id",
    created_at: "po_created_at",
    status: "po_status"
  },
  updateOptionColumns: {
    id: "id",
    created_at: "created_at",
    status: "status"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(po_created_at, 'T', ' '), 'Z', '') AS po_created_at"
  },
  selectMiscColumns: {

  }
},
};

exports.Purchase = Purchase;