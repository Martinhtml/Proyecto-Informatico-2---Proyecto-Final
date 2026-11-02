import axios from "axios"
import { useState, useEffect } from "react"

import "./panel.css"


const URL_ROLES = "http://localhost:3000/roles"
    
function Panel(){
    const [usuarios, setUsuarios] = useState([])
    const [roles, setRoles] = useState([])
    const [elegido, setElegido] = useState({})
    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" })
    const [cargando, setCargando] = useState(true)
    const [ocupado, setOcupado] = useState(false)

    const headers = () => ({ headers: { authorization: `Bearer ${localStorage.getItem("token")}` } })

    const textoDeError = (error, porDefecto) =>
        error.response?.data?.message || error.response?.data?.error || porDefecto


    const cargarDatos = async () => {
        try{
            const [resUsuarios, resRoles] = await Promise.all([
                axios.get(`${URL_ROLES}/usuarios`, headers()),
                axios.get(URL_ROLES, headers())
            ])
            setUsuarios(resUsuarios.data)
            setRoles(resRoles.data)
        }catch(error){
            setMensaje({ texto: textoDeError(error, "No se pudieron cargar los usuarios"), tipo: "error" })
        }finally{
            setCargando(false)
        }
    }

     useEffect(() => {
        cargarDatos()
    }, [])

    const agregarRol = async (usuarioID) => {
        const rolID = elegido[usuarioID]
        if (!rolID) return
 
        setOcupado(true)
        try{
            const response = await axios.post(`${URL_ROLES}/usuarios`, { usuarioID, rolID: Number(rolID) }, headers())
            setMensaje({ texto: response.data.message, tipo: "ok" })
            setElegido({ ...elegido, [usuarioID]: "" })
            await cargarDatos()
        }catch(error){
            setMensaje({ texto: textoDeError(error, "No se pudo asignar el rol"), tipo: "error" })
        }finally{
            setOcupado(false)
        }
    }

    const quitarRol = async (usuarioID, rolID) => {
        setOcupado(true)
        try{
            const response = await axios.delete(`${URL_ROLES}/usuarios/${usuarioID}/${rolID}`, headers())
            setMensaje({ texto: response.data.message, tipo: "ok" })
            await cargarDatos()
        }catch(error){
            setMensaje({ texto: textoDeError(error, "No se pudo quitar el rol"), tipo: "error" })
        }finally{
            setOcupado(false)
        }
    }

    const idsGestionables = new Set(roles.filter((rol) => rol.gestionable).map((rol) => rol.id))
return(<>
        <div id="ContPanel">
            <div id="panel">
                <h1>Panel de control</h1>
                <p className="subtitulo">Roles de los usuarios</p>
 
                <p className={`mensaje ${mensaje.tipo}`}>{mensaje.texto}</p>
 
                {cargando ? (
                    <p className="subtitulo">Cargando...</p>
                ) : (
                    <div className="contenedorTabla">
                        <table>
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Email</th>
                                    <th>Roles</th>
                                    <th>Agregar rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((u) => {
                                    const disponibles = roles.filter(
                                        (rol) => rol.gestionable && !u.roles.some((r) => r.id === rol.id)
                                    )
 
                                    return (
                                        <tr key={u.id} className={u.esMio ? "filaPropia" : ""}>
                                            <td>{u.nombre} {u.apellido}{u.esMio && " (vos)"}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <div className="listaRoles">
                                                    {u.roles.map((rol) => (
                                                        <span className="rol" key={rol.id}>
                                                            {rol.nombre}
                                                            {idsGestionables.has(rol.id) && !u.esMio && (
                                                                <button
                                                                    className="quitarRol"
                                                                    title={`Quitar el rol ${rol.nombre}`}
                                                                    disabled={ocupado}
                                                                    onClick={() => quitarRol(u.id, rol.id)}
                                                                >✕</button>
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="agregarRol">
                                                    <select
                                                        value={elegido[u.id] || ""}
                                                        onChange={(e) => setElegido({ ...elegido, [u.id]: e.target.value })}
                                                    >
                                                        <option value="">Elegir rol...</option>
                                                        {disponibles.map((rol) => (
                                                            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        className="btnAgregar"
                                                        disabled={ocupado || !elegido[u.id]}
                                                        onClick={() => agregarRol(u.id)}
                                                    >Agregar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    </>)
}
 
 
export default Panel