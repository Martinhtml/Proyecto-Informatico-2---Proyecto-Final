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
  administrador:   '*'

}

const seedRoles = async () => {
  const permisos = {}
  for (const [tabla, accion] of PERMISOS) {
    const [permiso] = await Permisos.findOrCreate({ where: { tabla, accion } })
    permisos[`${tabla}:${accion}`] = permiso
  }
  
  for (const [nombre, lista] of Object.entries(ROLES)) {
    const [rol] = await Rol.findOrCreate({ where: { nombre } })

    const nombresPermisos = lista === '*' ? Object.keys(permisos) : normalizarPermisos(lista)

    const filas = [...new Set(nombresPermisos)].map((nombrePermiso) => {
        if (!permisos[nombrePermiso]) {
            throw new Error(`El permiso "${nombrePermiso}" del rol ${nombre} no está en PERMISOS`)
        }
        return permisos[clave]
    })

    await rol.addPermisos(filas)
}

}
