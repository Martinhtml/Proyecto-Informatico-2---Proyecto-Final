
const {Turno, User, Disponibilidad} = require("../models/index.js")
const { calcularDVH } = require("../utils/digitoVerificador.js")
const {registrarEventoBitacora} = require("./bitacoraController.js")
const {calcularDVV} = require("./DVVController.js")


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

const cancelarTurno = async(req, res)=>{
    try{
        const userId = req.user.id
        const turnoID = req.params.id;

        const turno = await Turno.findByPk(turnoID);

        if (!turno) {
            return res.status(404).json({message: "Turno inexistente"});
        }
        if (turno.estado !== "Pendiente") {
            return res.status(400).json({ message: "El turno ya no está pendiente" });
        }

        turno.estado = "Cancelado";
        
        const dvh = calcularDVH(turno.pacienteID, turno.disponibilidadID, "Cancelado");
        turno.DigitoVHTurno = dvh
        await turno.save();


        let dvhsTot = await Turno.findAll({attributes : ['DigitoVHTurno']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHTurno)

        await calcularDVV("turnos", dvhsTot)

        await registrarEventoBitacora({
            idUser : userId,
            accion : "CANCELAR TURNO",
            descripcion : `El usuario: ${userId} cancelo un turno`
        })

        return res.status(200).json(turno);

    }catch(error){
        return res.status(500).json(error);
    }
}

const completarTurno = async(req, res)=>{
    try{
        const userId = req.user.id

        const turnoID = req.params.id;

        const turno = await Turno.findByPk(turnoID);

        if (!turno) {
            return res.status(404).json({message: "Turno inexistente"});
        }
        if (turno.estado !== "Pendiente") {
            return res.status(400).json({ message: "El turno ya no está pendiente" });
        }

        turno.estado = "Completado";
        const dvh = calcularDVH(turno.pacienteID, turno.disponibilidadID, "Completado");
        turno.DigitoVHTurno = dvh
        await turno.save();


        let dvhsTot = await Turno.findAll({attributes : ['DigitoVHTurno']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHTurno)

        await calcularDVV("turnos", dvhsTot)
        
        await registrarEventoBitacora({
            idUser : userId,
            accion : "COMPLETAR TURNO",
            descripcion : `El medico: ${userId} completo un turno`
        })

        return res.status(200).json(turno);

    }catch(error){
        return res.status(500).json(error);
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


const getTurnosMedico = async(req, res)=>{
    try{
        const userID = req.user.id;

        const turnos = await Turno.findAll({
            include: [{
                model: Disponibilidad,
                where: { medicoID: userID }
            }]
        });

        return res.status(200).json(turnos);

    }catch(error){
        console.log(error);

        return res.status(500).json({ message: error.message });
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
    obtenerTurno,
    cancelarTurno,
    completarTurno,
    getTurnosMedico
}