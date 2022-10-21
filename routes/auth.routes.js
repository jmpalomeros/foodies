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
    
    try{

        const foundUser = await User.findOne({ username: username });
        
        if (foundUser !== null) {
          res.render("auth/signup.hbs", {
        errorMessage: "Username not available",
        });
        return;
        }

        const foundMail = await User.findOne({ email: email });
        if (foundMail !== null) {
        res.render("auth/signup.hbs", {
        errorMessage: "Registered email ",
         });return;
        } 

        let newUser ={
            username : username,
            email : email,
            password : password,
            age : age,
            city : city,
        }

        await User.create(newUser)
        res.redirect("/") //! redirigir a middle screen - listado de restaurantes
    }catch(err){
        next(err)
    }

})






module.exports = router;