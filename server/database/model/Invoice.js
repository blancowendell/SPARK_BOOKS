const Invoice = {
  invoice_items: {
  tablename: "invoice_items",
  prefix: "ii",
  prefix_: "ii_",
  insertColumns: [
      "invoice_id",
      "item_id",
      "quantity",
      "oum",
      "item_description",
      "unit_price",
      "amount",
      "created_at",
      "status"
    ],
  selectColumns: [
      "ii_id",
      "ii_invoice_id",
      "ii_item_id",
      "ii_quantity",
      "ii_oum",
      "ii_item_description",
      "ii_unit_price",
      "ii_amount",
      "ii_created_at",
      "ii_status"
    ],
  selectOptionColumns: {
    id: "ii_id",
    invoice_id: "ii_invoice_id",
    item_id: "ii_item_id",
    quantity: "ii_quantity",
    oum: "ii_oum",
    item_description: "ii_item_description",
    unit_price: "ii_unit_price",
    amount: "ii_amount",
    created_at: "ii_created_at",
    status: "ii_status"
  },
  updateOptionColumns: {
    id: "id",
    invoice_id: "invoice_id",
    item_id: "item_id",
    quantity: "quantity",
    oum: "oum",
    item_description: "item_description",
    unit_price: "unit_price",
    amount: "amount",
    created_at: "created_at",
    status: "status"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(ii_created_at, 'T', ' '), 'Z', '') AS ii_created_at"
  },
  selectMiscColumns: {

  }
},
};

exports.Invoice = Invoice;