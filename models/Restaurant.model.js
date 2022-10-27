const {Schema, model} = require("mongoose");
const styleList = require("../utils/styleList.js")

const restaurantSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    location: {
        type: String,
        required: true
    },
    style:{
        type:String,
        enum: styleList, 
        required: true,
        lowercase: true
    } ,
    mainDish: {
        type: String 
    }, 
    image: {
        type: String,
    },
},
{
    timestamps:true
})
const Restaurant = model("Restaurant", restaurantSchema)
module.exports = Restaurant