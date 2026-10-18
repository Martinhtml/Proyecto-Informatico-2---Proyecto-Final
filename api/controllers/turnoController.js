
const { use } = require("react")
const {Turno, User} = require("../models/index.js")
const { calcularDVH } = require("../utils/digitoVerificador.js")


const verTurnosId = async (req, res)=>{
    try{
        const userId = req.user.id
        const user = await User.findByPk(userId)
        const turnos = await user.getTurnos()
        if (turnos.length === 0){
            return res.status(404).json({message : "El usuario no tiene turnos"})
        }
        console.log(turnos)
        res.status(200).json(turnos)
    }catch(error){
        return res.status(500).json({error : error.message})
    }
}

const obtenerTurno = async (req, res)=>{
    try{
        const userId = req.user.id
        const disponibilidadId = req.params.disponibilidadId
        // const user = await User.findByPk(userId)

        if (!disponibilidadId){
            return res.status(400).json({"message" : "Faltan datos"})
        }

        const estado = "Pendiente"

        const dvh = calcularDVH(userId, disponibilidadId, estado)

        let dvhsTot = await Turno.findAll({attributes : ['DigitoVHTurno']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHTurno)
        dvhsTot.push(dvh)

        await calcularDVV("turnos", dvhsTot)
        
        const turno = await Turno.create({
            pacienteID: userId,
            disponibilidadID : disponibilidadId,
            estado : estado,
            DigitoVHTurno : dvh
        })

        await registrarEventoBitacora({
            idUser : userId,
            accion : "RESERVAR TURNO",
            descripcion : `El paciente: ${userId} reservo un turno`
        })

        return res.status(201).json(turno)

    }catch(error){
        return res.status(500).json(error)
    }
}





// const conseguirTurno = async (req, res)=>{
//     try{

//     }catch(error){
//         return res.status(500).json(error)
//     }
// }



module.exports = {
    verTurnosId,
    obtenerTurno
}