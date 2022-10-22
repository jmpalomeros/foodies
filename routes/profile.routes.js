const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const { isLogged } = require("../middlewares/auth.middlewares");

//GET "/profile"=> ruta donde el usuario puede ver su perfil
router.get("/", isLogged, async (req, res, next) => {
  try {
    console.log("usuario activo", req.session.loggedUser);
    const activeSession = await User.findById(req.session.loggedUser._id);
    res.render("profile/my-profile.hbs", {
      activeSession,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
