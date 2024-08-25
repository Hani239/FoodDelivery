import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import { mongoose } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    let queryParams =  request.nextUrl.searchParams
    // console.log(queryParams.get('location'))
    console.log(queryParams.get('restaurant'))
    let filter = {}
    if(queryParams.get("location")){
        let city = queryParams.get("location"); //this city name is the name which we have given in mongodb
        // filter.city=queryParams.get("location")      // this is case sensitive
        filter = {city:{$regex:new RegExp(city,'i')}}   //To make case insensitive
    }
    else if(queryParams.get("restaurant")){
        let username = queryParams.get("restaurant");
        filter = {username:{$regex:new RegExp(username,'i')}}
    }
    mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result = await restaurantSchema.find(filter)
    return NextResponse.json({success:true, result})
}