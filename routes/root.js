const express = require("express");
const router = express.Router();
const path = require("path");


router.route("^/$|index.(html)?")
   .get((req, res) =>{
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
    //res.sendFile("./views/index.html", {root: __dirname});
  })
router.route("/*")
   .get((req, res) =>{
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
    //res.sendFile("./views/index.html", {root: __dirname});
  })
   


module.exports = router; 