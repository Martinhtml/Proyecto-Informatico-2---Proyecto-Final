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
import Perfil from './components/Perfil'
import EditarP from './components/EditarP'
import SubirDispo from './components/subirDispo'



function App() {

  return (
    <>
      <Routes>
        

        <Route element={<Layout />} path="">
        
          <Route path="" element={<Home/>}/>
          <Route path="/login" element={<LogIn />} />
          <Route path="/registro" element={<Register/>}/>
          <Route path="logout" element={<LogOut/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/editP" element={<EditarP/>}/>
          <Route path='/subirDispo' element={<SubirDispo/>}/>
        </Route>
        
      </Routes>
      
    </>
    
  )
}

export default App
