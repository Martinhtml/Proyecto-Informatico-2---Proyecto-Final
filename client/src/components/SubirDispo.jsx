

import { useEffect, useState } from "react";
import "./SubirDispo.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubirDispo(){

    const [fechaIn, setFechaIn] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [establecimientoId, setEstablecimientoId] = useState(-1)
    const [establecimientos, setEstablecimientos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate()


    const getEstable = async ()=>{
        try{

            const respuesta = await axios.get("http://localhost:3000/establecimientos/getEstablecimientos")
            setEstablecimientos(respuesta.data)
            console.log(respuesta.data);

        }catch(error){
            console.log(error)
        }

    }

    useEffect(()=>{
        getEstable();
    }, [])



    const subirDispo = async(e)=>{
        try{
            e.preventDefault()
            console.log("¡El botón funciona y el formulario se está enviando!")
            const token = localStorage.getItem("token")

            if (fechaIn <= new Date() || fechaFin <= fechaIn){
                return setMensaje("Escoja un intervalo de tiempo valido")
            }

            if (establecimientoId === -1){
                return setMensaje("Elija un establecimiento valido")
            }

            const respuesta = await axios.post("http://localhost:3000/disponibilidad/subirDispo", 
                {"fechaInicio" : fechaIn, "fechaFin":fechaFin, "establecimientoID" : establecimientoId}, 
                {headers : {authorization : `Bearer ${token}`}})

            console.log(respuesta.data)
            navigate("/")



        }catch(error){
            console.log(error)
        }
    }


    return(<div id="contenedorSubDispo">

        <form className="CartaDispo" onSubmit={subirDispo}> 
            
            <h1>Nueva disponibilidad  </h1> 
            
            
            <div id="contDatosDispo">
                <div className="derecha">
                    <div className="contFI">
                        <label htmlFor="fechaInicio">Fecha inicio: </label>
                        <input type="datetime-local"  id="fechaInicio" onChange={(e)=>{setFechaIn(e.target.value)}}/>
                    </div>
        

                    <div className="contFF">
                        <label htmlFor="fechaFin">Fecha fin: </label>
                        <input type="datetime-local" id="fechaFin" onChange={(e)=>{setFechaFin(e.target.value)}}/>            
                    </div>

                    <div className="establecimiento">
                        <label htmlFor="establecimiento">Establecimiento: </label>
                        
                        <select id="establecimiento" name="establecimiento" value={establecimientoId} onChange={(e)=>{setEstablecimientoId(Number(e.target.value))}}>
                            <option value="-1" disabled>Selecciona un establecimiento</option>

                            {establecimientos.map((e)=>(
                                <option key={e.id} value={e.id}>
                                    {`${e.nombre} ${e.direccion}`}
                                </option>
                            ))}

                        </select>           
                        
                    </div>
                </div>
                <div className="izquierda">
                    <span id="mensaje">{mensaje}</span>
                    <button type="submit">Subir horario</button>
                </div>
            </div>
            

        </form>
    
    </div>)
}


export default SubirDispo;