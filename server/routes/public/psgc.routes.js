const express = require("express");
const router = express.Router();

// import controller functions

const { generatePSGCJson } = require("../../controller/public/psgc.controller");

router.get("/generate-psgc", generatePSGCJson);

module.exports = router;