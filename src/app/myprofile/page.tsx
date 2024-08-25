'use client'
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../components/CustomerHeader';
import Footer from '../components/Footer';

type Props = {}
const page = (props: Props) => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    getMyOrders()
  }, [])

  const getMyOrders = async () => {
    const userStorage= JSON.parse(localStorage.getItem('user'));
    let response = await fetch('http://localhost:3000/api/order?id='+userStorage._id)
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result)
    }
  }

  return (
    <div className='bg-[#FCDEC0] min-h-screen'>
      <CustomerHeader />
      <div className='flex flex-wrap gap-5 justify-around items-center mt-10 pb-10'>
      {
        myOrders.map((item)=>(
          <div className='w-80 bg-[#E5B299] rounded-lg p-5 cursor-pointer border-2 border-[#7D5A50]'>
            <div className='font-bold text-2xl'>Name: {item.data.username}</div>
            <div className='font-bold'>Amount: ₹{item.amount}</div>
            <div>City: {item.data.city}</div>
            <div>Status: {item.status}</div>
          </div>
        ))
      }
      </div>
      <Footer />
    </div>
  )
}

export default page;