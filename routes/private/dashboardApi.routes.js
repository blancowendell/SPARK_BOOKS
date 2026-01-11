const express = require("express");
const router = express.Router();

// import controller functions
const {
    ticketNewToday,
    ticketGraphAllStatus
} = require("../../controller/private/dashboardApi.controller");

router.get("/ticket-new-today", ticketNewToday);

router.get("/ticket-graph-all-status", ticketGraphAllStatus);

module.exports = router;