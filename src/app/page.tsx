'use client'
import React, { useEffect, useState } from 'react'
import RestaurantHeader from './components/RestaurantHeader'
import CustomerHeader from './components/CustomerHeader'
import Footer from './components/Footer'
import { useRouter } from 'next/navigation'

type Props = {}

const Home = (props: Props) => {
  const [locations, setLocations] = useState([])
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, [])

  const loadLocations = async () => {
    let response = await fetch('http://localhost:3000/api/customer/locations');
    response = await response.json()
    if (response.success) {
      setLocations(response.result)
    }
  }

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer"
    if (params?.location) {
      url = url + "?location=" + params.location
    }
    else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant
    }
    else { }
    let response = await fetch(url);
    response = await response.json()
    if (response.success) {
      setRestaurants(response.result)
    }
  }

  console.log(restaurants);

  const handleListItem = (item) => {
    setSelectedLocation(item)
    setShowLocation(false)
    loadRestaurants({ location: item })
  }

  const clearSelection = () => {
    setSelectedLocation('')
    setShowLocation(false)
    loadRestaurants();
  }
  return (
    <div className='bg-[#FCDEC0] min-h-screen'>
      {/* <RestaurantHeader/> */}
      <CustomerHeader />
      <div className='main-page-banner p-10 h-80 flex flex-col gap-9 justify-center items-center'>
        <div className='text-5xl text-white font-bold'>Food Delivery App</div>
        <div className='flex flex-col md:flex-row gap-3 w-full max-w-md md:max-w-none'>
          <div className='relative w-full'>
            {/* Dropdown */}
            <input
              type='text'
              className='w-full border-2 p-2 rounded-md text-[#7D5A50] font-semibold border-[#7D5A50] hover:cursor-pointer'
              value={selectedLocation}
              placeholder='Select Place'
              onClick={() => setShowLocation(!showLocation)}
              readOnly
            />
            {selectedLocation && (
              <button
                className='absolute right-2 top-2 text-[#7D5A50] font-bold'
                onClick={clearSelection}
              >
                X
              </button>
            )}
            {showLocation && (
              <ul className='location-list bg-white absolute top-full left-0 right-0 border border-[#7D5A50] max-h-40 overflow-y-auto scrollbar-hide'>
                {
                  locations.map((item) => (
                    <li
                      key={item}
                      onClick={() => handleListItem(item)}
                      className='p-2 hover:bg-gray-200 cursor-pointer'
                    >
                      {item}
                    </li>
                  ))
                }
              </ul>
            )}
          </div>
          {/* Search Bar */}
          <input
            type='text'
            className='w-full border-2 p-2 rounded-md text-[#7D5A50] font-semibold border-[#7D5A50]'
            placeholder='Enter Food or Restaurant'
            onChange={(event) => loadRestaurants({ restaurant: event.target.value })}
          />
        </div>
      </div>
      <div className='flex flex-wrap gap-5 justify-around items-center mt-10 pb-10'>
        {
          restaurants.map((item) => (
            <div
              key={item.id}
              className='w-80 bg-[#E5B299] rounded-lg p-5 cursor-pointer border-2 border-[#7D5A50]'
              onClick={() => router.push('explore/' + item.username + "?id=" + item._id)}
            >
              <div className='font-bold text-2xl'>{item.username}</div>
              <div className=''>Contact: {item.phone}</div>
              <div>{item.city}</div>
              <div>{item.email}</div>
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  )
}

export default Home
