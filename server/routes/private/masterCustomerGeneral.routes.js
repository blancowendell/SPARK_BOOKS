const express = require("express");
const router = express.Router();

const {
  loadMasterCustomerGeneral,
  getMasterCustomerGeneral,
  addMasterCustomerGeneral,
  editMasterCustomerGeneral
} = require("../../controller/private/masterCustomerGeneral.controller");

// GET
router.get("/load-master_customer_general", loadMasterCustomerGeneral);
router.get("/get-master_customer_general/:customerId", getMasterCustomerGeneral);
router.post("/add-master_customer_general", addMasterCustomerGeneral);
router.put("/edit-master_customer_general/:customerId", editMasterCustomerGeneral);

module.exports = router;
