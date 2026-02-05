const express = require("express");
const router = express.Router();

const {
  loadMasterSalesRep,
  getMasterSalesRep,
  addMasterSalesRep,
  editMasterSalesRep
} = require("../../controller/private/masterSalesRep.controller");

// GET
router.get("/load-master_sales_rep", loadMasterSalesRep);
router.get("/get-master_sales_rep/:id", getMasterSalesRep);
router.post("/add-master_sales_rep", addMasterSalesRep);
router.put("/edit-master_sales_rep/:id", editMasterSalesRep);

module.exports = router;
