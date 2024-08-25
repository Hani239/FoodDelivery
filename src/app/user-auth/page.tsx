'use client'
import React, { useState } from 'react'
import CustomerHeader from '../components/CustomerHeader'
import Footer from '../components/Footer'
import UserSignUp from '../components/UserSignUp'
import UserLogin from '../components/UserLogin'

type Props = {}

const UserAuth = (props: Props) => {
  const [login, setLogin] = useState(true);
  console.log("order flag", props)

  return (
    <div className="h-screen bg-[#FCDEC0]">
      <CustomerHeader />
      
      <div className="flex flex-col items-center justify-center bg-[#FCDEC0] py-10">
        <div className='font-bold text-4xl text-[#7D5A50] mb-8'>
          {login ? 'User Login' : 'User Signup'}
        </div>
        {login ? <UserLogin redirect={props.searchParams} /> : <UserSignUp redirect={props.searchParams}/>}
        {/* <UserSignUp /> */}
        <div className="flex justify-center m-4">
      <button className='flex border-0 cursor-pointer text-red-500 rounded ml-5' onClick={() => setLogin(!login)}>
        {login ? "Don't have account? SignUp" : "Already have account? Login"}
      </button>
      </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default UserAuth
