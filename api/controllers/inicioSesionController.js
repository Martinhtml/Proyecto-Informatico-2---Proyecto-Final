const crypto = require('crypto');
const { InicioSesion } = require('../models/index');
const { calcularDVV } = require('../controllers/DVVController');
const { calcularDVH } = require('../utils/digitoVerificador');


const inicioSesion = async (usuarioId) => {
    try{
        const fechaActual = new Date();
        const dvh = calcularDVH(usuarioId, fechaActual.toISOString()); //`${usuarioId}-${fechaActual.toISOString()}`;
        let dvhsTot = await InicioSesion.findAll({attributes : ['DigitoVHInicioSesion']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHInicioSesion)
        dvhsTot.push(dvh)
        await calcularDVV("iniciossesiones", dvhsTot)


        const inicioSesionObj = await InicioSesion.create({
            fecha : fechaActual,
            usuarioID : usuarioId,
            DigitoVHInicioSesion : dvh
        })
        return inicioSesionObj;

    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = {
    inicioSesion
}