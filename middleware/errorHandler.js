const path = require("path");
const { logEvent } = require(path.join(__dirname, "logEvent.js"));

const errorHandler = (err, req, res, next) =>{
    logEvent(`${err.name}: ${err.message}`, "errLog.txt" );
    console.error(err.stack);
    res.status(500).send(err.message);  
  }

  module.exports = errorHandler;