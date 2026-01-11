const express = require("express");
const router = express.Router();

// import controller functions
const {
    login,
    logout,
    session
} = require("../../controller/public/login.controller");

router.post("/login", login);

router.post("/logout", logout);

router.get("/session", session);

module.exports = router;
