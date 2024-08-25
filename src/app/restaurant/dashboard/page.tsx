'use client'
import AddFoodItem from '@/app/components/AddFoodItem'
import FoodItemList from '@/app/components/FoodItemList'
import Footer from '@/app/components/Footer'
import RestaurantHeader from '@/app/components/RestaurantHeader'
import React, { useState } from 'react'

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false)
  return (
    <div className='bg-[#FCDEC0] min-h-screen'>
      <RestaurantHeader/>
      <div className=''>
        <button className='border-2 border-dashed border-[#7D5A50] p-2 rounded-lg bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50] m-2' onClick={() => setAddItem(true)}>Add Food</button>
        <button className='border-2 border-dashed border-[#7D5A50] p-2 rounded-lg bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50]' onClick={() => setAddItem(false)}>Dashboard</button>
        {
          addItem ? <AddFoodItem setAddItem ={setAddItem}/> : <FoodItemList/>
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Dashboard