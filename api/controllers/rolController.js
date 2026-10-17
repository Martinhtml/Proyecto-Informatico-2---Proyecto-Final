const { User, Rol, Permisos, RolUsuario, PermisoRol } = require('../models')
const { registrarEvento } = require('./bitacoraController')

const RolesUser = ['admin','medico','paciente']