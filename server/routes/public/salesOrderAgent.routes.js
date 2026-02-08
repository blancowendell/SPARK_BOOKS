const express = require("express");

const { addSalesOrders, loadSalesOrdersDateRange } = require("../../controller/private/salesOrders.controller");
const verifyJWT = require("../../middleware/authenticator");
const { loadMasterCustomerGeneral } = require("../../controller/private/masterCustomerGeneral.controller");
const { loadInventoryQuantity } = require("../../controller/private/inventoryQuantity.controller");
const { loadPricingFormula } = require("../../controller/private/pricingFormula.controller");
const router = express.Router();


router.get("/load-customer-general", verifyJWT, loadMasterCustomerGeneral);
router.get("/load-inventory-item", verifyJWT, loadInventoryQuantity);
router.get("/load-pricing-formula", verifyJWT, loadPricingFormula);
router.get("/load-sales-orders-range/:startDate/:endDate", verifyJWT, loadSalesOrdersDateRange);

router.post("/create-so-agent", verifyJWT, addSalesOrders);


module.exports = router;
