import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/Footer/footer'
import Loginpopup from './components/Loginpopup/Loginpopup'


function App() {
 const[showlogin,setShowlogin]=useState(false);
  return (
    <>
    {showlogin?<Loginpopup setShowlogin={setShowlogin}/>:<></>}
   <div className="app">
    <Navbar setShowlogin={setShowlogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Placeorder/>}/>
    </Routes>
   </div>
    <Footer/>
    </>
  )
}

export default App
