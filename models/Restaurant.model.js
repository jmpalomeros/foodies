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
    location: {
        type: String,
        required: true
    },
    style:{
        type:String,
        enum: ["italiana", "americana", "japonesa", "china", "india", "peruana", "venezolana"], 
        required: true,
        lowercase: true
    } ,
    mainDish: {
        type: String 
    }, 
    image: {
        type: String,
        required: false  
    },
},
{
    timestamps:true
})
const Restaurant = model("Restaurant", restaurantSchema)
module.exports = Restaurant