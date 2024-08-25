// import mongoose from "mongoose";
const mongoose= require("mongoose");

const restaurantModel = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    phone:String,
    city:String
});

export const restaurantSchema = mongoose.models.restaurants
|| mongoose.model("restaurants", restaurantModel);