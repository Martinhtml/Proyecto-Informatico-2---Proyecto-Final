const {Rol, User} = require('../models/index')
const { registrarEventoBitacora } = require('./bitacoraController')




const asignarRolNombre = async (usuarioID, nombreRol) => {
    

    const usuario = await User.findByPk(usuarioID)
    const rol = await Rol.findOne({where: {nombre : nombreRol}})

    if(!usuario || !rol){
      console.error(`No se pudo asignar el rol ${nombreRol}`, error.message);
      return;
    }
    await usuario.addRoles(rol);

    await registrarEventoBitacora({ idUser: usuarioID, accion : "ASIGNAR ROL", descripcion : `El usuario ${usuarioID} se le asigno el  rol ${nombreRol}`})

}


const obtenerMisRoles = async (req, res) => {
    try {
        const usuario = await User.findByPk(req.user.id)
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" })
        }
        const roles = await usuario.getRoles()
        return res.status(200).json(roles.map((rol) => rol.nombre))
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const listarRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll({ order: [['id', 'ASC']] })
        return res.status(200).json(roles)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const asignarRolAUsuario = async (req, res) => {
    try {
        const { usuarioID, rolID } = req.body
 
        if (!usuarioID || !rolID) {
            return res.status(400).json({ message: "Faltan datos" })
        }
 
        const usuario = await User.findByPk(usuarioID)
        const rol = await Rol.findByPk(rolID)
        if (!usuario || !rol) {
            return res.status(404).json({ message: "Usuario o rol no encontrado" })
        }
 
        if (await usuario.hasRol(rol)) {
            return res.status(409).json({ message: "El usuario ya tiene ese rol" })
        }
 
        await usuario.addRol(rol)
 
        await registrarEventoBitacora({
            idUser: req.user.id,
            accion: 'ASIGNAR ROL',
            descripcion: `El usuario ${req.user.id} le asignó el rol ${rol.nombre} a ${usuario.email}`
        })
 
        return res.status(201).json({ message: "Rol asignado" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const quitarRolDeUsuario = async (req, res) => {
    try {
        const { usuarioID, rolID } = req.params
 
        if (Number(usuarioID) === req.user.id) {
            return res.status(400).json({ message: "No podés quitarte roles a vos mismo" })
        }
 
        const usuario = await User.findByPk(usuarioID)
        const rol = await Rol.findByPk(rolID)
        if (!usuario || !rol) {
            return res.status(404).json({ message: "Usuario o rol no encontrado" })
        }
 
        if (!(await usuario.hasRol(rol))) {
            return res.status(404).json({ message: "El usuario no tiene ese rol" })
        }
 
        
        if (rol.nombre === "administrador" && (await rol.countUsers()) <= 1) {
            return res.status(400).json({ message: "No se puede quitar el rol al único administrador" })
        }
 
        await usuario.removeRole(rol)
 
        await registrarEventoBitacora({
            idUser: req.user.id,
            accion: 'QUITAR ROL',
            descripcion: `El usuario ${req.user.id} le quitó el rol ${rol.nombre} a ${usuario.email}`
        })
 
        return res.status(200).json({ message: "Rol quitado" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports = {
    asignarRolNombre,
    obtenerMisRoles,
    listarRoles,
    asignarRolAUsuario,
    quitarRolDeUsuario
}