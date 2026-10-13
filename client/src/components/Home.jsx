import "./Home.css"
import fotoPrincipal from "../assets/img1.png"



function Home(){

    return (<>
        <div>
            <div>
            <img id="FotoPrincipal" src={fotoPrincipal} alt="" />
          </div>
          <div className="contenedorTarjetas">
                    <div className="Tarjeta">
                        <div className="tarjetaInterior">
                            <div className="tarjetaFrente">
                                <h2>Nro 1 EN CLIENTES SATISFECHOS</h2>   
                            </div>
                            <div className="tarjetaAtras">
                                <p>El pasado año nuestro gestor de turnos recibio el primer lugar en clientes satisfechos</p>
                            </div>    
                        </div>    
                    </div>
                    <div className="Tarjeta">
                        <div className="tarjetaInterior">
                            <div className="tarjetaFrente">
                                <h2>GESTIONA TODOS TUS TURNOS MEDICOS</h2>
                            </div>
                            <div className="tarjetaAtras">
                                <p>Con nuestra pagina podras gestionar todos tus turnos medicos</p>
                            </div>

                        </div>    
                    </div>
                    <div className="Tarjeta">
                        <div className="tarjetaInterior">
                            <div className="tarjetaFrente">
                                <h2>REVISA DIARIAMENTE LA PAGINA</h2>
                            </div>
                            <div className="tarjetaAtras">
                                <p>Entra todos los dias a nuestra pagina web para no perderte de ningun turno</p>
                            </div>
                        </div>
                    </div>
          </div>
        </div>
    
    </>)
}

export default Home;