import "./Footer.css"

import {Link} from "react-router-dom"


function Footer() {
    return (
        <footer>
            <div className="SectorArriba">
                <div className="Sector1">
                    <Link to="/">Gestor de Turnos</Link>
                </div>
                <div className="Sector2">
                    <p>holas</p>
                </div>
                <div className="Sector3">
                    <p>safjhasjf</p>
                </div>
                <div className="Sector4">
                    <p>holas</p>
                </div>
            </div>
            
            <div className="SectorAbajo">
                <p>© 2026 Gestor de Turnos. Todos los derechos reservados.</p>
            </div>
            
        </footer>
    )
}

export default Footer