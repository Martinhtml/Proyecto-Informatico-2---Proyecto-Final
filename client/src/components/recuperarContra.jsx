import "./recuperarContra.css"

import axios from "axios";


function RecuperarContra(){

    const enviar = async () =>{
        try{

            const respose = await axios.post("http://localhost:3000/user/enviarMail", {mail : "maximilianofernadezantunes@gmail.com"})
            console.log(respose.data)
        }catch(error){
            console.log(error)
        }
    }
    
    return(<div id="contRecuperarContra">

        <button onClick={enviar}>Mail</button>

    </div>)
}


export default RecuperarContra;