import { useState, useEffect } from 'react'
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
import SubirDispo from './components/SubirDispo'
import VerTurno from './components/VerTurno'
import axios from 'axios'


function App() {

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [actualizacion, setActualizacion] = useState(0);
  const [tValido, setTValido] = useState(false);

  const verificarToken = async(tokenActual)=>{
    try{
      const response = await axios.get("http://localhost:3000/auth/validarToken", {headers: {authorization: `Bearer ${tokenActual}`}})
      if (response.data){
        setTValido(true);
      }else {
        setTValido(false);
      }
    }catch(error){
      setTValido(false);
    }
  }

  const verPermisos = async()=>{
    try{
      const response = await axios.get
    }catch(error){

    }
  }

  useEffect(()=>{

    const actualizarToken = async()=>{

      const nuevoToken = localStorage.getItem("token") || "";
      setToken(nuevoToken)
      await verificarToken(nuevoToken);

      setActualizacion(prev => prev + 1);

    }
    actualizarToken();
    window.addEventListener("TokenActualizado", actualizarToken);

    return () => {
      window.removeEventListener("TokenActualizado", actualizarToken)
    }
    }, [])



  useEffect(()=>{
    if(tValido){

    }else{

    }
  }, [token, actualizacion])


  return (
    <>
      <Routes>
        

        <Route element={<Layout />} path="">
        
          <Route path="" element={<Home/>}/>
          {!tValido ? <>
            <Route path="/login" element={<LogIn />} /> 
            <Route path="/registro" element={<Register/>}/>
          </> :
          <>
            <Route path="logout" element={<LogOut/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/editP" element={<EditarP/>}/>
            {}
            <Route path='/subirDispo' element={<SubirDispo/>}/>
            <Route path="/verTurno" element={<VerTurno/>}/>
          </>}
          

        </Route>
        
      </Routes>
      
    </>
    
  )
}

export default App
