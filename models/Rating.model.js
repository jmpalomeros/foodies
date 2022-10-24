const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    restaurant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    recommendedDish: String
})

const Rating = mongoose.model("Rating", ratingSchema)
module.exports = Rating