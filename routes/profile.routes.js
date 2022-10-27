const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const { isLogged } = require("../middlewares/auth.middlewares");
const uploader = require("../middlewares/cloudinary.js");

//GET "/profile"=> ruta donde el usuario puede ver su perfil
router.get("/", isLogged, async (req, res, next) => {
  try {
    console.log("usuario activo", req.session.loggedUser);
    const activeSession = await User.findById(
      req.session.loggedUser._id)
      .populate("favorites");
      res.render("profile/my-profile.hbs",{
      activeSession});
  } catch (err) {
    next(err);
  }
});

//RUTAS PARA EDITAR PERFIL

//GET "profile/:id/edit"=> renderiza el formulario para editar los datos actuales del perfil
router.get(
  "/:id/edit",
  isLogged,
  uploader.single("image"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const editedProfile = await User.findById(id);
      res.render("profile/edit-profile.hbs", {
        editedProfile,
      });
      } catch (err) {
      next(err);
    }
  }
);

//POST "profile/:id/edit"=> recibe los datos editados y los actualiza
router.post(
  "/:id/edit",
  isLogged,
  uploader.single("image"),
  async (req, res, next) => {
    const { id } = req.params;
    const { username, password, email, age, city, image } = req.body;

    let uploadProfile = {
      username,
      password,
      email,
      age,
      city,
      image: req.file.path,
    };

    try {
      await User.findByIdAndUpdate(id, uploadProfile);
      res.redirect("/profile");
    } catch (err) {
      next(err);
    }
  }
);

//RUTA PARA ELIMINAR EL PERFIL

router.post("/:id/delete", isLogged, async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    req.session.destroy(() => {
    res.redirect("/");
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
