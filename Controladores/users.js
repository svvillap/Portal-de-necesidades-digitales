const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require("../helpers");
const { createUser, getUserById, getUserByEmail } = require("../db/users");

const newUserController = async (req, res, next) => {
    // Este endpoint es para crear usuarios
    try {
        const { nameUser, email, password } = req.body;
        // Validar que los campos no estén vacíos con JOI (falta implementar)
        if(!nameUser || !email || !password) {
            throw generateError('Faltan campos', 400);
        }
        const id = await createUser(email, password, nameUser);

       res.send({
        status: 'ok',
        message: `Usuario creado con el id ${id}`
       })
    } catch (error) {
        next(error)
    }
};

const getUserController = async (req, res, next) => {
    // Este endpoint es para listar usuarios
    try {
        const { id } = req.params;

        const user = await getUserById(id);
        
        res.send({
         status: 'ok',
         message: user,
        })
     } catch (error) {
         next(error)
     }
};
    
const deleteUser = async (req, res, next) => {
    // Este endpoint es para borrar usuarios
    try {
       res.send({
        status: 'error',
        message: 'Not implemented'
       })
    } catch (error) {
        next(error)
    }
};

const updateUser = async (req, res, next) => {
    // Este endpoint es para actualizar usuarios
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        })
     } catch (error) {
         next(error)
     }
};


const loginController = async (req, res, next) => {
    // Este endpoint es para loguear usuarios
    try {
        const { email, password } = req.body;
        //(falta implementar con Joi)
        if(!email || !password) {
            throw generateError('Faltan campos', 400);
        }
        const user = await getUserByEmail(email);
        //comprobar contraseña coincide con la de la base de datos
        const validPassword = await bcrypt.compare(password, user.CONTRASENHA);
        if(!validPassword) {
            throw generateError('Contraseña incorrecta', 401);
        }
        //Creo payload para el token
        const payload = {id: user.id};
        //Firmo el token
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });
        //Envío el token	
        res.send({
         status: 'ok',
         message: token,
        })
     } catch (error) {
         next(error)
     }
};

module.exports = {
    newUserController,
    deleteUser,
    updateUser,
    getUserController,
    loginController
};