import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {}

const UserLogin = (props: Props) => {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin=async ()=>{
    console.log(email,password);
    if(!email || !password){
      setError(true)
      return false
    }
    else{
      setError(false)
    }

    let response = await fetch('http://localhost:3000/api/user/login',{
      method: "POST",
      body: JSON.stringify({email, password, login:true})
    });
    response = await response.json();
    if(response.success){
      const {result} = response;
      delete result.password;
      localStorage.setItem("user",JSON.stringify(result)); 
      if(props.redirect?.order){
        router.push('/order')
      }
      else{
        router.push("/");
      }
      alert("Login Successfull")
    }else{
      alert("Login Failed")
    }
  }

  
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8">
          <label className="flex font-bold text-xl text-[#7D5A50]">Email: </label>
          <input
            type="email"
            // value={email}
            // className="flex border-2 w-96 p-1"
            className="border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-96 border-[#7D5A50]"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          {
            error && !email && <div className='text-red-500'>Please Enter valid email</div>
          }
        </div>
        <div className="mb-8">
          <label className="flex font-bold text-xl text-[#7D5A50]">Password: </label>
          <input
            type="password"
            // value={email}
            // className="flex border-2 w-96 p-1"
            className="border-2 p-2 rounded-md text-[#7D5A50] font-semibold w-96 border-[#7D5A50]"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          {
            error && !password && <div className='text-red-500'>Please Enter valid Password</div>
          }
        </div>
        <div className="">
          {/* <Create_Account text={'Sign in'} /> */}
          <button className="p-1 w-96 text-lg bg-[#B4846C] font-inter text-white border-2 border-dashed font-bold border-[#7D5A50] rounded-lg hover:bg-[#7D5A50] " >
            <div className="inline-block" onClick={handleLogin}>Log in</div>
          </button>
        </div>
      </div>
    </div>   
  )
}

export default UserLogin