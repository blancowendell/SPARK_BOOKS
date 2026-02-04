const Account = {
  accounts_receivable: {
  tablename: "accounts_receivable",
  prefix: "ar",
  prefix_: "ar_",
  insertColumns: [
      "invoice_id",
      "purchase_order_id",
      "customer_id",
      "vendor_id",
      "reference_no",
      "reciept_no",
      "amount_due",
      "amount_paid",
      "payment_method",
      "payment_date",
      "created_at",
      "create_by",
      "status"
    ],
  selectColumns: [
      "ar_id",
      "ar_invoice_id",
      "ar_purchase_order_id",
      "ar_customer_id",
      "ar_vendor_id",
      "ar_reference_no",
      "ar_reciept_no",
      "ar_amount_due",
      "ar_amount_paid",
      "ar_payment_method",
      "ar_payment_status",
      "ar_payment_date",
      "ar_created_at",
      "ar_create_by",
      "ar_status"
    ],
  selectOptionColumns: {
    id: "ar_id",
    invoice_id: "ar_invoice_id",
    purchase_order_id: "ar_purchase_order_id",
    customer_id: "ar_customer_id",
    vendor_id: "ar_vendor_id",
    reference_no: "ar_reference_no",
    reciept_no: "ar_reciept_no",
    amount_due: "ar_amount_due",
    amount_paid: "ar_amount_paid",
    payment_method: "ar_payment_method",
    payment_status: "ar_payment_status",
    payment_date: "ar_payment_date",
    created_at: "ar_created_at",
    create_by: "ar_create_by",
    status: "ar_status"
  },
  updateOptionColumns: {
    id: "id",
    invoice_id: "invoice_id",
    purchase_order_id: "purchase_order_id",
    customer_id: "customer_id",
    vendor_id: "vendor_id",
    reference_no: "reference_no",
    reciept_no: "reciept_no",
    amount_due: "amount_due",
    amount_paid: "amount_paid",
    payment_method: "payment_method",
    payment_status: "payment_status",
    payment_date: "payment_date",
    created_at: "created_at",
    create_by: "create_by",
    status: "status"
  },
  selectDateFormatColumns: {
    payment_date: "REPLACE(REPLACE(ar_payment_date, 'T', ' '), 'Z', '') AS ar_payment_date",
    created_at: "REPLACE(REPLACE(ar_created_at, 'T', ' '), 'Z', '') AS ar_created_at"
  },
  selectMiscColumns: {

  }
},
  accounts_payments: {
  tablename: "accounts_payments",
  prefix: "ap",
  prefix_: "ap_",
  insertColumns: [
      "coa_id",
      "customer_id",
      "vendor_id",
      "invoice_ids",
      "purchase_order_ids",
      "reference_no",
      "reciept_no",
      "amount_payment",
      "payment_method",
      "payment_date",
      "created_at",
      "created_by",
      "status"
    ],
  selectColumns: [
      "ap_id",
      "ap_coa_id",
      "ap_customer_id",
      "ap_vendor_id",
      "ap_invoice_ids",
      "ap_purchase_order_ids",
      "ap_reference_no",
      "ap_reciept_no",
      "ap_amount_payment",
      "ap_payment_method",
      "ap_payment_date",
      "ap_created_at",
      "ap_created_by",
      "ap_status"
    ],
  selectOptionColumns: {
    id: "ap_id",
    coa_id: "ap_coa_id",
    customer_id: "ap_customer_id",
    vendor_id: "ap_vendor_id",
    invoice_ids: "ap_invoice_ids",
    purchase_order_ids: "ap_purchase_order_ids",
    reference_no: "ap_reference_no",
    reciept_no: "ap_reciept_no",
    amount_payment: "ap_amount_payment",
    payment_method: "ap_payment_method",
    payment_date: "ap_payment_date",
    created_at: "ap_created_at",
    created_by: "ap_created_by",
    status: "ap_status"
  },
  updateOptionColumns: {
    id: "id",
    coa_id: "coa_id",
    customer_id: "customer_id",
    vendor_id: "vendor_id",
    invoice_ids: "invoice_ids",
    purchase_order_ids: "purchase_order_ids",
    reference_no: "reference_no",
    reciept_no: "reciept_no",
    amount_payment: "amount_payment",
    payment_method: "payment_method",
    payment_date: "payment_date",
    created_at: "created_at",
    created_by: "created_by",
    status: "status"
  },
  selectDateFormatColumns: {
    payment_date: "REPLACE(REPLACE(ap_payment_date, 'T', ' '), 'Z', '') AS ap_payment_date",
    created_at: "REPLACE(REPLACE(ap_created_at, 'T', ' '), 'Z', '') AS ap_created_at"
  },
  selectMiscColumns: {

  }
},
};

exports.Account = Account;