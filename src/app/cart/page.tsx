"use client"
import React, { useState } from 'react'
import CustomerHeader from '../components/CustomerHeader'
import Footer from '../components/Footer'
import { DELIVERY_CHARGES, TAX } from '../lib/constant'
import { useRouter } from 'next/navigation'

type Props = {}

const Page = (props: Props) => {
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const router = useRouter();
    // const [total] = useState(() => cartStorage.length == 1 ? cartStorage[0].price : cartStorage.reduce((a, b) => {
    //     return a.price + b.price
    // }));       //reduce is use to add
    const [total] = useState(() => 
        cartStorage.length === 1 
            ? cartStorage[0].price 
            : cartStorage.reduce((acc, item) => acc + item.price, 0)
    );
    // console.log(total)
    const orderNow=()=>{
        if(JSON.parse(localStorage.getItem('user'))){
            router.push('/order')
        }
        else{
            router.push('/user-auth?order=true')        //if not login then it will redirect to login page and then after login it will bring back to order page
                                                        //here order is the order flag  which we get when prop pass from user-auth(login)
        }
    }
    return (
        <div className='bg-[#FCDEC0] min-h-screen pb-10'>
            {/* scrollbar-thin scrollbar-thumb-[#E8EEEF] scrollbar-hide overflow-hidden */}
            {/* <RestaurantHeader/> */}
            <CustomerHeader />
            <div className='m-5'>
                {
                    cartStorage.length > 0 ? cartStorage.map((item) => (
                        <div className='flex font-bold text-[#61463e] border-b-2 border-b-[#61463e] border-dashed p-5'>
                            <img src={item.img_path} alt={item.name} width={72} height={72} className="w-36 h-36 object-cover" />
                            <div className='pl-5 w-4/5'>
                                <div className='text-xl capitalize'>{item.name}</div>
                                <div className='font-normal text-base'>{item.description}</div>
                                <button className="border-2 border-dashed border-[#7D5A50] p-1 rounded-lg bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50] mt-2 mr-5" onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                                {/* <button className="border-2 border-dashed border-[#7D5A50] p-1 rounded-lg bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50] mt-2" onClick={() => addToCart(item)}>Add To Cart</button> */}
                            </div>
                            <div className='text-lg'>Price: ₹{item.price}</div>
                        </div>
                    ))
                        : <div className='text-3xl font-bold text-[#61463e] flex justify-center items-center mt-20'>No food Item Added for Now</div>
                }
            </div>
            <div className='m-5 flex'>
                <div className='flex flex-col justify-between items-center w-full'>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Food Charge : </div>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>₹{total}</div>
                    </div>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Tax : </div>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>₹{total * TAX / 100}</div>
                    </div>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Delivery Charges : </div>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>₹{DELIVERY_CHARGES}</div>
                    </div>
                    <div className='flex justify-between w-5/6'>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>Total Amount : </div>
                        <div className='text-xl capitalize font-bold text-[#61463e]'>₹{total + (total * TAX / 100) + DELIVERY_CHARGES}</div>
                    </div>
                </div>
                    <div className='flex justify-center items-center'>
                        <button className="border-2 border-dashed border-[#7D5A50] p-2 rounded-md bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50]" onClick={orderNow}>Order Now</button>
                    </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page