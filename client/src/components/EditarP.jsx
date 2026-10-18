import { useState } from "react";

import { Link } from "react-router-dom";

import "./EditarP.css"

function EditarP(){

     const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    const editar = ()=>{
        
    }

    return(<>
    
        <div id="contenedorLogin">
            <div className="rectangulo">
                <h1>Editar Perfil</h1>
                <br/>
                <form onSubmit={editar}>
                    <label htmlFor="Nombre">Nombre:</label>
                    <input placeholder="Nombre" type="text" id="text" onChange={(e) => setNombre(e.target.value)}/>
                    <br/>
                    <label htmlFor="password">Contraseña:</label>
                    <input placeholder="Contraseña" type="password" id="password" onChange={(e) => setApellido(e.target.value)}/>
                    <br/>
                    <button type="submit">Confirmar</button>
                    <br/>
                    {/* <p>{mensaje}</p> */}

                </form>
                <br />
                <p><Link to="/perfil">Volver</Link></p>
            </div>
            
        </div>

    </>)
}

export default EditarP;