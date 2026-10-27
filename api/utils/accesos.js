const { User, Rol, Permisos } = require('../models/index')

const ROL_MODO = "medico"

const obtenerAccesos = async (usuarioID) => {
    const usuario = await User.findByPk(usuarioID, {
        include: [{
            model: Rol,
            through: { attributes: [] },
            include: [{ model: Permisos, through: { attributes: [] } }]
        }]
    })
    
    if (!usuario) return null

    const roles = usuario.Roles || []
    
    return {
        roles: roles.map((rol) => rol.nombre),
        permisos: new Set(
            roles.flatMap((rol) => rol.Permisos.map((p) => `${p.tabla}:${p.accion}`))
        )
    }
}


const usuarioTienePermiso = async (usuarioID, tabla, accion) => {
    const accesos = await obtenerAccesos(usuarioID)
    if (!accesos) return false
    return accesos.permisos.has(`${tabla}:${accion}`)
}


module.exports = { obtenerAccesos, usuarioTienePermiso }