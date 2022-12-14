const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      // required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // required: true,
      trim: true,
    },
    age: {
      type: Number,
      // required: false,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    }],
  },
  {
    //este segundo objeto ofrece listado de users con detalle de cuando se crearon y actualizaron
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
