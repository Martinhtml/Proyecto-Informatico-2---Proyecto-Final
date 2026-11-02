const {Router} = require("express")

const {auth} = require("../middlewares/auth");
const { tienePermiso } = require("../middlewares/permisos");
const {verTurnosId, obtenerTurno, completarTurno, cancelarTurno, getTurnosMedico, reprogramarTurno} = require("../controllers/turnoController")

const router = Router();

router.get("/getTurnosByID", auth,tienePermiso("Turnos","read") , verTurnosId)
router.get("/getTurnosMedico", auth, tienePermiso("Turnos", "read"), getTurnosMedico);


router.post("/obtenerTurno/:disponibilidadId", auth, obtenerTurno)

router.patch("/completarTurno/:id", auth, completarTurno)
router.patch("/cancelarTurno/:id", auth, cancelarTurno)
router.patch("/reprogramarTurno/:id", auth, tienePermiso("Turnos", "update"), reprogramarTurno)


module.exports = router;