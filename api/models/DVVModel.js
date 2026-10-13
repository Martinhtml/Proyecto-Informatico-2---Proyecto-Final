const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const DVV = sequelize.define(
    "DVV", {
        "nombreTabla" : {
            type : DataTypes.STRING,
            allowNull : false,
            primaryKey : true
        },
        "DVV" : {
            type : DataTypes.STRING,
            allowNull : false
        },
        "fechaModif" : {
            type : DataTypes.DATE,
            allowNull : false
        }
    },{
        tablename : "DVV",
        timestamps : false
    }
)


module.exports = DVV;