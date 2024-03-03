const express = require("express");
const router = express.Router();
const path = require("path");


router.get("^/$|index.(html)?", (req, res) =>{
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
    //res.sendFile("./views/index.html", {root: __dirname});
  });
router.get("/test(.html)?", (req, res) =>{
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
    //res.sendFile("./views/index.html", {root: __dirname});
  });

module.exports = router;