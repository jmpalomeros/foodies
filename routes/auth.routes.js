const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

//SIGN UP ROUTE
// GET "/auth/signup" => PARA RENDERIZAR PAGINAS DE REGISTRO
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

// POST "/auth/signup" => PARA CREAR USUARIO EN LA BASE DE DATOS

router.post("/signup", async (req, res, next) => {
  const { username, email, password, age, city, image } = req.body;

  console.log(req.body);

  if (username === "" || email === "" || password === "") {
    res.render("auth/signup.hbs", {
      errorMessage: "Must complete: username, email & password",
    });
    return;
  }
  //requisitos contraseña: 1 mayuscula, 1 numero y un signo
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res.render("auth/signup.hbs", {
      errorMessage: "Invalid password",
    });
    return;
  }
  //requisitos email
  const mailRegex = /[\w|.|-]*@\w*\.[\w|.]*/g;
  if (mailRegex.test(email) === false) {
    res.render("auth/signup.hbs", {
      errorMessage: "Invalid email.",
    });
    return;
  }

  try {
    const foundUser = await User.findOne({ username: username });

    if (foundUser !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "Username not available",
      });
      return;
    }

    const foundMail = await User.findOne({ email: email });
    if (foundMail !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "Registered email ",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let newUser = {
      username: username,
      email: email,
      password: hashPassword,
      age: age,
      city: city,
      image: image,
    };

    await User.create(newUser);
    res.redirect("/restaurant"); //! redirigir a middle screen - listado de restaurantes
  } catch (err) {
    next(err);
  }
});

// GET "/auth/login" => RENDERIZA FORMULARIO DE ACCESO

router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

// POST "/auth/login" => PARA VALIDAR LOS DATOS DEL USUARIO EN LA BS

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  // Validamos campos completos en backend
  if (username === "" || password === "") {
    res.render("auth/login.hbs", {
      errorMessage: "Fields incomplete",
    });
    return;
  }

  try {
    const foundUser = await User.findOne({ username: username });
    if (foundUser === null) {
      res.render("auth/login.hbs", {
        errorMessage: "Wrong data",
      });
      return;
    }

    const passwordValid = await bcrypt.compare(password, foundUser.password);
    console.log("es valido", passwordValid);
    if (passwordValid === false) {
      res.render("auth/login.hbs", {
        errorMessage: "Wrong data",
      });
      return;
    }
    //creación de la sesion activa
    req.session.logeddUser = foundUser;
    req.session.save(() => {
      res.redirect("/restaurant");
    });
  } catch (error) {
    next(error);
  }
});

// GET ("/auth/logout") => ruta para deslogar
router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.render("auth/logout.hbs");
    //res.redirect("/");
  });
});

module.exports = router;
