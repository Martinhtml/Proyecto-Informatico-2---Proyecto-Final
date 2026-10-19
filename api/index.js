const express = require("express");
const server = express();
server.use(express.json());
server.use(express.static('public'))
const { User } = require("./models/index");
const bcrypt = require("bcrypt");


const {sequelize} = require("./config/db")
require("./models/index.js")

const seedRoles = require("./utils/seedRoles");


const userRoutes = require("./routes/userRoutes");
const turnosRoutes = require("./routes/turnosRoutes");
const dispoRoutes = require("./routes/disponibilidadRoutes")

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH ,DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

server.use("/user", userRoutes);
server.use("/turnos", turnosRoutes);
server.use("/disponibilidad", dispoRoutes);


server.listen(3000, async ()=>{

    await sequelize.authenticate();
    await sequelize.sync({force : true});
    console.log("El server esta prendido en el puerto 3000")
    await User.create({ "nombre": "Martin", "apellido": "Donnari", "email": "donnari.martinet36@gmail.com", "contraseña": (await bcrypt.hash("1234", 12)), "dni": 49123638, "DigitoVHUser": "1234567890" })

})