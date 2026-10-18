const {Router} = require("express")

const auth = require("../middlewares/auth");
const {iniciarSesion, register, obtenerNombreUsuario, obtenerUsuario} = require("../controllers/userController");


const router = Router();


router.post("/register", register);
router.post("/login", iniciarSesion);
router.get("/obtenerNombreUsuario", auth, obtenerNombreUsuario);
router.get("/obtenerUsuario", auth, obtenerUsuario)

module.exports = router;
