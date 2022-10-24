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
    const restaurantToRate = await Restaurant.findById(id);
   
    //.populate("name")
    
    //console.log("usuario logado",req.session.loggedUser._id)
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
    const { restaurant, user, rating, recomendedDish, alergias } = req.body;
    console.log(req.body)
    console.log("el id del usuario:",req.session.loggedUser._id)
    let newRating = {
    restaurant,
    user,
    rating,
    recomendedDish,
    alergias,
  };
  try {
    await Rating.create(newRating);
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

//RUTA READ

//GET "/rating/my-rantings" => renderiza las valoraciones hechas por el usuario

// router.get("/my-ratings", isLogged, async (req, res, next)=>{
//     try{
//         const myRatings = await User.find()

//     }catch(err){
//         next(err)
//     }
//     res.render
// })

module.exports = router;
