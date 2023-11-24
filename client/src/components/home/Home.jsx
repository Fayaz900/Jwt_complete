import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  const [user,setUser] = useState()
  const passRequest=async()=>{
      const res = await axios.get("http://localhost:8980/user/verify",{
        withCredentials:true,
      }).catch((error)=>{
        console.log(error);
      })
      const data = await res.data
      return data;
  }

  useEffect(()=>{
    passRequest().then((data)=>{
      setUser(data)
    })
  },[])
  console.log(user);
  return (
    <div>{user && <h1>{user.user.name}</h1>}</div>
  )
}

export default Home
