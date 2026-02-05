const express = require("express");
const router = express.Router();

const {
  loadRegions,
  loadProvinces,
  loadCities,
  loadBarangays,
} = require("../../controller/public/addressLocation.controller");


router.get("/load-regions", loadRegions);
router.get("/load-provinces/:regionCode", loadProvinces);
router.get("/load-cities/:provinceCode", loadCities);
router.get("/load-barangays/:cityCode", loadBarangays);


module.exports = router;
