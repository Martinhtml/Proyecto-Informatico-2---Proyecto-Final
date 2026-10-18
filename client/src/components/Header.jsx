import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


import "./Header.css";

function Header() {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [nombre, setNombre] = useState("");
    const [actualizacion, setActualizacion] = useState(0);


    const obtenerNombreUsuario = async () => {
        const response = await axios.get("http://localhost:3000/user/obtenerNombreUsuario", {
            headers: {authorization: `Bearer ${token}`}
        });
        setNombre(response.data);
    }

    useEffect(()=>{

        const actualizarToken =()=>{

            setToken(localStorage.getItem("token") || "");
            setActualizacion(actualizacion + 1);

        }

        window.addEventListener("TokenActualizado", actualizarToken);

        return () => {
            window.removeEventListener("TokenActualizado", actualizarToken)
    }
    }, [])

    useEffect(()=>{
        if(token){
            obtenerNombreUsuario();
        }else{
            setNombre("");
        }
    }, [token, actualizacion])

    return (
        <header>
            <div id='ContenedorIzquierda'>
                {!token ? (
                <p></p>
            ) : (
                <div id='ContenedorTurnos'>
                    <h2>VerTurno</h2>
                </div>
            )}

            </div>

            <div id='ContenedorTitulo'> 
                <Link to="/">Gestor de Turnos</Link> 
            </div>

        <div className="contenedor-derecha">
            {!token ? (
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