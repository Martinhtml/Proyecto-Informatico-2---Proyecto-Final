

import axios from "axios"
import "./VerTurnos.css"
import { useEffect, useState } from "react"






function  VerTurno(){

    const [dispos, setDispos] = useState([])
    const [disposDatos, setDisposDatos] = useState([])

    const cargarDispo = async ()=>{
        try{
            const token = localStorage.getItem("token")
            const response = await axios.get("http://localhost:3000/disponibilidad/getDispos", {headers:{authorization : `Bearer ${token}`}})
            setDispos(response.data)
            return response.data
        }catch(error){
            console.log(error)
        }   
    }

    const chequearDispo = async(id)=>{
        try{
            const response = await axios.get(`http://localhost:3000/disponibilidad/chequearDispo/${id}`)
            return response.data
        }catch(error){
            console.log(error)
        }
    }

    const cargarDisposInd = async(lista)=>{
        try{

            const listaDispos = []
            if (!lista) return
            for (let i = 0; i < lista.length; i++) {
                const dispo = lista[i]  
                const disponible = await chequearDispo(dispo.id)
                if (disponible){
                    const datos = await buscarDatos(dispo)
                    datos.push(dispo.fechaInicio, dispo.fechaFin, dispo.id)
                    listaDispos.push(datos)    
                }
                
            }
            setDisposDatos(listaDispos)
        }catch(error){
            console.log(error)
        }
    }

    const buscarDatos = async(dispo)=>{
        try{
            const token = localStorage.getItem("token")
            const response = await axios.get(`http://localhost:3000/user/getDatosUser/${dispo.medicoID}`, {headers:{authorization:`Bearer ${token}`}})
            const nombreMed = `${response.data.nombre} ${response.data.apellido}`
            const response2 = await axios.get(`http://localhost:3000/establecimientos/getEstByID/${dispo.establecimientoID}`)
            const estNom = `${response2.data.nombre} ${response2.data.direccion}`
            return [nombreMed, estNom]
        }catch(error){
            console.log(error)
        }
 
    }
    const sacarTurno = async(dispoID)=>{
        try {
            const token = localStorage.getItem("token")
            const response = await axios.post(`http://localhost:3000/turnos/obtenerTurno/${dispoID}`, {},{headers: {authorization : `Bearer ${token}`}});
            cargarDisposInd(dispos)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const cargarTotal = async()=>{
            const lista = await cargarDispo();
            await cargarDisposInd(lista);
        }
        cargarTotal();
    }, [])

    return (<div id="contVerTurnos">

        <div className="contTurnos">

            <div className="izquierdaT">
                <h1>Horarios disponibles</h1>
            </div>
  
            <div className="derechasT">
                <div className="deslizadorTurnos">
                    {
                        disposDatos.map((dispo, i)=>{
                            return <div className="DispoTarjeta" key={i}>
                                
                                <div className="parteIzquierda">
                                    <h1>{`Medico: ${dispo[0]}`}</h1>
                                    <h2>{`Establecimiento: ${dispo[1]}`}</h2>                                    

                                </div>
                                <div className="parteDerecha">
             
                                    <h2>{`Fecha inicio: ${new Date(dispo[2]).toLocaleString("es-Ar", { hour12: false })}`}</h2>

                                    <h2>{`Fecha fin: ${new Date(dispo[3]).toLocaleString("es-Ar",{ hour12: false })}`}</h2>
                                    <button onClick={()=>{
                                        sacarTurno(dispo[4])}}>Reservar Turno</button>
                                </div>

                            </div>
                        })
                    }
                </div>
            </div>

        </div>

    </div>)
}



export default VerTurno;