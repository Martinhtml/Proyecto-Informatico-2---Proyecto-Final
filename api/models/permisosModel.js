
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Permisos = sequelize.define(
    "Permisos", {
        "tabla" : {
            type : DataTypes.STRING,
            allowNull : false
        },
        "accion" : {
            type : DataTypes.STRING,
            allowNull : false
        }
    }, {
        tablename : "Permisos",
        timestamps : false
    }
)

module.exports = Permisos;