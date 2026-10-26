

import axios from "axios";
import "./eliminarCuenta.css"


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function EliminarCuenta(){
    const [confirmacion, setConfirmacion] = useState(0)
    const [mensaje, setMensaje] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [error, setError] = useState(1)

    const navigate = useNavigate()

    const eliminarCuenta = async ()=>{
        try{
            const token = localStorage.getItem("token")

            const response = await axios.delete("http://localhost:3000/user/eliminarCuenta", 
                {
                    data : {contra : contraseña},
                    headers : {authorization : `Bearer ${token}`}
                })
            
            localStorage.removeItem("token")
            window.dispatchEvent(new Event("TokenActualizado"))

        navigate("/registro")
        }catch(error){
            console.log(error)
            setError(0)
            setConfirmacion(0)
        }
        
    }


    useEffect(()=>{
        if (confirmacion === 0){
            setMensaje("Eliminar mi cuenta")
        }else if (confirmacion === 1){
            setMensaje("Confirmar")
        }else if (confirmacion === 2){
            eliminarCuenta()
        }
    }, [confirmacion])


    return <div className="contEliminar">
        <div className="ventanaElim" >
            <h1>Eliminar Cuenta</h1>
            <div className="contInput">
                <label htmlFor="password">Contraseña:</label>
                <input type="password" placeholder="Ingrese su contraseña" id="password" onChange={(e) => setContraseña(e.target.value)}/>
                {error != 1 && <p>Contraseña Incorrecta</p>}
            </div>
            <div className="ContenedorBotonesElim">
                <button className="BotonCerrarE" onClick={()=>setConfirmacion(confirmacion + 1)}>{mensaje}</button>
                {confirmacion === 1 ? <button className="ConfirmacionE" onClick={()=>setConfirmacion(0)}>Cancelar</button>: <p></p>}
                {confirmacion === 1 ? <p>Estas seguro? Esta accion es irreversible</p> : <p></p>}
                
            </div>
            
        </div>
    </div>
}


export default EliminarCuenta;