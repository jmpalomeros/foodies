const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const { isLogged } = require("../middlewares/auth.middlewares");
const Restaurant = require("../models/Restaurant.model");
const Rating = require("../models/Rating.model");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//RUTA CREATE

//GET "/rating/new-rating" => ruta que renderiza formulario para crear valoracion

router.get("/:id/new-rating", isLogged, async (req, res, next) => {
  const { id } = req.params;
  try {

    const foundRating = await Rating.findOne({user: req.session.loggedUser._id, restaurant: id})
    console.log("quiero saber que se pasa aqui", foundRating)
    // if (foundRating !== null) {
    //   res.render("rating/new-rating.hbs", {
    //     errorMessage: "Ya has valorado este restaurante"
    //   })
    //   return;
    // }

    const restaurantToRate = await Restaurant.findById(id).select("name");
    //.populate("username")

    console.log(restaurantToRate);
    res.render("rating/new-rating.hbs", {
      restaurantToRate,
      numbers,
      foundRating,
      errorMessage: "Ya has valorado este restaurante",
    });
  } catch (err) {
    next(err);
  }
});

//POST "/rating/new-rating" => ruta para añadir la valoracion
// router.post("/:id/new-rating", isLogged, async (req, res, next) => {
//     const { id } = req.params; //es del restaurante
//     const {rating, recomendedDish, commentary } = req.body;
//     console.log(req.body)
//     console.log("el id del usuario:",req.session.loggedUser._id)
//     let newRating = {
//     restaurant: id,
//     user: req.session.loggedUser._id,
//     rating,
//     recomendedDish,
//     commentary,
//   };

//   try {
    
//     await Rating.create(newRating);
//     res.redirect("/restaurant");
//   } catch (err) {
//     next(err);
//   }
// });

//!
router.post("/:id/new-rating", isLogged, async (req, res, next) => {
// // <<<<<<< HEAD
 const { id } = req.params; //es del restaurante
 const {rating, recomendedDish, commentary } = req.body;
//     console.log(req.body)
//     console.log("el id del usuario:",req.session.loggedUser._id)

// // // =======
// //   const { id } = req.params; //es del restaurante
// //   const { rating, recomendedDish, commentary } = req.body;
// //   console.log(req.body);
// //   console.log("el id del usuario:", req.session.loggedUser._id);
// //   let newRating = {
// //     restaurant: id,
// //     user: req.session.loggedUser._id,
// //     rating,
// //     recomendedDish,
// //     commentary,
// //   };
// // // >>>>>>> dde489940631360377ed1b4213ad51d65cde75a9

if (rating === "" || recomendedDish === "" || commentary === "") {
  const restaurantToRate = await Restaurant.findById(id).select("name");
  res.render("rating/new-rating.hbs", {
    restaurantToRate,
      numbers,  
      errorMessage: "Must complete: rating, recomended dish & commentary",
  });
  return;
}
  try {

    // const foundUser = await Rating.findOne({user: req.session.loggedUser._id, restaurant: id})
    // console.log("quiero saber que se pasa aqui", foundUser)
    // if (foundUser !== null) {
    //   res.render("rating/new-rating.hbs", {
    //     errorMessage: "Ya has valorado este restaurante"
    //   })
    //   return;
    // }
    
    let newRating = {
      restaurant: id,
      user: req.session.loggedUser._id,
      rating,
      recomendedDish,
      commentary,
    };

    await Rating.create(newRating);
    console.log("¿esto que es?", newRating)
    res.redirect("/restaurant");

  } catch (err) {
    next(err);
  }
});
//!

//RUTA READ
//GET "/rating/:id/ratings" => renderizar todas las valoraciones de un mismo restaurante
router.get("/:id/ratings", isLogged, async (req, res, next) => {
  const { id } = req.params;

  try {
    const restaurantRating = await Rating.find({ restaurant: id }).populate(
      "user"
    );
    // console.log("este es el id que estamos pasando")
    res.render("rating/restaurant-ratings.hbs", {
      restaurantRating,
    });
  } catch (err) {
    next(err);
  }
});

//GET "/rating/my-ratings" => renderiza todas las opiniones del usuario logeado
router.get("/my-ratings", isLogged, async (req, res, next) => {
  try {
    const myRating = await Rating.find({
      user: req.session.loggedUser._id,
    }).populate("restaurant");
    //  console.log(myRating)
    res.render("rating/my-ratings.hbs", {
      myRating,
    });
  } catch (err) {
    next(err);
  }
});

//RUTA UPLOAD RATING

//GET "/rating/:id/my-ratings/edit" => renderiza el rating a editar

router.get("/:id/my-ratings/edit", isLogged, async (req, res, next) => {
  const { id } = req.params;
  try {
    const ratingToEdit = await Rating.findById(id).populate("restaurant");
    res.render("rating/edit.hbs", {
      ratingToEdit,
      numbers,
    });
  } catch (err) {
    next(err);
  }
});

//POST "/rating/:id/my-ratings/edit"
router.post("/:id/my-ratings/edit", isLogged, async(req,res,next)=>{
  const{id} = req.params
  const{rating, recomendedDish,commentary} = req.body

  let updateRating = {
    rating,
    recomendedDish,
    commentary
  }

  try{
    const ratingUpdated = await  Rating.findByIdAndUpdate(id, updateRating)
    res.redirect("/profile")

  }catch(err){
    next(err)
  }
})

//RUTA DELETE RATING

//POST "/rating/:id/delete"=>ruta para eliminar una valoracion
router.post("/:id/my-ratings/delete", isLogged, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Rating.findByIdAndDelete(id);
    res.redirect("/rating/my-ratings");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
