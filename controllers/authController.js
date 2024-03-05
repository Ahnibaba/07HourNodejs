const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
}

const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");
const path = require("path");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) =>{
  
    const {user, pwd} = req.body;
    if(!user || !pwd){
       res.status(400).json({"message": "Username and password required"});

    }

     const foundUser = usersDB.users.find(person => person.username === user);

     if(!foundUser){
        return res.sendStatus(401); //Unauthorized
     }

     // evaluate password
     const match = await bcrypt.compare(pwd, foundUser.password);
     if(match){
        //create JWTs

        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
            // saving refreshTokens with current users
        const otherUsers = usersDB.users.filter(person => {person.username !== foundUser.username})
         const currentUser = { ...foundUser, refreshToken };
         usersDB.setUsers([...otherUsers, currentUser]);
         await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
         );
         res.cookie("jwt", refreshToken, {httpOnly: true, sameSize: "None", secure: true,  maxAge: 24 * 60 * 60 * 1000});
        res.json({ accessToken });
     }else{
        res.sendStatus(401);
     }
}


module.exports = { handleLogin };