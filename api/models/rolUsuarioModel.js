const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
 
const RolUsuario = sequelize.define(
    "RolesUsuarios", {
        "usuarioID" : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        "rolID" : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    },{
        tableName : "Roles_Usuarios",
        timestamps : false,
        indexes : [
            { unique : true, fields : ["usuarioID", "rolID"] }
        ]
    }
)
 
 
module.exports = RolUsuario;
