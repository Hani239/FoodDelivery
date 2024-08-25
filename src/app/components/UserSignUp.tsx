'use client'
import React, { useState } from 'react'
import CustomerHeader from '../components/CustomerHeader'
import Footer from '../components/Footer'
import { useRouter } from 'next/navigation'

type Props = {}

const UserSignUp = (props: Props) => {
  const [username, setUsername]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignup = async () => {
    let response = await fetch('http://localhost:3000/api/user', {
      method: "POST",
      body: JSON.stringify({ username, email, password, phone, city, address })
    })
    response = await response.json();
    if (response.success) {
      const {result} = response;
      delete result.password;
      localStorage.setItem('user', JSON.stringify(result));
      if(props.redirect?.order){
        router.push('/order')
      }
      else{
        router.push("/");
      }
    }
    else {
      alert("Failed")
    }
    if (password !== c_password) {
      setPasswordError(true)
      return false
    }
    else {
      setPasswordError(false)
    }

    if (!username || !email || !password || !c_password || !phone || !city || !address) {
      setError(true)
      return false
    }
    else {
      setError(false)
    }
    console.log(username, email, password, c_password, phone, city, address)
  }
  return (
    <div className='bg-[#FCDEC0] min-h-screen'>
      <div className="flex flex-col items-center justify-center ">
        <div className="mb-8">
          <label className="flex font-bold text-xl text-[#7D5A50]">Username: </label>
          <input
            type="text"
            className="border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-96 border-[#7D5A50]"
            placeholder="Enter Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {
            error && !username && <div className='text-red-500'>Please Enter valid Name</div>
          }
        </div>
        <div className="mb-8">
          <label className="flex font-bold text-xl text-[#7D5A50]">Email: </label>
          <input
            type="email"
            // value={email}
            className="border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-96 border-[#7D5A50]"
            placeholder="Enter Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {
            error && !email && <div className='text-red-500'>Please Enter valid email</div>
          }
        </div>
        <div className="mb-8">
          <label className="flex font-bold text-xl text-[#7D5A50]">Password: </label>
          <input
            type="password"
            className="border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-96 border-[#7D5A50]"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {
            passwordError && <div className='text-red-500'>Password and Confirm Password not matched</div>
          }
          {
            error && !password && <div className='text-red-500'>Please Enter valid Password</div>
          }
        </div>
        <div className="mb-8">
          <label className="flex font-bold text-xl text-[#7D5A50]">Confirm Password: </label>
          <input
            type="password"
            className="border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-96 border-[#7D5A50]"
            placeholder="Enter Confirm Password"
            value={c_password}
            onChange={(event) => setC_password(event.target.value)}
          />
          {
            passwordError && <div className='text-red-500'>Password and Confirm Password not matched</div>
          }
          {
            error && !c_password && <div className='text-red-500'>Please Enter valid Confirm Password</div>
          }
        </div>
        <div className="mb-8">
          <label className="flex font-bold text-xl text-[#7D5A50]">Phone Number: </label>
          <input
            type="number"
            // value={email}
            className="border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-96 border-[#7D5A50]"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          {
            error && !phone && <div className='text-red-500'>Please Enter valid Phone number</div>
          }
        </div>
        <div className="mb-8">
          <label className="flex font-bold text-xl text-[#7D5A50]">Address: </label>
          <input
            type="text"
            className="border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-96 border-[#7D5A50]"
            placeholder="Enter Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          {
            error && !address && <div className='text-red-500'>Please Enter valid Address</div>
          }
        </div>
        <div className="mb-8">
          <label className="flex font-bold text-xl text-[#7D5A50]">City: </label>
          <input
            type="text"
            className="border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-96 border-[#7D5A50]"
            placeholder="Enter City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          {
            error && !city && <div className='text-red-500'>Please Enter valid City</div>
          }
        </div>
        <div className="">
          {/* <Create_Account text={'Sign in'} /> */}
          <button className="p-1 w-96 text-lg bg-[#B4846C] font-inter text-white border-2 border-dashed font-bold border-[#7D5A50] rounded-lg hover:bg-[#7D5A50]" onClick={handleSignup} >
            <div className="inline-block">User Sign up</div>
          </ button>
        </div>
      </div>
    </div>
  )
}

export default UserSignUp