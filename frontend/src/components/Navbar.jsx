import React, { useContext, useState  } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Context } from '../main'
import { toast } from 'react-toastify'
import { GiHamburgerMenu } from "react-icons/gi";
import axios from 'axios'

const Navbar = () => {
    const{isAuthenticated,setIsAuthenticated}=useContext(Context)
    const[show ,setShow] = useState(false)
    
    const navigateTo =useNavigate()
    const gotoLogin=()=>{
         navigateTo('/Login')
    }
    const handleLogout= async()=>{
        try {
            await axios.get("http://localhost:4000/api/v1/user/patient/logout",{withCredentials:true})
            .then((res)=>{
                toast.success(res.data.message);
                setIsAuthenticated(false)
            })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
  return (
    <>
    <nav className={'container'}>
       <div className='logo'>
        <img src="/logohos.png" alt="logo" className='logo-img' />
        </div>
       <div className={show? " navLinks showmenu":"navLinks"}>
            <div className="links">
                <Link to={"/"}>HOME</Link>
               
                {isAuthenticated?( <Link to={"/Appointment"}>APPOINTMENT</Link> ):('')}
                <Link to={"/About"}>ABOUT US</Link>
            </div>
            {isAuthenticated?( <button className='btn logoutBtn' onSubmit={handleLogout}>LOGOUT</button> ):( <button className='btn logoutBtn' onClick={gotoLogin} >LOGIN</button> )}
       </div>
       <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
    </nav>
    </>
  )
}

export default Navbar
