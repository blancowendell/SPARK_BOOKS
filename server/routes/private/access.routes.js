const express = require("express");
const router = express.Router();

// import controller functions
const {
    getAccess
} = require("../../controller/private/access.controller");

router.get("/load-access", getAccess);

module.exports = router;
