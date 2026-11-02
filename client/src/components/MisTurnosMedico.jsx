import axios from "axios";
import { useEffect, useState } from "react";

import "./MisTurnosMedico.css"


function TurnosMedico(){

    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [nuevaDisponibilidad, setNuevaDisponibilidad] = useState("");
    

    const [turnosDatos, setTurnosDatos] = useState([]);


    const cargarDisponibilidades = async() => {
    try{
        const token = localStorage.getItem("token");

        const response = await axios.get(
            "http://localhost:3000/disponibilidad/getDisposMedico",
            { headers: { authorization: `Bearer ${token}` } }
        );

        const lista = [];

        for (let i = 0; i < response.data.length; i++) {
            const dispo = response.data[i];

            const response2 = await axios.get(
                `http://localhost:3000/disponibilidad/chequearDispo/${dispo.id}`,
                { headers: { authorization: `Bearer ${token}` } }
            );

            if (response2.data === true) {
                const response3 = await axios.get(
                    `http://localhost:3000/user/getDatosUser/${dispo.medicoID}`,
                    { headers: { authorization: `Bearer ${token}` } }
                );

                const nombreMedico = `${response3.data.nombre} ${response3.data.apellido}`;

                const response4 = await axios.get(
                    `http://localhost:3000/establecimientos/getEstByID/${dispo.establecimientoID}`
                );

                const establecimiento = `${response4.data.nombre} - ${response4.data.direccion}`;

                lista.push({
                    id: dispo.id,
                    fechaInicio: dispo.fechaInicio,
                    fechaFin: dispo.fechaFin,
                    medico: nombreMedico,
                    establecimiento: establecimiento
                });
            }
        }

        setDisponibilidades(lista);

    }catch(error){
        console.log(error);
    }
}


    const iniciarReprogramacion = async(id) => {
        setTurnoSeleccionado(id);
        setNuevaDisponibilidad("");
        await cargarDisponibilidades();

    }

    const confirmarReprogramacion = async() => {
        try{
            const token = localStorage.getItem("token");

            await axios.patch(
                `http://localhost:3000/turnos/reprogramarTurno/${turnoSeleccionado}`,
                { disponibilidadID: nuevaDisponibilidad },
                { headers: { authorization: `Bearer ${token}` } }
            );

            setTurnoSeleccionado(null);
            setNuevaDisponibilidad("");

            await actualizarTurnos();

        }catch(error){
            console.log(error);
        }
    }











    const actualizarTurnos = async () => {
        const lista = await getTurnos();
        if (lista) {
            await getDatos(lista);
        }
    }
     const getTurnos = async()=>{
        try{
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:3000/turnos/getTurnosMedico",
                { headers: { authorization: `Bearer ${token}` } }
            );

            return response.data;

        }catch(error){
            console.log(error);
        }
    }

    const getDatos = async(listaTurnos)=>{
        try{
            const token = localStorage.getItem("token");
            const lista = [];
            console.log(listaTurnos);
            for (let i = 0; i < listaTurnos.length; i++) {

                const turno = listaTurnos[i];

                const dispo = turno.Disponibilidade;

                const response = await axios.get(
                    `http://localhost:3000/user/getDatosUser/${turno.pacienteID}`,
                    { headers: { authorization: `Bearer ${token}` } }
                );

                const nombrePaciente = `${response.data.nombre} ${response.data.apellido}`;

                const response2 = await axios.get(
                    `http://localhost:3000/establecimientos/getEstByID/${dispo.establecimientoID}`
                );

                const establecimiento = `${response2.data.nombre} ${response2.data.direccion}`;

                lista.push({
                    id: turno.id,
                    estado: turno.estado,
                    fechaInicio: dispo.fechaInicio,
                    fechaFin: dispo.fechaFin,
                    paciente: nombrePaciente,
                    establecimiento: establecimiento
                });
            }

            setTurnosDatos(lista);

        }catch(error){
            console.log(error);
        }
    }

    const cancelarTurno = async(id)=>{
        try{
            const token = localStorage.getItem("token");

            await axios.patch(
                `http://localhost:3000/turnos/cancelarTurno/${id}`,
                {},
                { headers: { authorization: `Bearer ${token}` } }
            );

            await actualizarTurnos();

        }catch(error){
            console.log(error);
        }
    }

    const completarTurno = async(id)=>{
        try{
            const token = localStorage.getItem("token");

            await axios.patch(
                `http://localhost:3000/turnos/completarTurno/${id}`,
                {},
                { headers: { authorization: `Bearer ${token}` } }
            );

            await actualizarTurnos();

        }catch(error){
            console.log(error);
        }
    }


    useEffect(()=>{
        const iniciarGetTurnos = async()=>{
            await actualizarTurnos();
        }

        iniciarGetTurnos();
    }, []);

    return(
        <div id="contMisTurnos">

            {turnosDatos.map((turno)=>{
                return(
                    <div className="tarjetaTurno" key={turno.id}>

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

                                <button onClick={() => completarTurno(turno.id)}>
                                    Completar
                                </button>

                                <button onClick={() => iniciarReprogramacion(turno.id)}>
                                    Reprogramar
                                </button>

                            </div>
                        )}
                        {turnoSeleccionado === turno.id && (
                            <div className="reprogramarTurno">
                                <h2>Seleccionar nueva disponibilidad</h2>

                                <select value={nuevaDisponibilidad} onChange={(e) => setNuevaDisponibilidad(e.target.value)}>
                                    <option disabled={true}value="">Seleccionar horario</option>

                                    {disponibilidades.map((dispo) => (
                                        <option key={dispo.id} value={dispo.id}>
                                            {`Médico: ${dispo.medico} | Establecimiento: ${dispo.establecimiento} | Inicio: ${new Date(dispo.fechaInicio).toLocaleString("es-Ar", { hour12: false })} | Fin: ${new Date(dispo.fechaFin).toLocaleString("es-Ar", { hour12: false })}`}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    onClick={confirmarReprogramacion} disabled={!nuevaDisponibilidad}>
                                    Confirmar
                                </button>

                                <button onClick={() => {
                                    setTurnoSeleccionado(null)
                                    setNuevaDisponibilidad("");

                                    }}>
                                    Cancelar
                                </button>
                            </div>
                        )}

                    </div>
                )
            })}

        </div>
    )
}

export default TurnosMedico;
