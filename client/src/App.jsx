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
import EliminarCuenta from './components/eliminarCuenta'
import CambiarContra from "./components/cambiarContraseña"
import RecuperarContra from "./components/recuperarContra"
import LogInMedico from "./components/LogInMedico"

function App() {

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [actualizacion, setActualizacion] = useState(0);
  const [tValido, setTValido] = useState(false);

  const [permisos, setPermisos]= useState({})

  const cargarPermisos = async(tokenActual)=>{
    const permisos = {
      subirDispo : await puedeUsar("Disponibilidad", "create", tokenActual)
    }
    console.log("Permisos cargados:", permisos);

    setPermisos(permisos)
  }

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

  const puedeUsar = async(tabla, accion, tokenActual)=>{
    try{
      const response = await axios.get(`http://localhost:3000/auth/verPermiso/${tabla}/${accion}`, {headers:{authorization:`Bearer ${tokenActual}`}})
      return response.data
    }catch(error){
      console.log(error)
      return false;
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
      cargarPermisos(token)

    }else{
      setPermisos({})
    }
  }, [token, actualizacion, tValido])


  return (
    <>
      <Routes>
        

        <Route element={<Layout />} path="">
        
          <Route path="" element={<Home/>}/>
          {!tValido ? <>
            <Route path="/login" element={<LogIn />} />
            <Route path="/loginMedico" element={<LogInMedico />} /> 
            <Route path="/registro" element={<Register/>}/>
          </> :
          <>
            <Route path="logout" element={<LogOut/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/editP" element={<EditarP/>}/>
            {permisos.subirDispo && <Route path='/subirDispo' element={<SubirDispo/>}/> }
            <Route path="/verTurno" element={<VerTurno/>}/>
            <Route path="/eliminarCuenta" element={<EliminarCuenta/>}/>
            <Route path="/cambiarContra" element={<CambiarContra/>}/>
            <Route path="/recuperarContra" element={<RecuperarContra/>}/>
          </>}
          

        </Route>
        
      </Routes>
      
    </>
    
  )
}

export default App
