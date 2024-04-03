import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
// appointmentDate,
//         department,
//         doctor_firstname,
//         doctor_lastname,
//         hasVisited,
        
//         Address
const AppointmentForm = () => {
    const navigate =useNavigate()
    //const{isAuthenticated,setIsAuthenticated} =useContext(Context)
  const[firstName,setFirstName]=useState("")
  const[lastName,setLastName]=useState("")
  const[email,setEmail]=useState("")
  const[phone,setPhone]=useState("")
  const[gender,setGender]=useState("") 
  const[dob,setDob]=useState("")
  const[appointmentDate,setAppointmentDate] =useState('')
const[department,setDepartment]=useState('')
const[doctor_firstName,setDoctorFirstName]=useState("")
  const[doctor_lastName,setDoctorLastName]=useState("")
  const[hasVisited,setHasVisited]=useState("")
  const[Address,setAddress]=useState("")
 
  const departmentsArray = [
    
      "Pediatrics",
     
    
    "Orthopedics",
     "Cardiology",
      "Neurology",
     "Oncology",
     "Radiology",
  "Physical Therapy",
    "Dermatology",
    "ENT",
   
    
  ];

const handleAppointment = async()=>{
    e.preventDefault()
    try {
        const hasVisitedBool =Boolean(hasVisited)
        const {data} = await axios.post('http://localhost:4000/api/v1/appointment/post',
        {
            firstName
            ,lastName
            ,email
            ,Address
            ,dob
            ,appointmentDate
            ,gender
            ,phone
            ,doctor_firstName
            ,doctor_lastName
            ,hasVisited:hasVisitedBool
            ,department},
            {
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            }
            )
            toast.success(data.message)
            navigate('/')
            
        
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

const [doctors,setDoctors] =useState([])
useEffect(()=>{
    const fetchDoctor = async()=>{
        const{data} = await axios.get('http://localhost:4000/api/v1/user/doctors',{withCredentials:true})
        setDoctors(data.doctors)
    }
    fetchDoctor()
},[])

  return (
    <div className='container form-component appointment-form'>
    <h2>Appointment</h2>
   
    <form onSubmit={handleAppointment}>
      <div>
        <input type="text" placeholder="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
       </div>
       <div>
       <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="text" placeholder="Phone no" value={phone} onChange={(e)=>setPhone(e.target.value)} />
        </div>
       <div>
   
       <input type="date" placeholder='Date of Birth' value={dob} onChange={(e)=>setDob(e.target.value)} />
       <select value={gender} placeholder="Selet Gender" onChange={(e)=>setGender(e.target.value)}>
       <option value="">Select Gender</option>
       <option value="Female">Male</option>
       <option value="Male">Female</option>
       <option value="Other">Other</option>
       </select>
       <input type="date" placeholder='Appointment Date' value={appointmentDate} onChange={(e)=>setAppointmentDate(e.target.value)}/>
       </div>
       <div>
        <select value={department} onChange={(e)=>{
            setDepartment(e.target.value)
            setDoctorFirstName('')
            setDoctorLastName('')
            }}>
                {departmentsArray.map((depart,index)=>{
                    return(
                        <option value={depart} key={index}>{depart}</option>
                    )
                })}
            </select>
            <select value={`${doctor_firstName} ${doctor_lastName}`} onChange={(e)=>
            {const{firstname ,lastname} =e.target.value.split(" ")
            setDoctorFirstName(firstname)
            setDoctorLastName(lastname)
            }} disabled={!department}>
                <option value="">Select Doctor</option>
                {
                    doctors.filter((doctor)=>doctor.doctordepartment===department).map((depart,index)=>{
                        return(
                            <option value={`${doctor.firstName} ${doctor.lastName}` }></option>
                        )
                    })
                }
            </select>
       </div>
       <textarea rows="10" value={Address} placeholder='Adsress' onChange={(e)=>setAddress(e.target.value)}></textarea>
       <div style={{gap:"10px" , justifyContent:"flex-end" ,flexDirection:"row"}}>
        <p>Have you Visited before</p>
       <input type="checkbox" checked={hasVisited} onChange={(e)=>setHasVisited(e.value.checked)} style={{flex:"none",width:"25px"}} />
       </div>
       <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Get Appointment</button>
        </div>
      
    </form>
  </div>
  )
}

export default AppointmentForm
