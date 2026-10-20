const {Router} = require("express")

const auth = require("../middlewares/auth");
const { tienePermiso } = require("../middlewares/permisos");
const {obtenerMisRoles, listarRoles, asignarRolAUsuario, quitarRolDeUsuario} = require("../controllers/rolController")
const router = Router();


router.get("/mios", auth, obtenerMisRoles)

router.get("/", auth, tienePermiso("Roles", "read"), listarRoles)
// router.post("/usuarios", auth, tienePermiso("Roles", "update"), asignarRolAUsuario)
router.delete("/usuarios/:usuarioID/:rolID", auth, tienePermiso("Roles", "update"), quitarRolDeUsuario)
 
module.exports = router;