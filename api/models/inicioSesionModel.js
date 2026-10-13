const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const InicioSesion = sequelize.define(
    "IniciosSesiones", {
        "fecha" : {
            type : DataTypes.DATE,
            allowNull : false
        },
        "usuarioID" : {
            type : DataTypes.INTEGER,
            allowNull : false   
        },
        "DigitoVHInicioSesion" : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        tablename : "IniciosSesiones",
        timestamps : false
    }
)


module.exports = InicioSesion;