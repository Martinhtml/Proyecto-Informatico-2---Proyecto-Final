import { useState } from "react";
import "./recuperarContra.css"

import axios from "axios";


function RecuperarContra(){

    const [email, setEmail] = useState("")

    const enviar = async (e) =>{
        e.preventDefault();

        try{
            const respose = await axios.post("http://localhost:3000/user/enviarMail", {mail : email})
            console.log(respose.data)

        }catch(error){
            console.log(error)
        }
    }
    
    return(<div id="contRecuperarContra">

        <form onSubmit={enviar}>

            <div id="tituloContra">
                <h1>Recuperar Contraseña</h1>
            </div>
            <div id="contDatos">
                <div>
                    <label htmlFor="email">Introduzca su email:</label>
                    <input placeholder="email" type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                
                {email.length >=11 ? <button type="submit">Confirmar</button> : <p>Introduzca un email valido</p>}
                
            </div>


        </form>
    </div>)
}


export default RecuperarContra;