import React, { useState } from 'react'
import {Link, Outlet} from 'react-router-dom';
import './Navbar.css'
import {useSelector} from 'react-redux'
import { authActions } from '../../store';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function Navbar() {
  const [value,setValue]=useState();
  const dispatch = useDispatch();
  const isLoggedIn = 
  useSelector((state)=> state.isLoggedIn)
  const request=async()=>{
    const response = await axios.post('http://localhost:8980/user/logout',null,{
      withCredentials: true,
    })
    if(response.status==200){
      return response
    }
    return new Error("Something went wrong!")
  }
  const logoutHandler=()=>{
    request().then(()=>{
      dispatch(authActions.logout)
    })
  }
  return (
    <div>
    <div className='navbar'>
    <div className="links">
    {!isLoggedIn &&
      (<>
      <Link to="/">Login</Link>
        <Link to="/up">SignUp</Link>
      </>)
    }
        
        {isLoggedIn &&
        <Link to='/' onClick={logoutHandler}>Log Out</Link>
        }
    </div>

</div>
<Outlet />
</div>
  )
}

export default Navbar
