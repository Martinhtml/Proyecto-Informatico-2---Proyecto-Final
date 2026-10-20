const {Router} = require("express")


const { buscarEstablecimientos } = require("../controllers/establecimientoController")

const router = Router();

router.get("/getEstablecimientos", buscarEstablecimientos)


module.exports = router;