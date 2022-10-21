const {Schema, model} = require("mongoose");

const restaurantSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    location: String,
    stile: String,
    mainDish: String
},
{
    timestamps:true
})
const Restaurant = model("Restaurant", restaurantSchema)
module.exports = Restaurant