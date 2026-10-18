const {Rol, User} = require('../models')
const { registrarEventoBitacora } = require('./bitacoraController')




const asignarRolNombre = async (usuarioID, nombreRol) => {
    

    const usuario = await User.findByPk(usuarioID)
    const rol = await Rol.findOne({where: {nombre : nombreRol}})

    if(!usuario || !rol){
      console.error(`No se pudo asignar el rol ${nombreRol}`, error.message)  
    }
    await usuario.addRol(rol)

    await registrarEventoBitacora({ idUser: usuarioID, accion : "ASIGNAR ROL", descripcion : `El usuario ${usuarioID} se le asigno el  rol ${nombreRol}`})

}


module.exports = {
    asignarRolNombre
}