const crypto = require("crypto");
const { DVV } = require("../models/index")


const calcularDVV = async (tabla, dvhs) => {
    try{

        const tablaDVV = await DVV.findOne({where : {nombreTabla : tabla}})

        dvhs = dvhs.join("/")
        const dvv = crypto.createHash('sha256').update(dvhs).digest('hex');

        if (!tablaDVV){
            const DVVCreado = await  DVV.create({
                nombreTabla : tabla,
                DVV : dvv,
                fechaModif : new Date()
            })
            return DVVCreado;
        }
        tablaDVV.DVV = dvv;
        tablaDVV.fechaModif = new Date();
        await tablaDVV.save();
        return tablaDVV;
        
    }catch(error){
        console.log(error);
    }
}


module.exports = {
    calcularDVV
}