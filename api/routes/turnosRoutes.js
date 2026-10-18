const {Router} = require("express")

const auth = require("../middlewares/auth");
const {verTurnosId, obtenerTurno} = require("../controllers/turnoController")

const router = Router()

router.get("/getTurnosByID", auth, verTurnosId)

router.post("/obtenerTurno/:disponibilidadId", auth, obtenerTurno)

module.exports = router;