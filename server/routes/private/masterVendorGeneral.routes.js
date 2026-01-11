const express = require("express");
const router = express.Router();

const {
  loadMasterVendorGeneral,
  getMasterVendorGeneral,
  addMasterVendorGeneral,
  editMasterVendorGeneral
} = require("../../controller/private/masterVendorGeneral.controller");

// GET
router.get("/load-master_vendor_general", loadMasterVendorGeneral);
router.get("/get-master_vendor_general/:id", getMasterVendorGeneral);
router.post("/add-master_vendor_general", addMasterVendorGeneral);
router.put("/edit-master_vendor_general/:id", editMasterVendorGeneral);

module.exports = router;
