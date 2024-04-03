import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const MessageForm = () => {
    const [firstName,setFirstName] =useState('')
    const [lastName,setLastName] =useState('')
    const [email,setEmail] =useState('')
    const [phone,setPhone] =useState('')
    const [message,setMessage] =useState('')
    const handleMessage =async(e)=>{
        e.preventDefault()
        console.log(firstName,lastName,email);
try {
  await  axios.post('http://localhost:4000/api/v1/message/send',{firstName,lastName,email,phone,message},{withCredentials:true ,
    headers:{"Content-Type":"application/json"}}).then((res)=>{toast.success(res.data.message);
    setFirstName("");
setLastName(""),
setEmail(""),
setMessage("")
setPhone("")
setMessage("")})
} catch (error) {
   toast.error(error.response.data.message)
  //console.log(error);
  
}
    }
  return (
    <div className='container form-component message-form'>
      <h2>Send us a Message</h2>
      <form onSubmit={handleMessage}>
        <div>
            <input type="text"  placeholder='first name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <input type="text"  placeholder='last name' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
           
        </div>
        <div>
        <input type='text'  placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="tex"  placeholder='Phone number' value={phone} onChange={(e)=>setPhone(e.target.value)} />
        </div>
        <textarea value={message} placeholder='Message' rows="7" onChange={(e)=>setMessage(e.target.value)}></textarea>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
          <img src="/Vector.png" alt="vector" />
      </form>
    </div>
  )
}

export default MessageForm
