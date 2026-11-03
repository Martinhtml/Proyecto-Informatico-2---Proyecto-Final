import { useState } from "react";
import "./recuperarContra.css"

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function RecuperarContra(){
    
    const [email, setEmail] = useState("")
    const [tokenR, setTokenR] = useState("")
    const [tokenUser, setTokenUser] = useState("")
    const [intentos, setIntentos] = useState(1)
    const [etapa, setEtapa] = useState(0)
    const [mensaje, setMensaje] = useState("")
    const [contraseña, setContraseña] = useState("");
    const [contraConf, setContraConf] = useState("")
    const navigate = useNavigate()


    const checkToken = (e)=>{
        e.preventDefault()
        if (tokenR == tokenUser){
            setEtapa(2)
            setMensaje("")
        }
        else if (intentos ==5){
            setIntentos(1)
            setEtapa(0)
            setMensaje("Intentos maximos alcanzados, vuelva enviar un mail.")
        }
        else{
            setIntentos(intentos+1)
            setMensaje(`Incorrecto. Intento ${intentos}/5`)
        }
    }


    const enviar = async (e) =>{
        e.preventDefault();
        setMensaje("")
        try{
            const respose = await axios.post("http://localhost:3000/user/enviarMail", {mail : email})
            setTokenR(respose.data)
            setEtapa(1);
        }catch(error){
            console.log(error)
        }
    }

    const recuperarPass = async(e)=>{
        try {
            e.preventDefault()
            const response = await axios.patch("http://localhost:3000/user/recuperarContra", {email: email, contra : contraseña})
            navigate("/")
        } catch (error) {
            console.log(error)
            setMensaje("Algo salio mal")
        }

    }
    
    return(<div id="contRecuperarContra">
        

        {
            etapa == 0 && 
            <form onSubmit={enviar}>

                <div id="tituloContra">
                    <h1>Recuperar Contraseña</h1>
                </div>
                <div id="contDatos">
                    <div>
                        <label htmlFor="email">Introduzca su email:</label>
                        <input placeholder="email" type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    
                    {(email.length>=11) ? <button type="submit">Confirmar</button> : <p>Introduzca un email valido</p>}
                    <Link to="/perfil">Cancelar</Link>

                </div>

                <p>{mensaje}</p>

            </form>
        }
        {
            etapa == 1 &&
            <form onSubmit={checkToken}>

                <div id="tituloContra">
                    <h1>Recuperar Contraseña</h1>
                </div>
                <div id="contDatos">
                    <div>
                        <label htmlFor="codigo">Introduzca su codigo de recuperacion:</label>
                        <input placeholder="Codigo de recuperacion" type="text" id="codigo" onChange={(e) => setTokenUser(e.target.value)}/>
                    </div>
                    <p onClick={enviar} id="reenviar">Reenviar codigo</p>
                    {(tokenUser.length == 6) ? <button type="submit">Confirmar</button> : <p>Introduzca su codigo</p>}
                    <Link to="/perfil">Cancelar</Link>
                </div>
                <p>{mensaje}</p>


            </form>
            
        }
        {
            etapa == 2 &&
            <form onSubmit={recuperarPass}>

                <div id="tituloContra">
                    <h1>Recuperar Contraseña</h1>
                </div>
                <div id="contDatos">
                    <div>
                        <label htmlFor="contra">Introduzca su nueva contraseña:</label>
                        <input placeholder="Nueva contraseña" type="password" id="contra" onChange={(e) => setContraseña(e.target.value)}/>
                        <label htmlFor="contraConf">Confirmar contraseña:</label>
                        <input placeholder="Repita su contraseña" type="password" id="contraConf" onChange={(e) => setContraConf(e.target.value)}/>
                    </div>
                    {(contraseña >= 4 && contraConf == contraseña) ? <button type="submit">Confirmar</button> : <p>Datos incorrectos</p>}
                    <Link to="/perfil">Cancelar</Link>
                </div>
                <p>{mensaje}</p>


            </form>
            
        }
        
    </div>)
}


export default RecuperarContra;