const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logEvent, logger } = require(path.join(__dirname, "middleware", "logEvent"));
const errorHandler = require(path.join(__dirname, "middleware", "errorHandler"));

const PORT = process.env.PORT || 3500;


//custom middleware logger
app.use(logger);

//Cross Origin Resource Sharing
const whitelist = ["http://www.yoursite.com", "http://127.0.0.1: 5500", "http://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) =>{
    if(whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true);
    }else{
      callback(new Error("Not allowed by CORS"))
    }
  }, optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false})); 
 
//built-in middleware for json
app.use(express.json());

//serve static files
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));

//routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require(path.join(__dirname, "routes", "api", "employees")));


 


//Route handlers
app.get("/hello(.html)?", (req, res, next)=>{
    console.log("attempted to load hello.html");
    next()
 
 }, (req, res) =>{
    res.send("Hello World!");
 });


const one = (req, res, next) =>{
    console.log("one");
    next();
}

const two = (req, res, next) =>{
    console.log("two");
    next();
}

const three = (req, res, next) =>{
    console.log("one");
    res.send("Finished");
}

app.get("/chain(.html)?", [one, two, three]);



app.all("*", (req, res) =>{
  res.status(404);

  if(req.accepts("html")){
     res.sendFile(path.join(__dirname, "views", "404.html"));
  }else if (req.accepts("json")){
     res.json({error: "404 Not Found"});
  }else{
    res.type("txt").send("404 Not Found");
  }
});  


app.use(errorHandler);




app.listen(3500, () =>{
    console.log(`Server is running on port ${PORT}`);
});


