const {Sequelize} = require("sequelize")


const sequelize = new Sequelize("GestorTurnos", "root", '', {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    timezone: "-03:00"
});


module.exports = {
    sequelize
}

