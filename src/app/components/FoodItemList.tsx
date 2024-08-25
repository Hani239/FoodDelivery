import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {}

const FoodItemList = (props: Props) => {
    const [foodItems, setFoodItems] = useState([]);
    const router = useRouter();
    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        const resto_id = restaurantData._id;
        let response = await fetch("http://localhost:3000/api/restaurant/foods/" + resto_id);
        response = await response.json();
        if (response.success) {
            setFoodItems(response.result)
        } else {
            alert("Food Item List Not Loading")
        }
        // if (response) {
        //     console.log(response);
        // }
    }

    const deleteFoodItem = async (id) => {
        let response = await fetch('http://localhost:3000/api/restaurant/foods/' + id, {
            method: 'delete'
        });
        response = await response.json();
        if (response.success) {
            loadFoodItems();
        }
        else {
            alert("Food Item not deleted")
        }
    }
    return (
        <div>
            {/* <thead>
                <tr>
                    <td>S.N</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Description</td>
                    <td>Image</td>
                    <td>Operations</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Pizza</td>
                    <td>300</td>
                    <td>Best Seller Pizza</td>
                    <td>Image</td>
                    <td>
                        <button className='border-2 border-[#7D5A50] px-2 mx-1 w-20 rounded-md bg-[#B4846C] text-white font-semibold'>Delete</button>
                        <button className='border-2 border-[#7D5A50] px-2 mx-1 w-20 rounded-md bg-[#B4846C] text-white font-semibold'>Edit</button>
                    </td>
                </tr>
            </tbody> */}



            {/* <div className="grid grid-cols-6 border-collapse border border-[#7D5A50] m-5">
                <div className="font-bold p-2 border-2 border-[#7D5A50]">S.N</div>
                <div className="font-bold p-2 border-2 border-[#7D5A50]">Name</div>
                <div className="font-bold p-2 border-2 border-[#7D5A50]">Price</div>
                <div className="font-bold p-2 border-2 border-[#7D5A50]">Description</div>
                <div className="font-bold p-2 border-2 border-[#7D5A50]">Image</div>
                <div className="font-bold p-2 border-2 border-[#7D5A50]">Operations</div>
                {
                    foodItems && foodItems.map((item, key) => (

                        <div key={key}>
                            <div className="p-2 border-2 border-[#7D5A50]">{key + 1}</div>
                            <div className="p-2 border-2 border-[#7D5A50]">{item.name}</div>
                            <div className="p-2 border-2 border-[#7D5A50]">{item.price}</div>
                            <div className="p-2 border-2 border-[#7D5A50]">{item.description}</div>
                            <div className="p-2 border-2 border-[#7D5A50]"><Image src={item.img_path} alt={'a'} width={72} height={72} className='w-36 h-36 object-cover' /></div>
                            <div className="p-2 border-2 border-[#7D5A50]">
                                <button className='border-2 border-[#7D5A50] px-2 mx-1 w-20 rounded-md bg-[#B4846C] text-white font-semibold hover:bg-[#7D5A50]' onClick={() => deleteFoodItem(item._id)}>Delete</button>
                                <button className='border-2 border-[#7D5A50] px-2 mx-1 w-20 rounded-md bg-[#B4846C] text-white font-semibold hover:bg-[#7D5A50]' onClick={() => router.push('dashboard/' + item._id)}>Edit</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div> */}


            <div className="p-5">
                <table className="table-auto border-collapse border border-[#7D5A50] w-full">
                    <thead>
                        <tr>
                            <th className="p-2 border-2 border-[#7D5A50]">S.N</th>
                            <th className="p-2 border-2 border-[#7D5A50]">Name</th>
                            <th className="p-2 border-2 border-[#7D5A50]">Price</th>
                            <th className="p-2 border-2 border-[#7D5A50]">Description</th>
                            <th className="p-2 border-2 border-[#7D5A50]">Image</th>
                            <th className="p-2 border-2 border-[#7D5A50]">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodItems && foodItems.map((item, key) => (
                            <tr key={key}>
                                <td className="p-2 border-2 border-[#7D5A50]">{key + 1}</td>
                                <td className="p-2 border-2 border-[#7D5A50]">{item.name}</td>
                                <td className="p-2 border-2 border-[#7D5A50]">{item.price}</td>
                                <td className="p-2 border-2 border-[#7D5A50]">{item.description}</td>
                                <td className="p-2 border-2 border-[#7D5A50]"><Image src={item.img_path} alt={item.name} width={72} height={72} className="w-36 h-36 object-cover" /></td>                                                                   
                                <td className="p-2 border-2 border-[#7D5A50]">
                                    <button className="border-2 border-[#7D5A50] px-2 mx-1 w-20 rounded-md bg-[#B4846C] text-white font-semibold hover:bg-[#7D5A50]" onClick={() => deleteFoodItem(item._id)}>Delete</button>
                                    <button className="border-2 border-[#7D5A50] px-2 mx-1 w-20 rounded-md bg-[#B4846C] text-white font-semibold hover:bg-[#7D5A50]" onClick={() => router.push('dashboard/' + item._id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FoodItemList