"use client"
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../components/CustomerHeader'
import Footer from '../components/Footer'
import { DELIVERY_CHARGES, TAX } from '../lib/constant'
import { useRouter } from 'next/navigation'

type Props = {}

const Page = (props: Props) => {
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('user')));
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    // const [total] = useState(() => cartStorage.length == 1 ? cartStorage[0].price : cartStorage.reduce((a, b) => {
    //     return a.price + b.price
    // }));       //reduce is use to add
    const [total] = useState(() => 
        cartStorage?.length === 1 
            ? cartStorage[0].price 
            : cartStorage?.reduce((acc, item) => acc + item.price, 0)
    );

    useEffect(()=>{
        if(!total){
            router.push('/')
        }
    },[total])

    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();
    // console.log(total)
    const totalAmt = total + (total * TAX / 100) + DELIVERY_CHARGES

    const orderNow=async()=>{
        let user_id=JSON.parse(localStorage.getItem('user'))._id;   //to check exact name if id then go to Inspect->Application->user
        let cart=JSON.parse(localStorage.getItem('cart'));
        let foodItemIds= cart.map((item)=>item._id).toString();               //foodItemIds name should be same as we wrote in model
        let deliveryBoy_id = 'rightNowItsStaticIdForLaterUse';
        let resto_id=cart[0].resto_id;      //we want to get resto_id from cart     //also we wrote cart[] to get the multiple value which is inside it
        let collection = {
            user_id,
            resto_id,
            foodItemIds,
            // deliveryBoy_id,
            status:'confirm',
            amount: totalAmt,
        }
        let response = await fetch('http://localhost:3000/api/order',{
            method:'POST',
            body: JSON.stringify(collection)
        });
        console.log(collection);

        // console.log(response);
        response = await response.json();
        if(response.success){
            alert("Order Confirmed");
            setRemoveCartData(true);
            router.push('/myprofile')
        }
        else{
            alert("Order Failed")
        }
        // console.log(collection);
    }
    return (
        <div className='bg-[#FCDEC0] min-h-screen pb-10'>
            {/* scrollbar-thin scrollbar-thumb-[#E8EEEF] scrollbar-hide overflow-hidden */}
            {/* <RestaurantHeader/> */}
            <CustomerHeader removeCartData={removeCartData}/>
        
            <div className='m-5 flex'>
                <div className='flex flex-col justify-between items-center w-full'>
                    <div className='text-3xl capitalize font-bold text-[#61463e] p-4 w-full underline'>User Details :</div>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Name : </div>
                        <div className='text-xl capitalize font-semibold text-[#61463e]'>{userStorage.username}</div>
                    </div>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Address : </div>
                        <div className='text-xl capitalize font-semibold text-[#61463e]'>{userStorage.address}</div>
                    </div>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Phone no. : </div>
                        <div className='text-xl capitalize font-semibold text-[#61463e]'>{userStorage.phone}</div>
                    </div>


                    <div className='text-3xl capitalize font-bold text-[#61463e] p-4 w-full underline'>Amount Details :</div>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Tax : </div>
                        <div className='text-xl capitalize font-semibold text-[#61463e]'>₹{total * TAX / 100}</div>
                    </div>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Delivery Charges : </div>
                        <div className='text-xl capitalize font-semibold text-[#61463e]'>₹{DELIVERY_CHARGES}</div>
                    </div>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Total Amount : </div>
                        <div className='text-xl capitalize font-semibold text-[#61463e]'>₹{totalAmt}</div>  
                        {/* total amount formula is written above */}
                    </div>

                    
                    <div className='text-3xl capitalize font-bold text-[#61463e] p-4 w-full underline'>Payment Method :</div>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Cash on Delivery : </div>
                        <div className='text-xl capitalize font-semibold text-[#61463e]'>₹{totalAmt}</div>
                    </div>
                </div>
                    
            </div>
            <div className='flex justify-end items-center mr-32'>
                        <button className="border-2 border-dashed border-[#7D5A50] p-2 py-4 rounded-md bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50]" onClick={orderNow}>Place your order now</button>
                    </div>
            <Footer />
        </div>
    )
}

export default Page