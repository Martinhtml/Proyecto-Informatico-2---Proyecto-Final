import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { jsPDF } from "jspdf";


import "./MisTurnos.css"



function MisTurnos(){

    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [nuevaDisponibilidad, setNuevaDisponibilidad] = useState("");
    

    const [turnos, setTurnos] = useState([])
    const [turnosDatos, setTurnosDatos] = useState([])


    const descargarPDF = (turno)=>{
        const pdf = new jsPDF();
        pdf.setFontSize(20)
        pdf.text("Datos del turno: ", 20, 20)

        pdf.setFontSize(12);
        pdf.text(`Numero del turno: ${turno.id}`, 20, 40);
        pdf.text(`Paciente: ${turno.paciente}`, 20, 50)
        pdf.text(`Medico: ${turno.medico}`, 20, 60)
        pdf.text(`Establecimiento: ${turno.establecimiento}`, 20, 70)

        pdf.text(`Fecha de inicio del turno: ${new Date(turno.fechaInicio).toLocaleString("es-Ar", { hour12: false })}`, 20, 80)
        pdf.text(`Fecha de fin del turno: ${new Date(turno.fechaFin).toLocaleString("es-Ar", { hour12: false })}`, 20, 90)
        pdf.text(`Estado del turno: ${turno.estado}`, 20, 100)

        pdf.save(`turno${turno.id}.pdf`);

    }


    const actualizarTurnos = async () => {
        const lista = await getTurnos();

        if (lista) {
            await getDatos(lista);
        }
    }


        const cargarDisponibilidades = async() => {
        try{
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:3000/disponibilidad/getDispos",
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

                <button onClick={()=> descargarPDF(turno)}>
                    Descargar
                </button>

                {turno.estado === "Pendiente" && (
                    <div className="botonesTurno">
                        <button onClick={() => cancelarTurno(turno.id)}>
                            Cancelar
                        </button>

                        <button onClick={() => iniciarReprogramacion(turno.id)}>
                            Reprogramar
                        </button>
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
                )}
            </div>
        })}
        
        </div>)
}



export default MisTurnos;