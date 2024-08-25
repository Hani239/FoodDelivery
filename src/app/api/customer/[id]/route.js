import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import { foodSchema } from "@/app/lib/foodsModel";
import { mongoose } from "mongoose";
const { NextResponse } = require("next/server");

export async function GET(request, content){
    console.log(content.params.id);
    const id = content.params.id;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const details = await restaurantSchema.findOne({_id:id})
    const foodItems = await foodSchema.find({resto_id:id});
    return NextResponse.json({success:true,details, foodItems})
}