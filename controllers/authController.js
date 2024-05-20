const path = require("path");
//const User = require("../model/User");
const User = require(path.join(__dirname, "..", "model", "User" ));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleLogin = async (req, res) =>{
  
    const {user, pwd} = req.body;
    if(!user || !pwd) res.status(400).json({"message": "Username and password required"});

     const foundUser = await User.findOne({ username: user }).exec();

     if(!foundUser){
        return res.status(401).json({ "message": "Unauthorized" }); //Unauthorized
     }

     // evaluate password
     const match = await bcrypt.compare(pwd, foundUser.password);
     if(match){

      //const roles = Object.values(foundUser.roles).filter(Boolean);
      const roles = foundUser.roles["user"]; // you can also use this const roles = foundUser.roles.user
      console.log(foundUser.roles["user"]);


     
      
        //create JWTs

        const accessToken = jwt.sign(
            { "UserInfo": {
               "username": foundUser.username,
               "roles": roles
              }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );


        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
            // saving refreshTokens with current users
        foundUser.refreshToken = refreshToken;
        const result  = await foundUser.save();
        console.log(result);


         res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true,  maxAge: 24 * 60 * 60 * 1000 });  // secure: true
         res.json({ roles, accessToken });
     }else{
        res.sendStatus(401);
     }
}


module.exports = { handleLogin };