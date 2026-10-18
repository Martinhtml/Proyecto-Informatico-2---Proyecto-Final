const {Rol, Permisos} = require('../models')

const PERMISOS = [
  ['Disponibilidad', 'create'],   
  ['Disponibilidad', 'read'],     
  ['Disponibilidad', 'delete'],
  ['Disponibilidad', 'update'],   
  ['Turnos', 'create'],           
  ['Turnos', 'read'],             
  ['Turnos', 'update'],           
  ['Turnos', 'delete'],           
  ['Usuarios', 'read'],           
  ['Usuarios', 'delete'],
  ['Usuarios', 'update'],         
  ['Roles', 'update'],
  ['Roles', 'create'],
  ['Roles', 'read'],
  ['Roles', 'delete'],            
  ['Bitacora', 'read'],
  ['Bitacora', 'create'],
  ['Bitacora', 'delete'],
  ['Bitacora', 'update'],
]


const ROLES = {
  paciente: [
    'Disponibilidad:read', 'Turnos:create', 'Turnos:read', 'Turnos:delete'
  ],
  medico: [
    'Disponibilidad:read', 'Disponibilidad:create', 'Disponibilidad:delete',
    'Turnos:read', 'Turnos:update'
  ],
  administrador:   [
  'Disponibilidad', 'create',   
  'Disponibilidad', 'read',     
  'Disponibilidad', 'delete',
  'Disponibilidad', 'update',   
  'Turnos', 'create',           
  'Turnos', 'read',             
  'Turnos', 'update',           
  'Turnos', 'delete',           
  'Usuarios', 'read',           
  'Usuarios', 'delete',
  'Usuarios', 'update',         
  'Roles', 'update',
  'Roles', 'create',
  'Roles', 'read',
  'Roles', 'delete',            
  'Bitacora', 'read',
  'Bitacora', 'create',
  'Bitacora', 'delete',
  'Bitacora', 'update',]

}

const seedRoles = async () => {
  const permisos = {}
  for (const [tabla, accion] of PERMISOS) {

    
  }}