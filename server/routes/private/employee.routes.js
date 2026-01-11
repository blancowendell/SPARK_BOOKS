const express = require("express");
const router = express.Router();

// import controller functions
const {
    loadEmployees,
    addEmployee,
    getEmployee,
    updateEmployee
} = require("../../controller/private/employee.controller");

router.get("/load-employees", loadEmployees);

router.post("/add-employee", addEmployee);

router.get("/get-employee/:employeeId", getEmployee);

router.put("/update-employee/:employeeId", updateEmployee);

module.exports = router;