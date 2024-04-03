import React, { useContext, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Login = () => {
  const{isAuthenticated,setIsAuthenticated} =useContext(Context)
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[confirmPassword,setConfirmPassword]=useState("")
 const navigate= useNavigate()
 const handleLogin =async (e)=>{
  e.preventDefault()
  try {
    await axios.post('http://localhost:4000/api/v1/user/login',{email,password,confirmPassword,role:"Patient"},{withCredentials:"true" ,
  headers :{"Content-Type":"application/json"}})
  .then((res)=>{ setEmail('')
  setPassword('')
  setConfirmPassword('')
  setIsAuthenticated(true)
  toast.success(res.data.message)
  navigate('/')}).catch((err)=>{
   toast(err.response.data.message)
  })
 
  } catch (error) {
  console.log(error.response);
  //toast.error(error.response.data.message)
  }
 }
if(isAuthenticated)
{
  return <Navigate to={"/"}/>
}

  return (
    <div className='container form-component login-form'>
      <h2>Log In</h2>
      <p>Please Login to Continue</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores laborum officiis ipsa non? Iusto, quasi!</p>
      <form onSubmit={handleLogin}>
        <input type="text" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}  />
        <input type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}  autoComplete="new-password"/>
         <input type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}   autoComplete="new-password"/>
         <div style={{gap:"10px" , justifyContent:"flex-end" ,flexDirection:"row"}}>
          <p>Not Registered</p>
          <Link to={"/Register"} style={{textDecoration:"none",alignItems:"center"}} >Register Now</Link>
         </div>
         <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
      </form>
    </div>

  )
}

export default Login
