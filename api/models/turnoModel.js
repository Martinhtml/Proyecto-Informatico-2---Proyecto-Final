const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const Turno = sequelize.define(
    "Turno", {
        "pacienteID" : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        "disponibilidadID" : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        "estado" : {
            type : DataTypes.ENUM("Pendiente", "Terminado", "Completado", "Cancelado"),
            allowNull : false,
        },
        "DigitoVHTurno" : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        timestamps : false
    }
)


module.exports = Turno;