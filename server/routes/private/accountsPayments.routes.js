const express = require("express");
const router = express.Router();

const {
  loadAccountsPayments,
  getAccountsPayments,
  addAccountsPayments,
  editAccountsPayments
} = require("../../controller/private/accountsPayments.controller");

// GET
router.get("/load-accounts_payments", loadAccountsPayments);
router.get("/get-accounts_payments/:id", getAccountsPayments);
router.post("/add-accounts_payments", addAccountsPayments);
router.put("/edit-accounts_payments/:id", editAccountsPayments);

module.exports = router;
