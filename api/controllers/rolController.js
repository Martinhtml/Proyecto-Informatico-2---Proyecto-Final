const {Rol, User} = require('../models')
const { registrarEventoBitacora } = require('./bitacoraController')



await registrarEventoBitacora({ idUser: req.user.usuarioID, accion, descripcion })

const asignarRolNombre = async (usuarioID, nombreRol) => {
    const usuario = await User.findByPk(usuarioID)
    const rol = await Rol.findOne({where: {nombre : nombreRol}})

    if(!usuario || !rol){
      console.error('`No se pudo asignar el rol ${nombreRol}', error.message)  
    }
    await usuario.addRol(rol)
}


module.exports = {
    asignarRolNombre
}