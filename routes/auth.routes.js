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
    //requisitos contraseña: 1 mayuscula, 1 numero y un signo 
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (passwordRegex.test(password) === false) {
    res.render("auth/signup.hbs", {
      errorMessage: "Invalid password",
    });
    return; 
    }
    //requisitos email
    const mailRegex = /[\w|.|-]*@\w*\.[\w|.]*/g;
    if (mailRegex.test(email) === false) {
    res.render("auth/signup.hbs", {
      errorMessage: "Invalid email.",
    });
    return; 
    }



})






module.exports = router;