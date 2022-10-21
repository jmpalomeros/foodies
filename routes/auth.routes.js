const express = require('express');
const router = express.Router();
const User = require("../models/User.model")

//SIGN UP ROUTE

router.get("/signup", (req,res,next)=>{
    res.render("auth/signup.hbs");
    
})

router.post("/signup", async (req,res,next)=>{
    const{username, email, password, age, city} = req.body

    console.log(req.body)
    
    if(username === "" || email === ""|| password=== ""){
        res.render("auth/signup.hbs",{
            errorMessage: "Must complete: username, email & password"
        }) 
        return;
    }



})






module.exports = router;