import { useState } from "react";
import "./LogOut.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function LogOut(){

    const [confirmacion, setConfirmacion] = useState(0)
    const [mensaje, setMensaje] = useState("")

    const navigate = useNavigate()

    const cerrarSesion = async ()=>{
        localStorage.removeItem("token")
        window.dispatchEvent(new Event("TokenActualizado"))

        navigate("/")
    }

    useEffect(()=>{
        if (confirmacion === 0){
            setMensaje("Cerrar Sesión")
        }else if (confirmacion === 1){
            setMensaje("Confirmar")
        }else if (confirmacion === 2){
            cerrarSesion()
        }
    }, [confirmacion])

    return (<>
        <div className="ContenedorLogOut">
            <div className="ventana">
                <h1>LogOut</h1>
                <div className="ContenedorBotones">
                    <button className="BotonCerrar" onClick={()=>setConfirmacion(confirmacion + 1)}>{mensaje}</button>
                    {confirmacion === 1 ? <button className="Confirmacion" onClick={()=>setConfirmacion(0)}>Cancelar</button>: <p></p>}
                </div>
                {confirmacion === 1 ? <p>Al presionar confirmar se cerrara la sesión</p> : <p></p>}
                
            </div>
        </div>
    </>)
}

export default LogOut;