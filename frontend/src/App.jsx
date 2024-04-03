import { useState } from 'react'
import "./App.css"
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'
import Appointment from './pages/Appointment'
import Aboutus from './pages/Aboutus'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/Home' element= {<Home/>} />
         <Route path='/Appointment' element={<Appointment/>} />
         <Route path='/AboutUS' element={< Aboutus/>} />
         <Route path='/Register' element={<Register/>} />
         <Route path='/Login' element={<Login/>} />
      </Routes>
      <ToastContainer position='top-center'/>
    </Router>
     </>
  )
}

export default App
