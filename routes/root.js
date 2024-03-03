const express = require("express");
const router = express.Router();
const path = require("path");


router.get("^/$|index.(html)?", (req, res) =>{
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
    //res.sendFile("./views/index.html", {root: __dirname});
  });
router.get("/new-page.(html)?", (req, res) =>{
    res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
    //res.sendFile("./views/index.html", {root: __dirname});
  });

router.get("/old-page(.html)?", (req, res) =>{
    res.status(301).redirect(path.join(__dirname, "views", "new-page.html"));
     //res.sendFile("./views/index.html", {root: __dirname});
   });

module.exports = router;