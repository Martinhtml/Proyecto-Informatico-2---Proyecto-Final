import axios from "axios"
import { useState } from "react"    
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import "./LogIn.css"


function LogIn(){

    const navigate = useNavigate()

    const [Email, setEmail] = useState("");
    const [Contraseña, setContraseña] = useState("");
    const [mensaje, setMensaje] = useState("")



    const IniciarSesion = async (e) => {
        try{
            e.preventDefault()
            const response = await axios.post("http://localhost:3000/user/login", {
                email: Email,
                password: Contraseña
            })
            console.log(response.data)
            localStorage.setItem("token", response.data);

            
            window.dispatchEvent(new Event("TokenActualizado"))

            navigate("/")
        }catch(error){
            console.log(error);
            setMensaje("Credenciales Incorrectas")
        }
    }

    return(<>
        <div id="contenedorLogin">
            <div className="rectangulo">
                <h1>LogIn</h1>
                <br/>
                <form onSubmit={IniciarSesion}>
                    <label htmlFor="email">Email:</label>
                    <input placeholder="Email" type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    <br/>
                    <label htmlFor="password">Contraseña:</label>
                    <input placeholder="Contraseña" type="password" id="password" onChange={(e) => setContraseña(e.target.value)}/>
                    <br/>
                    <button type="submit">Iniciar Sesión</button>
                    <br/>
                    <p>{mensaje}</p>

                </form>
                <br />
                <p>¿No tenes cuenta? <Link to="/registro">Registrarse</Link></p>
            </div>
            
        </div>
    </>)
}


export default LogIn