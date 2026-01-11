const express = require("express");
const router = express.Router();

const {
  loadMasterVendorType,
  getMasterVendorType,
  addMasterVendorType,
  editMasterVendorType
} = require("../../controller/private/masterVendorType.controller");

// GET
router.get("/load-master_vendor_type", loadMasterVendorType);
router.get("/get-master_vendor_type/:id", getMasterVendorType);
router.post("/add-master_vendor_type", addMasterVendorType);
router.put("/edit-master_vendor_type/:id", editMasterVendorType);

module.exports = router;
