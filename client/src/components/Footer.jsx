import "./Footer.css"

import {Link} from "react-router-dom"

import iconoIG from "../assets/instagram.png"
import iconoYT from "../assets/youtube.png"
import iconoWSP from "../assets/whatsapp.png"



function Footer() {
    return (
        <footer>
            <div className="SectorArriba">
                <div className="Sectores">
                    <Link to="/" id="TituloFooter">Gestor de Turnos</Link>
                </div>
                <div className="Sectores">
                    <h3>Contacto: </h3>
                    <ul>
                        <li><Link to="https://mail.google.com/mail/?view=cm&to=donnari.martinet36@gmail.com" rel="noopener noreferrer"  target="_blank">Administracion 1</Link></li>
                        <li><Link to="https://mail.google.com/mail/?view=cm&to=ocampo.joaquinet36@gmail.com" rel="noopener noreferrer"  target="_blank">Administracion 2</Link></li>

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
                    <h3>Redes: </h3>
                    <div className="Iconos">
                        <br />
                        <a href="https://www.instagram.com/_martin_2237?dlrfY3pxZGRldjV2b200">
                            <img src={iconoIG} alt="Instagram"/>
                        </a>
                        <a href="https://www.youtube.com/@MartinDonnari">
                            <img src={iconoYT} alt="Youtube"/>
                        </a>
                        <a href="https://web.whatsapp.com/">
                            <img src={iconoWSP} alt="Whatsapp"/>
                        </a>
                        
                    </div>

                </div>
            </div>
            
            <div className="SectorAbajo">
                <p>© 2026 Gestor de Turnos. Todos los derechos reservados.</p>
            </div>
            
        </footer>
    )
}

export default Footer