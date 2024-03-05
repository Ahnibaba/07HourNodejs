const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logEvent, logger } = require(path.join(__dirname, "middleware", "logEvent"));
const errorHandler = require(path.join(__dirname, "middleware", "errorHandler"));
const {corsOptions} = require(path.join(__dirname, "config", "corsOptions.js"));
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");


const PORT = process.env.PORT || 3500;




//custom middleware logger
app.use(logger);


app.use(credentials);


app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false})); 
 
//built-in middleware for json
app.use(express.json());


//middleware for cookies
app.use(cookieParser());


//serve static files
app.use("/", express.static(path.join(__dirname, "public")));


//routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));



app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
 


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


