import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {Routes, Route, Link} from "react-router-dom"
import Layout from './components/Layout'
import Register from './components/Register'
import LogIn from './components/LogIn'
import Home from "./components/Home"
import LogOut from "./components/LogOut"



function App() {

  return (
    <>
      <Routes>
        

        <Route element={<Layout />} path="">
        
          <Route path="" element={<Home/>}/>
          <Route path="/login" element={<LogIn />} />
          <Route path="/registro" element={<Register/>}/>
          <Route path="logout" element={<LogOut/>}/>
        </Route>
        
      </Routes>
      
    </>
    
  )
}

export default App
