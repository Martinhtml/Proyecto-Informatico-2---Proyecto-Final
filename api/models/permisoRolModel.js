const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
 
const PermisoRol = sequelize.define(
    "PermisosRoles", {
        "permisoID" : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        "rolID" : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    },{
        tableName : "Permisos_Roles",
        timestamps : false,
        indexes : [
            { unique : true, fields : ["permisoID", "rolID"] }
        ]
    }
)
 
 
module.exports = PermisoRol;
 