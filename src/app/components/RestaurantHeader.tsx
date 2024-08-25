'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {}

const RestaurantHeader = (props: Props) => {
  const [details, setDetails]= useState('');
  const router = useRouter();
  const pathName = usePathname();
  useEffect(()=>{
    let data = localStorage.getItem("restaurantUser");
    if(!data && pathName=="/restaurant"){
      router.push("/restaurant");
    }else if(data && pathName=="/restaurant"){
      router.push("/restaurant/dashboard");
    }
    else{
      setDetails(JSON.parse(data))
    }
  },[]);

  const logout=()=>{
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  }
  return (
    <>
    <div>
      <nav className='bg-[#7D5A50] px-10'>
        <ul className='flex justify-end space-x-14'>
          <li className='flex text-2xl my-5 font-semibold text-white'><Link href="/">Home</Link></li>
          {
            details && details.username?
            <>
            <li><button className='flex text-2xl my-5 font-semibold text-white' onClick={logout}>Logout</button></li>
            <li className='flex text-2xl my-5 font-semibold text-white'><Link href="/">Profile</Link></li>
            </>
            :<li className='flex text-2xl my-5 font-semibold text-white'><Link href="/restaurant">Login/Signup</Link></li>
          }
        </ul>
      </nav>
    </div>
    </>
  )
}

export default RestaurantHeader