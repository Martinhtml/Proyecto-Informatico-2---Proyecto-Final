const {Router} = require("express")

const auth = require("../middlewares/auth");
const { tienePermiso } = require("../middlewares/permisos");
const {verTurnosId, obtenerTurno} = require("../controllers/turnoController")

const router = Router();

router.get("/getTurnosByID", auth,tienePermiso("Turnos","read") , verTurnosId)

router.post("/obtenerTurno/:disponibilidadId", auth, tienePermiso("Turnos", "create"), obtenerTurno)

module.exports = router;