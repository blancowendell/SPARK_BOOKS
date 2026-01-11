const express = require("express");
const router = express.Router();

// import controller functions
const {
    saveLayout,
    loadLayout
} = require("../../controller/private/dashboard.controller");

router.post("/save-layout", saveLayout);

router.get("/load-layout", loadLayout);

module.exports = router;