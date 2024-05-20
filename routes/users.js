const express = require("express");
const router = express.Router();
const {  getAllUsers } = require("../controllers/usersController");

router
   .get("/users", getAllUsers);

module.exports = router;