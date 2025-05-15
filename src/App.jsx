import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ChatRoom from './pages/ChatRoom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/Login" element={<Login />} ></Route>
          <Route path="/Signup" element={<Signup />} ></Route>
          <Route path="/ChatRoom" element={<ChatRoom />} ></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App