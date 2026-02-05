const express = require("express");
const router = express.Router();

const {
  loadMasterInventory,
  getMasterInventory,
  addMasterInventory,
  editMasterInventory
} = require("../../controller/private/masterInventory.controller");

// GET
router.get("/load-master_inventory", loadMasterInventory);
router.get("/get-master_inventory/:inventoryId", getMasterInventory);
router.post("/add-master_inventory", addMasterInventory);
router.put("/edit-master_inventory/:inventoryId", editMasterInventory);

module.exports = router;
