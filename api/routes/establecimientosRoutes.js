const {Router} = require("express")


const { buscarEstablecimientos, buscarEstablecimientoID } = require("../controllers/establecimientoController")

const router = Router();

router.get("/getEstablecimientos", buscarEstablecimientos);
router.get("/getEstByID/:id", buscarEstablecimientoID);


module.exports = router;