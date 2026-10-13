const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const Rol = sequelize.define(
    "Roles", {
        "nombre" : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        tablename : "Roles",
        timestamps : false
    }
)


module.exports = Rol;