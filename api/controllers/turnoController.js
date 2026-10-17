
const {Turno, User} = require("../models/index.js")


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
        const turnoId = req.params.turnoId
        const user = await User.findByPk(userId)
        await user.addTurno(turnoId)
        return res.status(200).json({message : "Turno reservado"})
    }catch(error){
        return res.status(500).json(error)
    }
}

const crearTurno = async (req, res)=>{
    try{
        
    }catch(error){
        return res.status(500).json(error)
    }
}



module.exports = {
    verTurnosId,
    obtenerTurno,
    crearTurno
}