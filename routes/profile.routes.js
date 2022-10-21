const express = require('express');
const router = express.Router();
const User = require ("../models/User.model.js")
//const{isLogged} = require("../middlewares/auth.middlewares")

//GET "/profile"=> ruta donde el usuario puede ver su perfil
router.get("/",(req,res,next)=>{
    res.render("profile/my-profile.hbs")
})








module.exports = router;