
const {Disponibilidad} = require("../models/index.js")
const { calcularDVH } = require("../utils/digitoVerificador")
const { calcularDVV } = require("./DVVController.js")



const subirDisponibilidad = async(req, res)=>{
    try{
        const medicoID = req.user.id
        const {fechaInicio, fechaFin, establecimientoID} = req.body
        const dvh = calcularDVH(fechaInicio, fechaFin, medicoID, establecimientoID)

        let dvhsTot = await Disponibilidad.findAll({attributes : ['DigitoVHDisponibilidad']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHDisponibilidad)
        dvhsTot.push(dvh)
        await calcularDVV("disponibilidades", )



    }catch(error){
        return res.status(500).json(error)
    }
}