const express = require("express");
const router = express.Router();

const {
  loadInventoryQuantity,
} = require("../../controller/private/inventoryQuantity.controller");

// GET
router.get("/load-inventory_quantity", loadInventoryQuantity);

module.exports = router;
