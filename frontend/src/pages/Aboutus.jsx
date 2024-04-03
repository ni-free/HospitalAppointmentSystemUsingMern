import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
const Aboutus = () => {
  return (
   <>
   <Hero title={"Learn more about us | Geeta devi hospital"} imageUrl={'/about.png'} />
   <Biography imageUrl={'/whoweare.png'}/>
   </>
  )
}

export default Aboutus
