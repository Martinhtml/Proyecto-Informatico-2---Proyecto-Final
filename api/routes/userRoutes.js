const {Router} = require("express")

const {auth} = require("../middlewares/auth");
const {iniciarSesion, register, obtenerNombreUsuario, obtenerUsuario, editarUser, obtenerDatosUsuario, borrarCuenta} = require("../controllers/userController");


const router = Router();


router.post("/register", register);
router.post("/login", iniciarSesion);



router.get("/obtenerNombreUsuario", auth, obtenerNombreUsuario);
router.get("/obtenerUsuario", auth, obtenerUsuario);
router.get("/getDatosUser/:id", auth, obtenerDatosUsuario);


router.patch("/editProf", auth, editarUser);


router.delete("/eliminarCuenta", auth, borrarCuenta);

module.exports = router;
