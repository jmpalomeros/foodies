const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const profileRoutes = require("./profile.routes")
router.use("/profile", profileRoutes)

const restaurantRoutes = require("./restaurant.routes")
router.use("/restaurant", restaurantRoutes)

const ratingRoutes = require("./rating.routes")
router.use("/rating", ratingRoutes)
module.exports = router;
