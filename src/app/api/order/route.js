import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";

export async function POST(request) {
    let payload = await request.json();
    let success= false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const orderObj = new orderSchema(payload);
    const result = await orderObj.save();
    if(result){
        success=true;
    }
    console.log(payload);
    return NextResponse.json({ result, success })
}

export async function GET(request){
    const userId= request.nextUrl.searchParams.get('id')
    // let result = userId;
    let success=false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result= await orderSchema.find({user_id:userId});
    if(result){
        let restoData = await Promise.all(
            result.map(async (item)=>{
                let restoInfo={};
                restoInfo.data = await restaurantSchema.findOne({ _id : item.resto_id})
                restoInfo.amount=item.amount;
                restoInfo.status=item.status;
                return restoInfo;
            })
        )
        result = restoData;
        success=true;
    }
    return NextResponse.json({result, success})
}

// export async function GET(request) {
//     const userId = request.nextUrl.searchParams.get('id');
//     let success = false;  // Initialize success here
//     let result = [];

//     try {
//         await mongoose.connect(connectionStr, { useNewUrlParser: true });
//         result = await orderSchema.find({ user_id: userId });

//         if (result.length > 0) {
//             const restoData = await Promise.all(
//                 result.map(async (item) => {
//                     const restoInfo = {};
//                     restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id });
//                     return restoInfo;
//                 })
//             );
//             result = restoData;
//             success = true;
//         }
//     } catch (error) {
//         console.error('Error fetching orders or restaurant info:', error);
//     }

//     return NextResponse.json({ success, result });
// }
