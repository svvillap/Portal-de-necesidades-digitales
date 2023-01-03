const { generateError } = require('../helpers');
const { getConnection } = require('./db')
const bcrypt = require('bcrypt');

// Create a user in the database y devuelve su id
const createUser = async (email, password, nameUser) => {
    let connection;
    try{
        connection = await getConnection();
        //Comprobar que no exista otro usuario en ese email
        const [user] = await connection.query(`SELECT id FROM USUARIOS WHERE EMAIL = ?`, [email]);
        if(user.length > 0) {
            throw generateError('Ya existe un usuario con ese email', 409)
        }
        //Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 8);
    
        //Insertar el usuario en la base de datos
        const [newUser] = await connection.query(`INSERT INTO USUARIOS (EMAIL, CONTRASEÑA, NOMBRE_USUARIO) VALUES (?, ?, ?)`, [email, passwordHash, nameUser]);  
        //Devolver el id del usuario
        return newUser.insertId;
    } finally {
        if(connection) connection.release();
    }
}

//Devuelve información pública de un usuario de la base de datos por su id
const getUserById = async (id) => {
    let connection;
    try{
        connection = await getConnection();
        const [result] = await connection.query(`SELECT ID, NOMBRE, EMAIL, BIOGRAFIA, IMAGEN, NOMBRE_USUARIO, CREATED_AT FROM USUARIOS WHERE ID = ?`, [id]);
        if(result.length === 0) {
            throw generateError('No existe un usuario con ese id', 404)
        }
        return result[0];
    } finally {
        if(connection) connection.release();
    }
}
 
module.exports = {
    createUser,
    getUserById
}