import { useContext, useEffect, useState } from 'react'

import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'
import Appointment from './pages/Appointment'
import Aboutus from './pages/Aboutus'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import { Context } from './main'
import Footer from './components/Footer'

function App() {
  
  const {isAuthenticated,setIsAuthenticated ,setUser} =useContext(Context)
useEffect(()=>{
 const fetchUser =async()=>{
  try {
    const response=  await axios.get("http://localhost:4000/api/v1/user/patient/me",{withCredentials:true});
    setIsAuthenticated(true)
    setUser(response.data.user)
  } catch (error) {
    setIsAuthenticated(false)
    setUser({});
  }
 }
},[isAuthenticated])
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element= {<Home/>} />
         <Route path='/Appointment' element={<Appointment/>} />
         <Route path='/About' element={< Aboutus/>} />
         <Route path='/Register' element={<Register/>} />
         <Route path='/Login' element={<Login/>} />
      </Routes>
      <Footer/>
      <ToastContainer position='top-center'/>
    </Router>
     </>
  )
}

export default App
