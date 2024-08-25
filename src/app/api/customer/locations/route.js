import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";

export async function GET(){
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result =await restaurantSchema.find();
    result = result.map((item)=>item.city.charAt(0).toUpperCase()+item.city.slice(1));
    result = [...new Set(result.map((item)=>item))]
    return NextResponse.json({success:true,result})
}