const { generateError } = require("../helpers");
const { createUser, getUserById } = require("../db/users");

const newUserController = async (req, res, next) => {
    // Este endpoint es para crear usuarios
    try {
        const { nameUser, email, password } = req.body;
        console.log(nameUser)
        console.log(email)
        console.log(password)

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
        res.send({
         status: 'error',
         message: 'Not implemented'
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