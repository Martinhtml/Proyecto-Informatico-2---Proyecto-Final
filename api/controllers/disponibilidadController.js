
const {Disponibilidad, Turno} = require("../models/index.js")
const { calcularDVH } = require("../utils/digitoVerificador")
const { registrarEventoBitacora } = require("./bitacoraController.js")
const { calcularDVV } = require("./DVVController.js")


const chequearDispo = async(req, res)=>{
    try{
        const dispoId = req.params.id
        if (!dispoId) return res.status(400).json({"message" : "Faltan datos"});
        const disponibilidad = await Disponibilidad.findByPk(dispoId, {
            include:{
                model : Turno,
                attributes: ["id", "estado"]
            }
        })
        if (!disponibilidad) return res.status(200).json(false)
            
        const ocupada = disponibilidad.Turnos.some(
            (turno) => { return turno.estado !== "Cancelado"}
        );

        if (ocupada) return res.status(200).json(false);
        else return res.status(200).json(true);


    }catch(error){
        return res.status(500).json(error)
    }
}



const subirDisponibilidad = async(req, res)=>{
    try{
        const medicoID = req.user.id
        const {fechaInicio, fechaFin, establecimientoID} = req.body

        if (!fechaInicio || !fechaFin || !establecimientoID){
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
            establecimientoID,
            DigitoVHDisponibilidad : dvh
        })
        return res.status(201).json(dispon)

    }catch(error){
        return res.status(500).json(error)
    }
}


const getDispos = async(req, res)=>{
    try{
        const dispos = await Disponibilidad.findAll({attributes : {exclude : ["DigitoVHDisponibilidad"]}})
        if (dispos.length === 0){
            return res.status(400).json(["No hay disponibilidades por el momento"])
        }
        console.log(dispos)
        return res.status(200).json(dispos)

    }catch(error){
        return res.status(500).json(error)
    }
}

const getDispoId = async(req, res)=>{
    try {
        const dispoID = req.params.id
        if (!dispoID) return res.status(400).json({"message": "Faltan datos"});
        const dispo = await Disponibilidad.findByPk(dispoID);
        if (!dispo) return res.status(404).json({"message" : "Dispo no encontrada"});
        res.status(200).json(dispo);
    } catch (error) {
        return res.status(500).json(error)
    }
}


module.exports = {
    subirDisponibilidad,
    getDispos,
    chequearDispo,
    getDispoId

}