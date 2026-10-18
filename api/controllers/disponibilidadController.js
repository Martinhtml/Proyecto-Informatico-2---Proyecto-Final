
const {Disponibilidad} = require("../models/index.js")
const { calcularDVH } = require("../utils/digitoVerificador")
const { registrarEventoBitacora } = require("./bitacoraController.js")
const { calcularDVV } = require("./DVVController.js")



const subirDisponibilidad = async(req, res)=>{
    try{
        const medicoID = req.user.id
        const {fechaInicio, fechaFin, establecimientoID} = req.body

        if (!fechaInicio, !fechaFin, !establecimientoID){
            return res.status(400).json({"message" : "Faltan datos"})
        }

        const dvh = calcularDVH(fechaInicio, fechaFin, medicoID, establecimientoID)

        let dvhsTot = await Disponibilidad.findAll({attributes : ['DigitoVHDisponibilidad']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHDisponibilidad)
        dvhsTot.push(dvh)

        await calcularDVV("disponibilidades", dvhsTot)

        await registrarEventoBitacora({
            idUser : medicoID,
            accion : "SUBIR DISPONIBILIDAD",
            descripcion : `El medico: ${medicoID} subio un horario en el que estara disponible`
        })

        const dispon = await Disponibilidad.create({
            medicoID : medicoID,
            fechaInicio,
            fechaFin,
            establecimientoID
        })
        return res.status(201).json(dispon)

    }catch(error){
        return res.status(500).json(error)
    }
}



module.exports = {
    subirDisponibilidad

}