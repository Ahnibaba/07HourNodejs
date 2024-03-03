const express = require("express");
const router = express.Router();
const path = require("path");
//const { getAllEmployees, createNewEmployees, updateEmployee, deleteEmployee, getEmployee } = require(path.join(__dirname, "..", "..", "controllers", "employeesController.js"));
const employeesController = require(path.join(__dirname, "..", "..", "controllers", "employeesController.js"));

router.route("/")
.get(employeesController.getAllEmployees)
.post(employeesController.createNewEmployees)
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee);


router.route("/:id")
   .get(employeesController.getEmployee)


module.exports = router;