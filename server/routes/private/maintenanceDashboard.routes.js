const express = require("express");
const router = express.Router();

// import controller functions
const {
    loadDashboardOwner,
    loadDashboardOwnerByUser,
    addDashboardOwner
} = require("../../controller/private/maintenanceDashboard.controller");

router.get("/load-dashboard-owner", loadDashboardOwner);

router.get("/load-dashboard-owner-by-user", loadDashboardOwnerByUser);

router.get("/add-dashboard-owner", addDashboardOwner);

module.exports = router;