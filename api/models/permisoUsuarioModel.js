const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
 
const PermisoUsuario = sequelize.define(
    "PermisosUsuarios", {
        "permisoID" : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        "usuarioID" : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    },{
        tableName : "Permisos_Usuarios",
        timestamps : false,
        indexes : [
            { unique : true, fields : ["permisoID", "usuarioID"] }
        ]
    }
)
 
 
module.exports = PermisoUsuario;
 