import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {}

const CustomerHeader = (props: Props) => {
  const userStorage=JSON.parse(localStorage.getItem('user'));
  const cartStorage = JSON.parse(localStorage.getItem('cart'));
  const router = useRouter();
  const [user,setUser]=useState(userStorage?userStorage:undefined);
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);
  console.log(userStorage);

  useEffect(() => {
    console.log(props);
    if (props.cartData) {
      console.log(props);
      if (cartNumber) {
        if (cartItem[0].resto_id != props.cartData.resto_id) {
          localStorage.removeItem('cart');
          setCartNumber(1);
          setCartItem([props.cartData])
          localStorage.setItem('cart', JSON.stringify([props.cartData]))
        }
        else {
          let localCartItem = cartItem;
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)))    //shallow copy deep copy
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1)
          localStorage.setItem('cart', JSON.stringify(localCartItem))
        }
      }
      else {
        setCartNumber(1);
        setCartItem([props.cartData])
        localStorage.setItem('cart', JSON.stringify([props.cartData]))
      }
    }
  }, [props.cartData])

  useEffect(() => {
    if (props.removeCartData) {
      let localCartItem = cartItem.filter((item) => {
        return item._id != props.removeCartData
      });
      setCartItem(localCartItem);
      setCartNumber(cartNumber-1);
      localStorage.setItem('cart', JSON.stringify(localCartItem))
      if(localCartItem.length==0){
        localStorage.removeItem('cart')
      }
    }
  }, [props.removeCartData])

  useEffect(()=>{
    if(props.removeCartData){
      setCartItem([]);
      setCartNumber(0);
      localStorage.removeItem('cart')
    }
  },[props.removeCartData])

  const logout=()=>{
    localStorage.removeItem('user');
    router.push('/user-auth') //Here this is not working so i have directly added path to link tag in logout
  }
  return (
    <div>
      <nav className='bg-[#7D5A50] px-10'>
        <ul className='flex justify-end space-x-14'>
          <li className='flex text-2xl my-5 font-semibold text-white'><Link href="/">Home</Link></li>
          {
            user?
            <>
            <li className='flex text-2xl my-5 font-semibold text-white'><Link href="/myprofile">{user?.username}</Link></li>
            <li className='flex text-2xl my-5 font-semibold text-white'><Link href="/user-auth" onClick={logout}>Logout</Link></li>
            </>:
            <>
            <li className='flex text-2xl my-5 font-semibold text-white'><Link href="/">Login</Link></li>
            <li className='flex text-2xl my-5 font-semibold text-white'><Link href="/user-auth">SignUp</Link></li>
            </>
          }
          <li className='flex text-2xl my-5 font-semibold text-white'><Link href={cartNumber?"/cart":"#"}>Cart({cartNumber ? cartNumber : 0})</Link></li>
          <li className='flex text-2xl my-5 font-semibold text-white'><Link href="/">Add Restaurant</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default CustomerHeader