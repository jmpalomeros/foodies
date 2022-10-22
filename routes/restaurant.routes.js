const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant.model.js");
const { isLogged, admin } = require("../middlewares/auth.middlewares");

//GET "restaurant/create"=> para visualizar formulario de registro de restaurante
//ADMIN
router.get("/create", isLogged, (req, res, next) => {
  res.render("restaurant/create.hbs");
});

//POST "restaurant/create" => para enviar formulario a la BD
router.post("/create", isLogged, async (req, res, next) => {
  const { name, location, style, mainDish, image } = req.body;

  let newRest = {
    name: name,
    location: location,
    style: style,
    mainDish: mainDish,
    image: image,
  };

  try {
    await Restaurant.create(newRest);
    res.redirect("/restaurant");
  } catch (error) {
    next(error);
  }
});

// GET Ruta de usuario para visualizar lista de restaurantes
router.get("/", isLogged, async (req, res, next) => {
  try {
    const restaurantList = await Restaurant.find();
    res.render("restaurant/restaurant.hbs", {
      restaurantList,
    });
  } catch (error) {
    next(error);
  }
});

// GET ("/restaurant/:id") Ruta para mostrar detalles de restaurante
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const details = await Restaurant.findById(id);
    res.render("restaurant/details.hbs", {
      details,
    });
  } catch (error) {
    next(error);
  }
});

// GET ("/auth/logout") => ruta para deslogar
/*router.get("/logout", (req, res, next) => {
    req.session.destroy(() => {
    
     res.redirect("/");
    });
  });*/

module.exports = router;
