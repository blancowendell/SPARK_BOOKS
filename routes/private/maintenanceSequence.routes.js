const express = require("express");
const router = express.Router();

// import controller functions
const {
    loadSequence,
    loadListSequence,
    addSequence,
    getSequence,
    editSequence
} = require("../../controller/private/maintenanceSequence.controller");

router.get("/load-sequence", loadSequence);

router.get("/load-list-sequence", loadListSequence);

router.post("/add-sequence", addSequence);

router.post("/get-sequence", getSequence);

router.put("/edit-sequence", editSequence);
module.exports = router;