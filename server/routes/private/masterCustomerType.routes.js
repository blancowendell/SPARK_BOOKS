const express = require("express");
const router = express.Router();

const {
  loadMasterCustomerType,
  getMasterCustomerType,
  addMasterCustomerType,
  editMasterCustomerType
} = require("../../controller/private/masterCustomerType.controller");

// GET
router.get("/load-master_customer_type", loadMasterCustomerType);
router.get("/get-master_customer_type/:id", getMasterCustomerType);
router.post("/add-master_customer_type", addMasterCustomerType);
router.put("/edit-master_customer_type/:id", editMasterCustomerType);

module.exports = router;
