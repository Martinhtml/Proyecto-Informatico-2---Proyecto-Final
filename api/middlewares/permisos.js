const { obtenerAccesos } = require('../utils/accesos')

const tienePermiso = (tabla, accion) => async (req,res,next) =>{ //next: es una funciom para seguir con lo que viene dspz
    try {
        
        const accesos = await obtenerAccesos(req.user.id, req.user.modo)
        
        if (!accesos) {
            return res.status(401).json({ error: "La cuenta ya no existe" })
        }

        if (!accesos.permisos.has(`${tabla}:${accion}`)) {
            return res.status(403).json({ message: "No tenés permiso para esta acción" })
        }
        req.user.roles = accesos.roles
        next()
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { tienePermiso }     