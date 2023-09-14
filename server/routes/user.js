const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.js");

const router = express.Router();

// router.get("/", (req, res) => {
//     req.send("Hello World!!!");
// });

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({email});

    if(user){
        return res.json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({name, email, password: hashedPassword});
    try{
        await newUser.save();
        return res.json({status:100, message: "User registered successfully"});
    }
    catch(err){
        return res.json({message: "Something went wrong"});
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({email});

    if(!user){
        return res.json({message: "User doesn't exist"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.json({message: "Invalid credentials"});
    }
    
    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY); // use environment variable (env) for secret
    res.json({token, userID: user._id});

});

module.exports = router;