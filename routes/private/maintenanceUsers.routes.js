const express = require("express");
const router = express.Router();

// import controller functions
const {
    loadUsers,
    getUsers,
    addUsers,    
    editUsers
} = require("../../controller/private/maintenanceUsers.controller");

// GET
router.get("/load-users", loadUsers);

// GET BY ID PARAM
router.get("/get-users", getUsers);

// POST
router.post("/add-users", addUsers);    

// PUT
router.put("/edit-users", editUsers);

module.exports = router;