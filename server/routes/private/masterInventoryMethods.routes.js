const express = require("express");
const router = express.Router();

const {
  loadMasterInventoryMethods,
  getMasterInventoryMethods,
  addMasterInventoryMethods,
  editMasterInventoryMethods
} = require("../../controller/private/masterInventoryMethods.controller");

// GET
router.get("/load-master_inventory_methods", loadMasterInventoryMethods);
router.get("/get-master_inventory_methods/:id", getMasterInventoryMethods);
router.post("/add-master_inventory_methods", addMasterInventoryMethods);
router.put("/edit-master_inventory_methods/:id", editMasterInventoryMethods);

module.exports = router;
