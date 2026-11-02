import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import "./MisTurnos.css"

function MisTurnos(){


    const [roles, setRoles] = useState([])
    const [turnos, setTurnos] = useState([])
    const [turnosDatos, setTurnosDatos] = useState([])

    const actualizarTurnos = async () => {
        const lista = await getTurnos();

        if (lista) {
            await getDatos(lista);
        }
    }



    const cancelarTurno = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await axios.patch(
                `http://localhost:3000/turnos/cancelarTurno/${id}`,
                {},
                { headers: { authorization: `Bearer ${token}` } }
            );

            await actualizarTurnos();

        } catch (error) {
            console.log(error);
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

    const getDatos = async(listaTurnos)=>{
        try{
            const token = localStorage.getItem("token")
            const lista = []
            for (let i = 0; i < listaTurnos.length; i++) {

                const turno = listaTurnos[i];

                const response = await axios.get(`http://localhost:3000/disponibilidad/getDispoId/${turno.disponibilidadID}`, { headers: { authorization: `Bearer ${token}` } })
                
                const dispo = response.data;

                const datos = await buscarDatos(dispo);

                const response2 = await axios.get(`http://localhost:3000/user/getDatosUser/${turno.pacienteID}`, {headers:{authorization:`Bearer ${token}`}})
                const nombrePaciente = `${response2.data.nombre} ${response2.data.apellido}`

                lista.push({
                    id: turno.id,
                    estado: turno.estado,
                    disponibilidadID: turno.disponibilidadID,
                    fechaInicio: dispo.fechaInicio,
                    fechaFin: dispo.fechaFin,
                    medico: datos[0],
                    establecimiento: datos[1],
                    paciente: nombrePaciente
                })
            }
            setTurnosDatos(lista)
        }catch(error){
            console.log(error)
        }
            
    }


    const getTurnos = async()=>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/turnos/getTurnosByID", {headers : {authorization : `Bearer ${token}`}})

            setTurnos(response.data)
            return response.data

        }catch(error){
            console.log(error)
        }
            
    }

    useEffect(()=>{
        const iniciarGetTurnos = async ()=>{
            
            const lista = await getTurnos();
            if(lista){
                await getDatos(lista);
            }
        }

        iniciarGetTurnos()
    }, [])

    return(<div id="contMisTurnos">
        
        {turnosDatos.map((turno)=>{
            return <div className="tarjetaTurno" key={turno.id}>
                <h1>{`Medico: ${turno.medico}`}</h1>

                <h1>{`Paciente: ${turno.paciente}`}</h1>

                <h2>{`Establecimiento: ${turno.establecimiento}`}</h2>

                <h2>
                    {`Fecha inicio: ${new Date(turno.fechaInicio).toLocaleString("es-Ar", { hour12: false })}`}
                </h2>

                <h2>
                    {`Fecha fin: ${new Date(turno.fechaFin).toLocaleString("es-Ar", { hour12: false })}`}
                </h2>

                <h2>{`Estado: ${turno.estado}`}</h2>

                {turno.estado === "Pendiente" && (
                    <div className="botonesTurno">
                        <button onClick={() => cancelarTurno(turno.id)}>
                            Cancelar
                        </button>

                        <button onClick={() => reprogramarTurno(turno.id)}>
                            Reprogramar
                        </button>

                        
                    </div>
                )}
            </div>
        })}
        
        </div>)
}



export default MisTurnos;