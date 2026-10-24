const {Router} = require("express")

const {auth} = require("../middlewares/auth");
const {iniciarSesion, register, obtenerNombreUsuario, obtenerUsuario, editarUser, obtenerDatosUsuario} = require("../controllers/userController");


const router = Router();


router.post("/register", register);
router.post("/login", iniciarSesion);



router.get("/obtenerNombreUsuario", auth, obtenerNombreUsuario);
router.get("/obtenerUsuario", auth, obtenerUsuario)
router.get("/getDatosUser/:id", auth, obtenerDatosUsuario)


router.patch("/editProf", auth, editarUser)

module.exports = router;
