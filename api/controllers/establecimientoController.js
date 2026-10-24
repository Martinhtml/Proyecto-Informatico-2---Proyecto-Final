const {Establecimiento} = require("../models/index")

const buscarEstablecimientos = async(req, res)=>{
    try{
        const establecimientos = await Establecimiento.findAll()
        res.status(200).json(establecimientos) 
    }catch(error){
        return res.status(500).json(error)
    }
        
}

const buscarEstablecimientoID = async(req, res)=>{
    try{
        const estID = req.params.id
        const establecimiento = await Establecimiento.findByPk(estID)
        res.status(200).json(establecimiento) 
    }catch(error){
        return res.status(500).json(error)
    }
        
}


module.exports = {
    buscarEstablecimientos,
    buscarEstablecimientoID
}