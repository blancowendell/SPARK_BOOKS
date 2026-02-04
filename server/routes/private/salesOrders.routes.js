const express = require("express");
const router = express.Router();

const {
  loadSalesOrders,
  getSalesOrders,
  addSalesOrders,
  editSalesOrders
} = require("../../controller/private/salesOrders.controller");

// GET
router.get("/load-sales_orders", loadSalesOrders);
router.get("/get-sales_orders/:id", getSalesOrders);
router.post("/add-sales_orders", addSalesOrders);
router.put("/edit-sales_orders/:id", editSalesOrders);

module.exports = router;
