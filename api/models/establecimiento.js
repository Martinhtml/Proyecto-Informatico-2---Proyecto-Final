const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Establecimiento = sequelize.define(
    "Establecimiento", {
        "nombre" : {
            type : DataTypes.STRING,
            allowNull : false
        },
        "direccion" : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        tablename : "Establecimiento",
        timestamps : false
    }
)


module.exports = Establecimiento;