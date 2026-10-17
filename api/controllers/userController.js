const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { calcularDVH } = require('../utils/digitoVerificador')
const {calcularDVV} = require("../controllers/DVVController")
const crypto = require('crypto')
const DVV = require('../models/DVVModel')

const {registrarEventoBitacora} = require('./bitacoraController');
const {inicioSesion} = require('./inicioSesionController');


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
module.exports = { 
    iniciarSesion,
    register,
    obtenerNombreUsuario

 };