const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const { isLogged } = require("../middlewares/auth.middlewares");

//GET "/profile"=> ruta donde el usuario puede ver su perfil
router.get("/", isLogged, (req, res, next) => {
    console.log("usuario activo", req.session.loggedUser)
    User.findeById(req.session.loggedUser._id)
    .then((response)=>{
        res.render("profile/my-profile.hbs",{
          userDetails :response  
        })
        
    })
    .catch((err)=>{
        next(err)
    })
    
  
});

module.exports = router;
