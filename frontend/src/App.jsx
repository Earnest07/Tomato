import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from "react-router-dom"
import PlaceOrder from './Pages/Resolver/PlaceOrder'
import Cart from './Pages/Cart/Cart'
import Home from './Pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/Log/LoginPopup'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} />: <></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/order" element={<PlaceOrder/>}></Route>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App