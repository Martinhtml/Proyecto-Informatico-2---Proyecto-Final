
import axios from "axios"
import { useState } from "react";

import foto1 from "../assets/images.png"

import "./Perfil.css"
import { useNavigate } from "react-router-dom";



function Perfil(){

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dni, setDni] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate()

    const llevarLogout = ()=>{
        navigate("/logout") 
    }
    const llevarEditarPerfil = ()=>{
        navigate("/editP") 
    }

    const obtenerNombreUsuario = async () => {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:3000/user/obtenerUsuario", {
            headers: {authorization: `Bearer ${token}`}
        });
        setNombre(response.data.nombre);
        console.log("holas")
        setApellido(response.data.apellido);
        setDni(response.data.dni);
        setEmail(response.data.email);


    }


    useState(()=>{
        obtenerNombreUsuario()
    }, [nombre, apellido])

    return(<div id="ContPerfil">
    
        <div id="perfil">

            <img src={foto1} alt="" />
            <div id="datos">
                <br />

                <h1>
                    {`${nombre} ${apellido}`}
                </h1>

                <br />

                <h2>{`DNI: ${dni}`}</h2>
                <br />
                <h2>{`Email: ${email}`}</h2>
            
            </div>
            <button className="editarPerfil" onClick={llevarEditarPerfil}>Editar perfil ✎</button>
            <button className="cerrarSesion" onClick={llevarLogout}>Cerrar Sesion</button>
        </div>
    
    </div>)
}


export default Perfil;