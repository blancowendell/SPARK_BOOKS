const express = require("express");
const router = express.Router();

const {
  loadInventoryHistory,
  getInventoryHistory,
  addInventoryHistory,
} = require("../../controller/private/inventoryHistory.controller");

// GET
router.get("/load-inventory_history/:inventoryId", loadInventoryHistory);
router.get("/get-inventory_history/:historyId", getInventoryHistory);
router.post("/add-inventory_history", addInventoryHistory);

module.exports = router;
