const {Router} = require("express")

const {auth} = require("../middlewares/auth");
const { recuperarPass, iniciarSesion,iniciarSesionMedico, register, obtenerNombreUsuario, obtenerUsuario, editarUser, obtenerDatosUsuario, borrarCuenta, cambiarPassword, enviarMail} = require("../controllers/userController");


const router = Router();


router.post("/register", register);
router.post("/login", iniciarSesion);
router.post("/loginMedico", iniciarSesionMedico)
router.post("/recuperarContra", auth, enviarMail)
router.post("/enviarMail", enviarMail);

router.get("/obtenerNombreUsuario", auth, obtenerNombreUsuario);
router.get("/obtenerUsuario", auth, obtenerUsuario);
router.get("/getDatosUser/:id", auth, obtenerDatosUsuario);



router.patch("/editProf", auth, editarUser);
router.patch("/cambiarPass", auth, cambiarPassword);
router.patch("/recuperarContra", recuperarPass);


router.delete("/eliminarCuenta", auth, borrarCuenta);

module.exports = router;
