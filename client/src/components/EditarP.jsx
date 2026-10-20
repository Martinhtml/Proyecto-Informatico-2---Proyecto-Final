import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./EditarP.css"
import axios from "axios";

function EditarP(){

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate()

    const editar = async (e)=>{
        try{

            e.preventDefault()

            for (let i = 0; i < nombre.length; i++) {
                if (!isNaN(nombre[i]) && nombre[i] !== ' ' || nombre[i]  === " ")
                    return setMensaje("Escriba bien el nombre")
            }
            for (let i = 0; i < apellido.length; i++) {
                if (!isNaN(apellido[i]) && apellido[i] !== ' ')
                    return setMensaje("Escriba bien el apellido")
            }

            const token = localStorage.getItem("token")
            const respuesta = await axios.patch("http://localhost:3000/user/editProf", {nombre, apellido}, 
                {headers: {authorization: `Bearer ${token}`}})
            console.log(respuesta.data)
            navigate("/perfil")
            




            window.dispatchEvent(new Event("TokenActualizado"))

        }catch(error){
            setMensaje("No se pudo editar el perfil")
        }
        
        
    }

    return(<>
    
        <div id="contenedorEditar">
            <div className="contEditP">
                <h1>Editar Perfil</h1>
                <br/>
                <form onSubmit={editar}>
                    <label htmlFor="Nombre">Nuevo nombre:</label>
                    <input placeholder="Nuevo nombre" type="text" id="nombre" onChange={(e) => setNombre(e.target.value)}/>
                    <br/>
                    <label htmlFor="Apellido">Nuevo apellido:</label>
                    <input placeholder="Nuevo apellido" type="text" id="apellido" onChange={(e) => setApellido(e.target.value)}/>
                    <br/>
                    <button type="submit">Confirmar</button>
                    <br/>
                    <p>{mensaje}</p>

                </form>
                <br />
                <p><Link to="/perfil">Volver</Link></p>
            </div>
            
        </div>

    </>)
}

export default EditarP;