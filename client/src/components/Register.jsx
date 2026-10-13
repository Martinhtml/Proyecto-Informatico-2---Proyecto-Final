import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
 
import "./Register.css"

function Register(){

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [apellido, setApellido] = useState("")
    const [dni, setDni] = useState("")
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [mensaje, setMensaje] = useState("")

    const Registrarse = async (ev) =>{
        try{
            ev.preventDefault()
            
            if (password.length < 4){
                setMensaje("la contraseña debe tener al menos 4 caracteres")
                return
            }
            const response = await axios.post('http://localhost:3000/user/register', {
                name,
                apellido,
                dni,
                email,
                password                
            })
            console.log(response.data)
            navigate('/login')
        
        }catch(error){
            console.log(error.response)
            setMensaje("No fue posible Completar el Registro")   
        }
    }

return(<>
        <div id="contenedorRegister">
            <div className="rectangulo">
                <h1>Registro</h1>
                <br/>
                <form onSubmit={Registrarse}>
                    <label htmlFor="name">Nombre:</label>
                    <input placeholder="Nombre" type="text" id="name" required onChange={(e) => setName(e.target.value)}/>
                    <br/>
                    <label htmlFor="apellido">Apellido:</label>
                    <input placeholder="Apellido" type="text" id="apellido" required onChange={(e) => setApellido(e.target.value)}/>
                    <br/>
                    <label htmlFor="dni">DNI:</label>
                    <input placeholder="DNI" type="text" inputMode="numeric" pattern="[0-9]{7,8}" id="dni" required onChange={(e) => setDni(e.target.value)}/>
                    <br/>
                    <label htmlFor="email">Email:</label>
                    <input placeholder="Email" type="email" id="email" required onChange={(e) => setEmail(e.target.value)}/>
                    <br/>
                    <label htmlFor="password">Contraseña:</label>
                    <input placeholder="Contraseña" type="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <button type="submit">Registrarse</button>
                    <br/>
                    <p>{mensaje}</p>
                </form>
            </div>
            
        </div>
    </>)
}
 
export default Register