const User = require("./userModel");
const Rol = require("./rolModel");
const Especialidad = require("./especialidadModel");
const Establecimiento = require("./establecimiento");
const DVV = require("./DVVModel");
const InicioSesion = require("./inicioSesionModel");
const Bitacora = require("./bitacoraModel");
const Permisos = require("./permisosModel");
const Turno = require("./turnoModel");
const Disponibilidad = require("./disponibilidadModel");



//Especialidad y User
User.belongsToMany(Especialidad, { through: "User_Especialidad" });
Especialidad.belongsToMany(User, { through: "User_Especialidad" });

//Usuario y Rol
User.belongsToMany(Rol, { through: "User_Rol" });
Rol.belongsToMany(User, { through: "User_Rol" });

//Permisos y Rol
Rol.belongsToMany(Permisos, { through: "Rol_Permisos" });
Permisos.belongsToMany(Rol, { through: "Rol_Permisos" });

//Permisos y User
User.belongsToMany(Permisos, { through: "User_Permisos" });
Permisos.belongsToMany(User, { through: "User_Permisos" });

//Turno y User
User.hasMany(Turno, { foreignKey: "pacienteID" });
Turno.belongsTo(User, { foreignKey: "pacienteID" });

//User y Disponibilidad
User.hasMany(Disponibilidad, { foreignKey: "medicoID" });
Disponibilidad.belongsTo(User, { foreignKey: "medicoID" });

//Disponibilidad y Turno
Turno.belongsTo(Disponibilidad, { foreignKey: "disponibilidadID" });
Disponibilidad.hasOne(Turno, { foreignKey: "disponibilidadID" });

//Disponibilidad y Establecimiento
Disponibilidad.belongsTo(Establecimiento, { foreignKey: "establecimientoID" });
Establecimiento.hasMany(Disponibilidad, { foreignKey: "establecimientoID" });

//User y Bitacora
User.hasMany(Bitacora, { foreignKey: "usuarioID" });
Bitacora.belongsTo(User, { foreignKey: "usuarioID" });

//Inicio Sesion y User
User.hasOne(InicioSesion, { foreignKey: "usuarioID" });
InicioSesion.belongsTo(User, { foreignKey: "usuarioID" });

module.exports = {
    User,
    Rol,
    Especialidad,
    Establecimiento,
    DVV,
    InicioSesion,
    Bitacora,
    Permisos, 
    Turno,
    Disponibilidad
};