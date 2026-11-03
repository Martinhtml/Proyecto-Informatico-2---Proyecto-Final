import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

        import "./LogIn.css"
        function LogInMedico(){
        
            const navigate = useNavigate()
        
            const [Email, setEmail] = useState("");
            const [Contraseña, setContraseña] = useState("");
            const [mensaje, setMensaje] = useState("")
        
            const IniciarSesion = async (e) => {
                try{
                    e.preventDefault()
                    const response = await axios.post("http://localhost:3000/user/loginMedico", {
                        email: Email,
                        password: Contraseña
                    })
                    localStorage.setItem("token", response.data);
        
                    window.dispatchEvent(new Event("TokenActualizado"))
        
                    navigate("/")
                }catch(error){
                    console.log(error);
                    if (error.response?.status === 403) {
                        setMensaje("Esta cuenta no tiene rol de médico")
                    } else {
                        setMensaje("Credenciales Incorrectas")
                    }
                }
            }
            return(<>
                <div id="contenedorLogin">
                    <div className="rectangulo">
                        <h1>LogIn Médico</h1>
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
                        <p>¿No sos médico? <Link to="/login">Iniciá sesión acá</Link></p>
                    </div>
                </div>
            </>)
        }


export default LogInMedico;