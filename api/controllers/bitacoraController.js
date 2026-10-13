const {Bitacora} = require('../models/index')

const registrarEventoBitacora = async ({idUser,accion,descripcion}) => {
        await Bitacora.create({
            usuarioID : idUser,
            titulo : accion,
            descripcion,
            fecha : new Date()

        })
    
}




module.exports = {registrarEventoBitacora}