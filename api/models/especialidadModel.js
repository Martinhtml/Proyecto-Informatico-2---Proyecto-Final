const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const Especialidad = sequelize.define(
    "Especialidades", {
        "nombre" : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        tablename : "Especialidades",
        timestamps : false
    }
)


module.exports = Especialidad;