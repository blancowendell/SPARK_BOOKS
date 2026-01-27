const express = require("express");
const router = express.Router();

const {
  loadPricingFormula,
  getPricingFormula,
  addPricingFormula,
  editPricingFormula
} = require("../../controller/private/pricingFormula.controller");

// GET
router.get("/load-pricing_formula", loadPricingFormula);
router.get("/get-pricing_formula/:pricingId", getPricingFormula);
router.post("/add-pricing_formula", addPricingFormula);
router.put("/edit-pricing_formula/:pricingId", editPricingFormula);

module.exports = router;
