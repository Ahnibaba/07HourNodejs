const express = require("express");
const router = express.Router();
const path = require("path");
//const { getAllEmployees, createNewEmployees, updateEmployee, deleteEmployee, getEmployee } = require(path.join(__dirname, "..", "..", "controllers", "employeesController.js"));
const employeesController = require(path.join(__dirname, "..", "..", "controllers", "employeesController.js"));
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/")
.get(employeesController.getAllEmployees)
.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.createNewEmployees)
.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
.delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);


router.route("/:id")
   .get(employeesController.getEmployee)


module.exports = router;