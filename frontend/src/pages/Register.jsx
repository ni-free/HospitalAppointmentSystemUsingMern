import React, { useState } from 'react'
import { useContext} from 'react'
import { Context } from '../main'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const Register = () => {
  const{isAuthenticated,setIsAuthenticated} =useContext(Context)
  const[firstName,setFirstName]=useState("")
  const[lastName,setLastName]=useState("")
  const[email,setEmail]=useState("")
  const[phone,setPhone]=useState("")
  const[gender,setGender]=useState("") 
  const[dob,setDob]=useState("")
  const[password,setPassword]=useState("")

  const navigate = useNavigate();
  const handleRegister =async (e)=>{
    e.preventDefault()
    try {
      await axios.post('http://localhost:4000/api/v1/user/patient/register',{email,password,firstName,lastName,gender,phone,dob},{withCredentials:"true" ,
    headers :{"Content-Type":"application/json"}})
    .then((res)=>{ 
      console.log(res.data.message)
      setEmail('')
    setPassword('')
  setFirstName('')
  setLastName('')
  setDob('')
  setGender('')
  setPhone('')
  setEmail('')
   
    navigate('/')}).catch((err)=>{
     toast(err.response.data.message)
    })
   
    } catch (error) {
    console.log(error);
    //toast.error(error.response.data.message)
    }
   }

  
  if(isAuthenticated)
     return <Navigate to={'/'} />
  return (
    <div className='container form-component register-form'>
      <h2>Register</h2>
      <p>Please Sign Up to Continue</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi recusandae laudantium enim, praesentium voluptates alias?</p>
      <form onSubmit={handleRegister}>
        <div>
          <input type="text" placeholder="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
         </div>
         <div>
         <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="text" placeholder="Phone no" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          </div>
         <div>
         <input type="text" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
         <input type="date" placeholder='Date of Birth' value={dob} onChange={(e)=>setDob(e.target.value)} />
         <select value={gender} placeholder="Selet Gender" onChange={(e)=>setGender(e.target.value)}>
         <option value="">Select Gender</option>
         <option value="Female">Male</option>
         <option value="Male">Female</option>
         <option value="Other">Other</option>
         </select>
         </div>
         <div style={{gap:"10px" , justifyContent:"flex-end" ,flexDirection:"row"}}>
          <p>Already Registered??</p>
          <Link to={"/Login"} style={{textDecoration:"none",alignItems:"center"}} >Login Now</Link>
         </div>
         <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        
      </form>
    </div>
  )
  }

export default Register
