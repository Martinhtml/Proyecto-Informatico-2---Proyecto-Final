import "./Footer.css"

import {Link} from "react-router-dom"


function Footer() {
    return (
        <footer>
            <div className="SectorArriba">
                <div className="Sectores">
                    <Link to="/" id="TituloFooter">Gestor de Turnos</Link>
                </div>
                <div className="Sectores">
                    <h3>Secciones: </h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link>Ver Turnos</Link></li>
                        <li><Link>Perfil</Link></li>
                    </ul>
                </div>
                <div className="Sectores">
                    <h3>Atencion al cliente: </h3>
                    <ul>
                        <li>Lunes a Viernes: 9:00 - 18:00</li>
                        <li>Sábados: 9:00 - 13:00</li>
                    </ul>
                </div>
                <div className="Sectores">
                    <h3>Contacto: </h3>
                    <div className="Iconos"><img src="../assets/instagram.png" alt="No funciona"/></div>

                </div>
            </div>
            
            <div className="SectorAbajo">
                <p>© 2026 Gestor de Turnos. Todos los derechos reservados.</p>
            </div>
            
        </footer>
    )
}

export default Footer