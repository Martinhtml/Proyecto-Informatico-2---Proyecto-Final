const { User, Rol, Permisos } = require('../models/index')

const tienePermiso = (tabla, accion) => async (req,res,next) =>{ //next: es una funciom para seguir con lo que viene dspz
    try {
        
        const usuario = await User.findByPk(req.user.id, {
            include: [{
                model: Rol,
                through: { attributes: [] },
                include: [{ model: Permisos, through: { attributes: [] } }]
            }]
        }) 
        
        if (!usuario) {
            return res.status(401).json({ error: "La cuenta ya no existe" })
        }

        const permisos = new Set(
            usuario.Roles.map((rol) => rol.Permisos.map((p) => `${p.tabla}:${p.accion}`))
        )

        if (!permisos.has(`${tabla}:${accion}`)) {
            return res.status(403).json({ message: "No tenés permiso para esta acción" })
        }
        next()
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { tienePermiso }