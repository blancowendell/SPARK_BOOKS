const express = require("express");
const router = express.Router();

const {
  loadAccountsReceivableCustomer,
  loadAccountsReceivableVendors,
  getAccountsReceivable,
  addAccountsReceivable,
  editAccountsReceivable
} = require("../../controller/private/accountsReceivable.controller");

// GET
router.get("/load-accounts_receivable_vendor/:vendorId", loadAccountsReceivableVendors);
router.get("/load-accounts_receivable_customer/:customerId", loadAccountsReceivableCustomer);
router.get("/get-accounts_receivable/:id", getAccountsReceivable);
router.post("/add-accounts_receivable", addAccountsReceivable);
router.put("/edit-accounts_receivable/:id", editAccountsReceivable);

module.exports = router;
 