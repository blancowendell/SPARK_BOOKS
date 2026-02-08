const express = require("express");
const router = express.Router();

const {
  loadSalesOrders,
  getSalesOrders,
  addSalesOrders,
  editSalesOrders,
  loadSalesOrdersPending,
  acctionSalesOrder,
  loadSalesOrdersApproved
} = require("../../controller/private/salesOrders.controller");

// GET
router.get("/load-sales_orders", loadSalesOrders);
router.get("/load-sales_orders-pending", loadSalesOrdersPending);
router.get("/load-sales_orders-approved", loadSalesOrdersApproved);
router.get("/get-sales_orders/:salesOrderId", getSalesOrders);
router.post("/add-sales_orders", addSalesOrders);
router.put("/edit-sales_orders/:id", editSalesOrders);
router.put("/action-sales_orders/:salesOrderId", acctionSalesOrder); 

module.exports = router;
