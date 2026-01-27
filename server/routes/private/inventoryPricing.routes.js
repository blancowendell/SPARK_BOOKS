const express = require("express");
const router = express.Router();

const {
  loadInventoryPricing,
  getInventoryPricing,
  addInventoryPricing,
  editInventoryPricing
} = require("../../controller/private/inventoryPricing.controller");

// GET
router.get("/load-inventory_pricing", loadInventoryPricing);
router.get("/get-inventory_pricing/:id", getInventoryPricing);
router.post("/add-inventory_pricing", addInventoryPricing);
router.put("/edit-inventory_pricing/:id", editInventoryPricing);

module.exports = router;
