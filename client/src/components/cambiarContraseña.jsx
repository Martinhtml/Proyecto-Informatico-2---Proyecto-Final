import axios from "axios";
import "./cambiarContraseña.css"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CambiarContra(){

    const [viejaPass, setViejaPass] = useState("")
    const [nuevaPass, setNuevaPass] = useState("")
    const [passConf, setPassConf] = useState("")
    const [mensaje, setMensaje] = useState("Introduzca una contraseña")

    const navigate = useNavigate()

    const cambiarPass = async(e)=>{
        e.preventDefault()
        try{
            const token = localStorage.getItem("token")
            const response = await axios.patch("http://localhost:3000/user/cambiarPass", {passVieja : viejaPass, nuevaPass}, 
                {headers : {authorization : `Bearer ${token}`}});
            navigate("/perfil")
        }catch(error){
            console.log(error)
            setMensaje("Contraseña Incorrecta")
        }
            

    }

    const cambiarMensaje = ()=>{
        if (viejaPass.length < 4) return setMensaje("Vieja contraseña muy corta");
        if (nuevaPass.length < 4) return setMensaje("La contraseña es muy corta");
        if (nuevaPass !== passConf) return setMensaje("Las contraseñas no coinciden");
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
                    <div>
                        <label htmlFor="viejaPass">Introduzca su antigua contraseña:</label>
                        <input placeholder="Vieja contraseña" type="password" id="viejaPass" onChange={(e) => setViejaPass(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="nuevaPass">Introduzca su nueva contraseña:</label>
                        <input placeholder="Nueva contraseña" type="password" id="nuevaPass" onChange={(e) => setNuevaPass(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="passConf">Confirma su contraseña:</label>
                        <input placeholder="Confirma la contraseña" type="password" id="passConf" onChange={(e) => setPassConf(e.target.value)}/>
                    </div>
                    
                    
                    {mensaje == "Correcto" ? <button type="submit">Confirmar</button> : <span>{mensaje}</span>}
                    
                </div>
                <p><Link to="/perfil">Volver</Link></p>


            </form>

    </div>)
}



export default CambiarContra;