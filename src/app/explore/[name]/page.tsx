"use client"
import CustomerHeader from '@/app/components/CustomerHeader'
import Footer from '@/app/components/Footer'
import React, { useEffect, useState } from 'react'

type Props = {
  params: any
}

const Page = (props: Props) => {
  const name = props.params.name
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);   //blank array [] bcoz multiple details aavse
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
  const [cartIds, setCartIds] = useState(cartStorage?() => cartStorage.map((item) => {
    return item._id;
  }):[]);

  const [removeCartData,setRemoveCartData] = useState()

  useEffect(() => {
    loadRestaurantDetails();
  }, [])

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;
    let response = await fetch("http://localhost:3000/api/customer/" + id)
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details)
      setFoodItems(response.foodItems)
    }
  }
  
  const addToCart = async (item) => {
    setCartData(item);
    let localCartIds = cartIds;
    localCartIds.push(item._id);
    setCartIds(localCartIds)
    setRemoveCartData();
  }

  const removeFromCart = async(id) =>{
    setRemoveCartData(id);
    var localIds = cartIds.filter(item=>item!=id);
    setCartData()
    setCartIds(localIds)
  }

  return (
    <div className='bg-[#FCDEC0] min-h-screen pb-10'>
      {/* scrollbar-thin scrollbar-thumb-[#E8EEEF] scrollbar-hide overflow-hidden */}
      {/* <RestaurantHeader/> */}
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className='main-page-banner p-10 h-80 flex flex-col gap-9 justify-center items-center '>
        <div className='text-5xl text-white font-bold'>{decodeURI(name)}</div>    {/* decodeURI is use to display same name with space and not with %20 eg. Iskon Gathiya --> X Iskon%20Gathiya */}
      </div>
      <div className='flex font-bold text-xl text-[#61463e] justify-between p-5 bg-[#E5B299]'>
        <div>Contact: {restaurantDetails?.phone}</div>
        <div className='capitalize'>City: {restaurantDetails?.city}</div>
        <div>Email: {restaurantDetails?.email}</div>
      </div>
      <div className='m-5'>
        {
          foodItems.length > 0 ? foodItems.map((item) => (
            <div className='flex font-bold text-[#61463e] border-b-2 border-b-[#61463e] border-dashed p-5'>
              <img src={item.img_path} alt={item.name} width={72} height={72} className="w-36 h-36 object-cover" />
              <div className='pl-5'>
                <div className='text-xl capitalize'>{item.name}</div>
                <div className='text-lg'>₹{item.price}</div>
                <div className='font-normal text-base'>{item.description}</div>

                {
                  cartIds.includes(item._id) ?
                    <button className="border-2 border-dashed border-[#7D5A50] p-1 rounded-lg bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50] mt-2 mr-5" onClick={()=>removeFromCart(item._id)}>Remove From Cart</button>
                    :<button className="border-2 border-dashed border-[#7D5A50] p-1 rounded-lg bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50] mt-2" onClick={() => addToCart(item)}>Add To Cart</button>
                }
                {/* <button className="border-2 border-dashed border-[#7D5A50] p-1 rounded-lg bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50] mt-2" onClick={() => addToCart(item)}>Add To Cart</button> */}
              </div>
            </div>
          ))
            : <div className='text-3xl font-bold text-[#61463e] flex justify-center items-center mt-20'>No food Item Added for Now</div>
        }
      </div>
      <Footer />
    </div>
  )
}

export default Page