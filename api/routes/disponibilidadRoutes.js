const {Router} = require("express")

const {auth} = require("../middlewares/auth");
const { tienePermiso } = require("../middlewares/permisos");
const { subirDisponibilidad, getDispos, chequearDispo, getDispoId } = require("../controllers/disponibilidadController")

const router = Router();

router.post("/subirDispo", auth, tienePermiso("Disponibilidad", "create"), subirDisponibilidad);

router.get("/getDispos", auth, tienePermiso("Disponibilidad", "read"), getDispos);
router.get("/chequearDispo/:id", chequearDispo);
router.get("/getDispoId/:id", auth, getDispoId);

module.exports = router




