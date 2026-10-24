const {Router} = require("express")

const {verificarToken} = require("../middlewares/auth");

const router = Router();

router.get("/validarToken", verificarToken);


module.exports = router

