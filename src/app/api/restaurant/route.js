//For Login/Signup
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import { connectionStr } from "@/app/lib/db"
//We can use instead
// const connectionStr="mongodb+srv://hani:hainRestaurant@cluster0.ar8inoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function GET() {
    try {
        await mongoose.connect(connectionStr, { useNewUrlParser: true });
        const data = await restaurantSchema.find();
        console.log(data);
        return NextResponse.json({ result: data })
        // return new NextResponse({ body: JSON.stringify({ result: true }), status: 200, headers: { "Content-Type": "application/json" }});
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse.error("Internal Server Error");
    }
}

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    if (payload.login) {
        //Use for login
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
        if(result){
            success=true
        }
    }
    else {
        //Use for Signup
        
        const restaurant = new restaurantSchema(payload)
        result = await restaurant.save();
        if(result){
            success=true
        }
    }
    // await mongoose.connect(connectionStr, { useNewUrlParser: true });

    console.log(payload);
    return NextResponse.json({ result, success })
}