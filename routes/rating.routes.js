const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const { isLogged } = require("../middlewares/auth.middlewares");
const Restaurant = require("../models/Restaurant.model");
const Rating = require("../models/Rating.model");
const numbers = [1,2,3,4,5,6,7,8,9,10]


//RUTA CREATE

//GET "/rating/new-rating" => ruta que renderiza formulario para crear valoracion

router.get("/:id/new-rating", isLogged, async (req, res, next) => {
  const { id } = req.params;
  try {
    const restaurantToRate = await Restaurant.findById(id).select("name")
    //.populate("username")
    
    console.log(restaurantToRate)
    res.render("rating/new-rating.hbs", {
      restaurantToRate, numbers
    });
  } catch (err) {
    next(err);
  }
});

//POST "/rating/new-rating" => ruta para añadir la valoracion
router.post("/:id/new-rating", isLogged, async (req, res, next) => {
    const { id } = req.params; //es del restaurante
    const {rating, recomendedDish, alergias } = req.body;
    console.log(req.body)
    console.log("el id del usuario:",req.session.loggedUser._id)
    let newRating = {
    restaurant: id,
    user: req.session.loggedUser._id,
    rating,
    recomendedDish,
    alergias,
  };
  try {
    await Rating.create(newRating);
    res.redirect("/rating/ratings");
  } catch (err) {
    next(err);
  }
});

//RUTA READ

//GET "/rating/rantings" => renderiza las valoraciones hechas por el usuario

router.get("/ratings", isLogged, async (req, res, next)=>{
    try{
      const ratingList =await Rating.find()
      .populate("restaurant")
      res.render("rating/ratings.hbs",{
      ratingList
    })
    
    }catch(err){
      next(err)
  }
})

module.exports = router;
