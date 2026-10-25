import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


import "./Header.css";

function Header() {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [nombre, setNombre] = useState("");
    const [actualizacion, setActualizacion] = useState(0);

    const [tValido, setTValido] = useState(false);


    const [permisos, setPermisos]= useState({})

    const cargarPermisos = async(tokenActual)=>{
        const permisos = {
            subirDispo : await puedeUsar("Disponibilidad", "create", tokenActual)
        }
        setPermisos(permisos)
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

    const obtenerNombreUsuario = async (tokenActual) => {
        const response = await axios.get("http://localhost:3000/user/obtenerNombreUsuario", {
            headers: {authorization: `Bearer ${tokenActual}`}
        });
        setNombre(response.data);
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
            obtenerNombreUsuario(token);
            cargarPermisos(token)
        }else{
            setNombre("");
            setPermisos({})
        }
    }, [tValido, actualizacion, token])

    return (
        <header>
            

            <div id='ContenedorTitulo'> 
                <Link to="/">Gestor de Turnos</Link> 
            </div>
            <div className='ContenedorMedio'>
                    {!tValido ? (
                    <p></p>
                ) : (
                    <div id='ContenedorTurnos'>
                        {
                            permisos.subirDispo && <Link to="/subirDispo">Crear Turno</Link>
                        }
                        <Link to="/verTurno">Ver Turno</Link>
                    </div>
                )}

            </div>
            <div className="contenedor-derecha">
                {!tValido ? (
                    <nav className="botones-autenticacion">
                        <Link to="/login">Iniciar sesión</Link>
                        <Link to="/registro">Registrarse</Link>
                    </nav>
                ) : (
                    <div id='ContenedorSaludo'>
                        <Link to="/perfil">Bienvenido, {nombre}</Link>
                    </div>
                )}
            </div>
        </header>

    )
}

export default Header