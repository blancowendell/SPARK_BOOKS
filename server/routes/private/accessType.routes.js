const express = require("express");
const router = express.Router();

// import controller functions
const {
    getAccessType,
    updateAccessType,
} = require("../../controller/private/accessType.controller");

router.get("/get-access-type/:accessId", getAccessType);

router.put("/update-access-type/:accessTypeId", updateAccessType);

module.exports = router;
