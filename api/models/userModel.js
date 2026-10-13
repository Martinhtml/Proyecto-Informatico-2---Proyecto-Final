const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const User = sequelize.define(
    "User", {
        "nombre" : {
            type : DataTypes.STRING,
            allowNull : false
        },
        "apellido" : {
            type : DataTypes.STRING,
            allowNull : false
        },
        "dni" : {
            type : DataTypes.INTEGER,
            allowNull : false,
            unique : true
        },
        "email" : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
            validate :  {
                isEmail : true
            }
        },
        "contraseña" : {
            type : DataTypes.STRING,
            allowNull : false
        },
        "DigitoVHUser" : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        timestamps : false
    }
)


module.exports = User;