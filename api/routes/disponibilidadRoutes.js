const {Router} = require("express")

const auth = require("../middlewares/auth");
const { subirDisponibilidad } = require("../controllers/disponibilidadController")

const router = Router()

router.post("/subirDispo", auth, subirDisponibilidad)

module.exports = router




