const {Router} = require("express")

const auth = require("../middlewares/auth");
const { subirDisponibilidad, getDispos } = require("../controllers/disponibilidadController")

const router = Router();

router.post("/subirDispo", auth, subirDisponibilidad);

router.get("/getDispos", auth, getDispos);

module.exports = router




