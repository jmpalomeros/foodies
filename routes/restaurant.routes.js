const express = require('express');
const router = express.Router();
const Restaurant = require ("../models/Restaurant.model.js")
const{isLogged}=require("../middlewares/auth.middlewares")

//GET "/restaurant"=> muestra la middle screen

router.get("/",(req,res,next)=>{
    res.render("restaurant/restaurant.hbs")
})





// GET ("/auth/logout") => ruta para deslogar
router.get("/logout", (req, res, next) => {
    req.session.destroy(() => {
     res.redirect("/");
    });
  });


module.exports = router;