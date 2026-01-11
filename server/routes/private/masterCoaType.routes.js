const express = require("express");
const router = express.Router();

const {
  loadMasterCoaType,
  getMasterCoaType,
  addMasterCoaType,
  editMasterCoaType
} = require("../../controller/private/masterCoaType.controller");

// GET
router.get("/load-master_coa_type", loadMasterCoaType);
router.get("/get-master_coa_type/:id", getMasterCoaType);
router.post("/add-master_coa_type", addMasterCoaType);
router.put("/edit-master_coa_type/:id", editMasterCoaType);

module.exports = router;
