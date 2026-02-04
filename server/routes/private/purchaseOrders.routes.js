const express = require("express");
const router = express.Router();

const {
  loadPurchaseOrders,
  getPurchaseOrders,
  addPurchaseOrders,
  editPurchaseOrders
} = require("../../controller/private/purchaseOrders.controller");

// GET
router.get("/load-purchase_orders", loadPurchaseOrders);
router.get("/get-purchase_orders/:id", getPurchaseOrders);
router.post("/add-purchase_orders", addPurchaseOrders);
router.put("/edit-purchase_orders/:id", editPurchaseOrders);

module.exports = router;
