const express = require("express");
const router = express.Router();

// import controller functions
const {
    loadApiList,
    addApi,
    getApi,
    editApi
} = require("../../controller/private/maintenanceApi.controller");

router.get("/load-api-list", loadApiList);

router.post("/add-api", addApi);

router.get("/get-api/:id", getApi);

router.put("/edit-api", editApi);

module.exports = router;