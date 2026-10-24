const {Router} = require("express")

const {verificarToken, auth, usuarioTienePermisoFront} = require("../middlewares/auth");

const router = Router();

router.get("/validarToken", verificarToken);
router.get("/verPermiso/:tabla/:accion", auth, usuarioTienePermisoFront);

module.exports = router

