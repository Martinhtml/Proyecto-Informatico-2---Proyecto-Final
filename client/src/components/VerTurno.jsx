

import axios from "axios"
import "./VerTurnos.css"
import { useEffect } from "react"






function  VerTurno(){

    const cargarDispo = async ()=>{
        try{
            const token = localStorage.getItem("token")
            const response = await axios.get("http://localhost:3000/disponibilidad/getDispos", {headers:{authorization : `Bearer ${token}`}})
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        cargarDispo();
    }, [])

    return (<div id="contVerTurnos">

        <div className="contTurnos">

            <div className="izquierdaT">
                <h1>Horarios disponibles</h1>
            </div>
  
            <div className="derechasT">
                <div className="deslizadorTurnos">
                    
                </div>
            </div>

        </div>

    </div>)
}



export default VerTurno;