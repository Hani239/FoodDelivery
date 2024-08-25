'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {
    params: any;
}

const EditFoodItem = (props: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    handleLoadFoodItem();
  },[])

  const handleLoadFoodItem = async()=>{
    let response = await fetch('http://localhost:3000/api/restaurant/foods/edit/' + props.params.id)
    response = await response.json();
    if(response.success){
        console.log(response.result)
        setName(response.result.name)
        setPrice(response.result.price)
        setPath(response.result.img_path)
        setDescription(response.result.description)
    }
  }

  //API call
  const handleEditFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return false;   //Api further call na thay etle
    }
    else {
      setError(false);
    }
    console.log(name, price, path, description);
    
    let response = await fetch('http://localhost:3000/api/restaurant/foods/edit/' + props.params.id,{
        method:'PUT',
        body: JSON.stringify({name, price, img_path:path, description}) //see name tags from Schema
    });
    response = await response.json();
    if(response.success){
        // alert("Data has been updated successfully")
        router.push("../dashboard")
    }
    else{
        alert("Data is not updated please try again")
    }
    
  }
  return (
    <div className='flex flex-col justify-center items-center bg-[#FCDEC0] h-screen'>
      <h1 className='text-2xl font-bold m-5 font-playpen text-[#7D5A50]'>Edit Food Item</h1>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <div className='flex flex-col'>
          <input
            type='text'
            placeholder='Enter Food Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-80 border-[#7D5A50]'
          />
          {error && !name && <span className='text-red-500 px-2'>Please Enter valid name</span>}
        </div>
        <div className='flex flex-col'>
          <input
            type='text'
            placeholder='Enter Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-80 border-[#7D5A50]'
          />
          {error && !price && <span className='text-red-500 px-2'>Please Enter valid price</span>}
        </div>
        <div className='flex flex-col'>
          <input
            type='text'
            placeholder='Enter Image Path'
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className='border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-80 border-[#7D5A50]'
          />
          {error && !path && <span className='text-red-500 px-2'>Please Enter valid path</span>}
        </div>
        <div className='flex flex-col'>
          <input
            type='text'
            placeholder='Enter Food Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-80 border-[#7D5A50]'
          />
          {error && !description && <span className='text-red-500 px-2'>Please Enter valid description</span>}
        </div>
        <button className='border-2 border-dashed border-[#7D5A50] p-2 rounded-lg bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50]' onClick={handleEditFoodItem}>Update Food Item</button>
        <button className='border-2 border-dashed border-[#7D5A50] p-2 rounded-lg bg-[#B4846C] text-white font-bold hover:bg-[#7D5A50]' onClick={()=>router.push('../dashboard')}>Back to Food Item List</button>
      </div>
    </div>
  )
}

export default EditFoodItem