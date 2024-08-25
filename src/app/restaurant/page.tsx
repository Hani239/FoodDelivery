'use client'
import { useState } from "react";
import RestaurantLogin from "../components/RestaurantLogin";
import RestaurantSignUp from "../components/RestaurantSignUp";
import RestaurantHeader from "../components/RestaurantHeader";
import Footer from "../components/Footer";

const Restaurant = () => {
  const [login, setLogin] = useState(true)
  return (
    <div className="h-screen bg-[#FCDEC0]">
      <RestaurantHeader/>
      <div className="flex flex-col items-center justify-center bg-[#FCDEC0] py-10">
      {
        login ? <RestaurantLogin /> : <RestaurantSignUp />
      }
      <div className="flex justify-center m-4">
      <button className='flex border-0 cursor-pointer text-red-500 rounded ml-5' onClick={() => setLogin(!login)}>
        {login ? "Don't have account? SignUp" : "Already have account? Login"}
      </button>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Restaurant;