const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant.model.js");
const User = require("../models/User.model.js");
const { isLogged, admin } = require("../middlewares/auth.middlewares");
const styleList = require("../utils/styleList");
const uploader = require("../middlewares/cloudinary.js");

// RUTAS PARA CREATE RESTAURANT
//GET "restaurant/create"=> para visualizar formulario de registro de restaurante

router.get("/create", isLogged, admin, (req, res, next) => {
  res.render("restaurant/create.hbs", { styleList });
});

//POST "restaurant/create" => para enviar formulario a la BD

router.post( "/create",isLogged,admin,uploader.single("image"),async (req, res, next) => {
    
    const { name, location, style, mainDish, image } = req.body;

    let newRest = {
      name,
      location,
      style,
      mainDish,
      image: req.file.path,
    };

    try {
      await Restaurant.create(newRest);
      res.redirect("/restaurant");
    } catch (error) {
      next(error);
    }
  }
);

//RUTAS PARA READ RESTAURANT LIST
// GET Ruta de usuario para visualizar lista de restaurantes

router.get("/", isLogged, uploader.single("image"), async (req, res, next) => {
  try {
    const restaurantList = await Restaurant.find();
    res.render("restaurant/restaurant.hbs", {
      restaurantList,
    });
  } catch (error) {
    next(error);
  }
});

//RUTA DEL BUSCADOR DE RESTAURANT
//GET "/restaurant" ruta para randerizar un buscador de restaurantes

router.get("/search", isLogged, uploader.single("image"), async (req, res, next) => {
  const { restaurantName } = req.query;
  console.log(req.query);
  if (restaurantName === undefined || restaurantName === "") {
    res.render("restaurant/restaurant.hbs");
  } else {
    try {
      const restaurantResult = await Restaurant.findOne({
        name: restaurantName,
      });
      res.render("restaurant/search.hbs", {
        restaurantResult,
      });
    } catch (err) {
      next(err);
    }
  }
});

//RUTA DETALLES DEL RESTAURANT
// GET ("/restaurant/:id") Ruta para mostrar detalles de restaurante

router.get("/:id", isLogged, async (req, res, next) => {
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

// RUTA PARA AGREGAR RESTAURANTES A LA PROPIEDAD FAVORITOS
//POST "/restaurant/:id/"

router.post("/:id", isLogged, async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const actualId = await Restaurant.findById(id);
    await User.findByIdAndUpdate( req.session.loggedUser._id,{
        $addToSet: { favorites: actualId },
      }
    );
    res.redirect("/restaurant");

  } catch (error) {
    next(error);
  }
});

//RUTAS PARA EDIT RESTAURANT
// GET "/restaurant/:id/edit" Ruta para mostrar detalles a editar del restaurante.

router.get("/:id/edit", isLogged, admin, async (req, res, next) => {
  const { id } = req.params;

  try {
    const editRestaurant = await Restaurant.findById(id);
    res.render("restaurant/edit.hbs", {
      editRestaurant,
      styleList,
    });
  } catch (error) {
    next(error);
  }
});

//POST "/restaurant/:id/edit" Ruta para traer desde la BD los campos a editar y actualizar

router.post( "/:id/edit",isLogged,admin, uploader.single("image"),async (req, res, next) => {
    const { id } = req.params;
    const { name, location, style, mainDish, image } = req.body;

    let restaurantEdited = {
      name,
      location,
      style,
      mainDish,
      image: req.file.path,
    };

    try {
      await Restaurant.findByIdAndUpdate(id, restaurantEdited);
      res.redirect("/restaurant");
    } catch (error) {
      next(error);
    }
  }
);

//RUTA PARA DELETE RESTAURANT
//POST "/restaurant/:id/delete" ruta para eliminar restaurant de la BD

router.post("/:id/delete", isLogged, admin, async (req, res, next) => {
  let { id } = req.params;

  try {
    await Restaurant.findByIdAndDelete(id);
    res.redirect("/restaurant");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
