// import mongoose from "mongoose";
const mongoose= require("mongoose");

const userModel = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    phone:String,
    city:String,
    address:String
});

export const userSchema = mongoose.models.users
|| mongoose.model("users", userModel);