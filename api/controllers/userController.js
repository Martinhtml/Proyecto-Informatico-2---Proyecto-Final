const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { calcularDVH } = require('../utils/digitoVerificador')
const {calcularDVV} = require("../controllers/DVVController")
const crypto = require('crypto')
const DVV = require('../models/DVVModel')

const {registrarEventoBitacora} = require('./bitacoraController');
const {inicioSesion} = require('./inicioSesionController');
const { Op } = require('sequelize');
const {asignarRolNombre} = require("./rolController")

const nodemailer = require('nodemailer');

const iniciarSesion = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email : email } });

        if(!user || !(await bcrypt.compare(password, user.contraseña))){
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        
        await inicioSesion(user.id);

        await registrarEventoBitacora({
            idUser: user.id,
            accion: 'INICIO DE SESION',
            descripcion: `El usuario ${email} inició sesión`,
        });

        const token = await jwt.sign({id: user.id, email: user.email}, "Proyecto Informatico II", { expiresIn: "365d" });
        res.status(200).json(token);

    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

const iniciarSesionMedico = async (req,res) =>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ where : { email : email } });

         if(!user || !(await bcrypt.compare(password, user.contraseña))){
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        
        const roles = await user.getRoles();
         if(!roles.some((rol) => rol.nombre === "medico")){
            return res.status(403).json({ message: "Esta cuenta no tiene rol de medico" });
        }

        await inicioSesion(user.id);
        await registrarEventoBitacora({
            idUser: user.id,
            accion: 'INICIO DE SESION MEDICO',
            descripcion: `El usuario ${email} inició sesión como médico`,
        });
        const token = await jwt.sign({id: user.id, email: user.email, modo: "medico"}, "Proyecto Informatico II", { expiresIn: "365d" });
        res.status(200).json(token);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }

}

const obtenerNombreUsuario = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId)
        if (!user){
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        return res.status(200).json(user.nombre);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}


const obtenerDatosUsuario = async(req, res)=>{
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId, {attributes: {exclude : ["contraseña", "DigitoVHUser"]}})
        if (!user){
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

const obtenerUsuario = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {attributes : {exclude : ["contraseña"]}})
        if (!user){
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

const register = async (req,res) => {
    try{

        const {name, apellido, dni, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 12)

        const dvh = calcularDVH(name, apellido, dni, email, hashedPassword)




        const createdUser = await User.create({
            nombre : name,
            apellido,
            dni,
            email,
            contraseña : hashedPassword,
            DigitoVHUser : dvh
        })
        
        await asignarRolNombre(createdUser.id, "paciente")
        let dvhsTot = await User.findAll({attributes : ['DigitoVHUser']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHUser)
        await calcularDVV("users", dvhsTot)

        await registrarEventoBitacora({
            idUser: createdUser.id,
            accion: 'REGISTRO',
            descripcion: `Se registró el usuario ${email}`
        })

        res.status(201).json({message : "User Creado"})

    }  
    catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({
            message: 'Error en el registro',
            error: error.message
        });
    }   
}   






const editarUser = async (req, res)=>{
    try{
        const userID = req.user.id
        const {nombre, apellido} = req.body
        const user = await User.findByPk(userID);
        if (!user){
            return res.status(404).json({"message" : "Usuario no encontrado"})
        }
        if (!nombre || !apellido){
            return res.status(400).json({"message" : "Faltan datos"})
        }
        user.nombre = nombre
        user.apellido = apellido

        const dvh = calcularDVH(nombre, apellido, user.dni, user.email, user.hashedPassword)

        user.DigitoVHUser = dvh
        
        let dvhsTot = await User.findAll({where : {id : {[Op.ne] : userID}}, attributes : ['DigitoVHUser']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHUser)
        dvhsTot.push(dvh)

        await calcularDVV("users", dvhsTot)

        await registrarEventoBitacora({
            idUser: userID,
            accion: 'EDICION PERFIL',
            descripcion: `El usuario ${userID} modifico su perfil`
        })


        await user.save()
        
        
        
        return res.status(200).json({"message" : "Perfil editado"})
    }catch(error){
        return res.status(500).json(error)
    }
}


const borrarCuenta = async(req, res)=>{
    try{
        const userID = req.user.id
        const {contra} =  req.body
        const user = await User.findByPk(userID)
        if (!user) return res.status(400).json({message : "No existe el user"})
        if (!await bcrypt.compare(contra, user.contraseña)) return res.status(401).json("Credenciales incorrectas")

        await registrarEventoBitacora({
            idUser : userID,
            accion : "ELIMINACION DE CUENTA",
            descripcion : `El usuario ${user.nombre} ${user.apellido} ha eliminado su cuenta`
        })

        await User.destroy({where : {id : userID}})



        let dvhsTot = await User.findAll({attributes : ['DigitoVHUser']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHUser)

        await calcularDVV("users", dvhsTot)


        return res.status(200).json({"message" : "Usuario borrado"})
    }catch(error){
        return res.status(500).json(error)
    }   

}


const cambiarPassword = async(req, res)=>{
    try{
        const {passVieja, nuevaPass} = req.body;
        const userID = req.user.id;
        if (!passVieja || !nuevaPass) return res.status(400).json({"message" : "Faltan datos"});
        const user = await User.findByPk(userID);
        if (!user) return res.status(404).json({"message" : "El user no existe"});
        if (!(await bcrypt.compare(passVieja, user.contraseña))) return res.status(401).json({"message" : "Contraseña incorrecta"});
        const nuevaPassHash = await bcrypt.hash(nuevaPass, 12);
        user.contraseña = nuevaPassHash;

        const dvh = calcularDVH(user.nombre, user.apellido, user.dni, user.email, nuevaPassHash)

        user.DigitoVHUser = dvh
        
        let dvhsTot = await User.findAll({where : {id : {[Op.ne] : userID}}, attributes : ['DigitoVHUser']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHUser)
        dvhsTot.push(dvh)

        await calcularDVV("users", dvhsTot)

        await registrarEventoBitacora({
            idUser: userID,
            accion: 'CAMBIO DE CONTRASEÑA',
            descripcion: `El usuario ${userID} cambio su contraseña`
        })


        await user.save();
        res.status(200).json({"message" : "Contraseña cambiada"})
    }catch(error){
        return res.status(500).json(error);
    }
}


const recuperarPass = async(req, res)=>{
    try{
        const {email, contra} = req.body;
        if(!email || !contra) return res.status(400).json({"message": "Faltan datos"});
        const user = await User.findOne({where: {email: email}})

        if(!user) return res.status(400).json({"message" : "Credenciales incorrectas"})

        const contraHash = await bcrypt.hash(contra, 12)
        user.contraseña = contraHash

        const dvh = calcularDVH(user.nombre, user.apellido, user.dni, user.email, contraHash)
        user.DigitoVHUser = dvh
        await user.save()

        let dvhsTot = await User.findAll({attributes : ['DigitoVHUser']});
        dvhsTot = dvhsTot.map((a)=>a.DigitoVHUser)

        await calcularDVV("users", dvhsTot)

        await registrarEventoBitacora({
            idUser: user.id,
            accion: 'RECUPERACION DE CONTRASEÑA',
            descripcion: `El usuario ${user.id} recupero su contraseña`
        })

        return res.status(200).json({"message" :"Contraseña recuperada"})

    }catch(error){
        return res.status(500).json(error)
    }
}


const enviarMail = async (req, res)=>{
    try{

        const {mail} = req.body;
        const tokenRecuperacion = crypto.randomInt(100000, 1000000).toString();
        const transportador = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : "donnari.martinet36@gmail.com",
                pass : "qpiw ttvf jxtl aqfa"
            }
        })
        const confMail= {
            from : '"Gestor de Turnos" <donnari.martinet36@gmail.com>',
            to : mail,
            subject : "Recuperacion de cuenta",
            text : `Tu token de reinicio de contraseña es: ${tokenRecuperacion}`
        }

        await transportador.sendMail(confMail);
        return res.status(200).json(tokenRecuperacion)
    }catch(error){
        return res.status(500).json(error);
    }

}
//Token mailTrap ebd176d733844dc7ee6e8c4a56b9adb7

module.exports = { 
    iniciarSesion,
    iniciarSesionMedico,
    register,
    obtenerNombreUsuario,
    obtenerUsuario,
    editarUser,
    obtenerDatosUsuario,
    borrarCuenta,
    cambiarPassword,
    enviarMail,
    recuperarPass

 };