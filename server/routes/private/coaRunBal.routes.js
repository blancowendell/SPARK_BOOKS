const express = require("express");
const router = express.Router();

const {
  loadCoaRunBal,
  getCoaRunBal,
  addCoaRunBal,
  editCoaRunBal
} = require("../../controller/private/coaRunBal.controller");

// GET
router.get("/load-coa_run_bal", loadCoaRunBal);
router.get("/get-coa_run_bal/:id", getCoaRunBal);
router.post("/add-coa_run_bal", addCoaRunBal);
router.put("/edit-coa_run_bal/:id", editCoaRunBal);

module.exports = router;
