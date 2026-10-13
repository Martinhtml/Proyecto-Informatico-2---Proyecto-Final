const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Bitacora = sequelize.define(
    'Bitacoras', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usuarioID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha : {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        tablename : "Bitacoras",
        timestamps : false
    })

module.exports = Bitacora;