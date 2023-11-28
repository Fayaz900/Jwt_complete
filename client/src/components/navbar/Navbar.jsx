import React from 'react'
import {Link, Outlet} from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <div>
    <div className='navbar'>
    <div className="links">
        <Link to="/">Login</Link>
        <Link to="/up">SignUp</Link>
    </div>

</div>
<Outlet />
</div>
  )
}

export default Navbar
