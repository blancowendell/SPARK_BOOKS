const express = require("express");
const router = express.Router();

const {
  loadSalesInvoice,
  getSalesInvoice,
  addSalesInvoice,
  editSalesInvoice
} = require("../../controller/private/salesInvoice.controller");

// GET
router.get("/load-sales_invoice", loadSalesInvoice);
router.get("/get-sales_invoice/:invoiceId", getSalesInvoice);
router.post("/add-sales_invoice", addSalesInvoice);
router.put("/edit-sales_invoice/:invoiceId", editSalesInvoice);

module.exports = router;
