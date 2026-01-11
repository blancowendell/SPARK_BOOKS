const express = require("express");
const router = express.Router();

// import controller functions
const {
    getPasswordStatus,
    updatePassword
} = require("../../controller/private/security.controller");


router.get("/get-password-status", getPasswordStatus);

router.put("/update-password", updatePassword);

module.exports = router;