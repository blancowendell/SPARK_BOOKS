const express = require("express");
const router = express.Router();

const {
  loadMasterCoa,
  getMasterCoa,
  addMasterCoa,
  editMasterCoa
} = require("../../controller/private/masterCoa.controller");

// GET
router.get("/load-master_coa", loadMasterCoa);
router.get("/get-master_coa/:id", getMasterCoa);
router.post("/add-master_coa", addMasterCoa);
router.put("/edit-master_coa/:id", editMasterCoa);

module.exports = router;
