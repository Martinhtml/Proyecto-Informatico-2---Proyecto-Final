const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const Disponibilidad = sequelize.define(
    "Disponibilidades", {
        "fechaInicio" : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        "fechaFin" : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        "medicoID" : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        "establecimientoID" : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        "DigitoVHDisponibilidad" : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        tablename : "Disponibilidades",
        timestamps : false
    }
)


module.exports = Disponibilidad;