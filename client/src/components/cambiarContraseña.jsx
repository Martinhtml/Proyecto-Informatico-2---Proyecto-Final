import "./cambiarContraseña.css"
import { useEffect, useState } from "react";


function CambiarContra(){

    const [viejaPass, setViejaPass] = useState("")
    const [nuevaPass, setNuevaPass] = useState("")
    const [passConf, setPassConf] = useState("")
    const [mensaje, setMensaje] = useState("Introduzca una contraseña")


    const cambiarMensaje = ()=>{
        if (viejaPass.length < 4) setMensaje("Vieja contraseña muy corta");
        if (nuevaPass.length < 4) setMensaje("La contraseña es muy corta");
        if (nuevaPass !== passConf) setMensaje("Las contraseñas no coinciden");
        else setMensaje("Correcto")
    }

    useEffect(()=>{
        cambiarMensaje()
    }, [nuevaPass, passConf, viejaPass])


    return (<div className="contEditCont">

          
            <form onSubmit={cambiarPass}>
                <div id="tituloContra">
                    <h1>Cambiar Contraseña</h1>
                </div>
                <div id="contDatos">
                    <label htmlFor="ViejaPass">Introduzca su antigua contraseña:</label>
                    <input placeholder="Vieja contraseña" type="password" id="viejaPass" onChange={(e) => setViejaPass(e.target.value)}/>
                    <label htmlFor="NuevaPass">Introduzca su nueva contraseña:</label>
                    <input placeholder="Nueva contraseña" type="password" id="nuevaPass" onChange={(e) => setNuevaPass(e.target.value)}/>
                    <label htmlFor="passConf">Confirma su contraseña:</label>
                    <input placeholder="Confirma la contraseña" type="password" id="passConf" onChange={(e) => setPassConf(e.target.value)}/>
                    {mensaje == "Correcto" ? <button type="submit">Confirmar</button> : <p>{mensaje}</p>}
                    
                </div>
                

            </form>
            <br />
            <p><Link to="/perfil">Volver</Link></p>

    </div>)
}



export default CambiarContra;