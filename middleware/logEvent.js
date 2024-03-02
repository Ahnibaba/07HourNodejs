const { format, compareAsc } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvent = async (message, logName) =>{
  
    const dateTime = format(new Date(), "dd/MM/yyyy\thh:mm:ss");  
    const logItem = `${dateTime}\t${uuid()}\t ${message}`;
    console.log(logItem);
    try{

      if(!fs.existsSync("./log")){
        await fsPromises.mkdir(path.join(__dirname, "..", "log"));
      }
     

      await fsPromises.appendFile(path.join(__dirname, "..", "log", logName), logItem);
      

    }catch(err){
       console.log(err);
    }

    
    
}


const logger = (req, res, next) =>{
  logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`In Logger function: ${req.method} ${req.path}`);
  next(); 
}



module.exports = {
  logEvent, 
  logger
}



