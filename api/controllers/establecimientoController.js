const {Establecimiento} = require("../models/index")

const buscarEstablecimientos = async(req, res)=>{
    try{
        const establecimientos = await Establecimiento.findAll()
        res.status(200).json(establecimientos) 
    }catch(error){
        return res.status(500).json(error)
    }
        
}

module.exports = {
    buscarEstablecimientos
}