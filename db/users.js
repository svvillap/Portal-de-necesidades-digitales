const { generateError } = require('../helpers');
const { getConnection } = require('./db')
const bcrypt = require('bcrypt');

// Create a user in the database y devuelve su id
const createUser = async (name, email, password, nameUser, imageFileName = '') => {
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
        const [newUser] = await connection.query(`INSERT INTO USUARIOS (NOMBRE, EMAIL, CONTRASENHA, NOMBRE_USUARIO, IMAGEN) VALUES (?, ?, ?, ?, ?)`, [name, email, passwordHash, nameUser, imageFileName]);  
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
        
        const [result] = await connection.query(`SELECT ID, NOMBRE, EMAIL, BIOGRAFIA, IMAGEN, NOMBRE_USUARIO, CREATED_AT, CONTRASENHA_FECHA_UPDATED FROM USUARIOS WHERE ID = ?`, [id]);
        if(result.length === 0) {
            throw generateError('No existe un usuario con ese id', 404)
        }
        return result[0];

    } finally {
        if(connection) connection.release();
    }
}

//Devuelve información pública de un usuario de la base de datos por su email
const getUserByEmail = async (email) => {
    let connection;
    try{
        connection = await getConnection();
        const [result] = await connection.query(`SELECT * FROM USUARIOS WHERE email = ?`, [email]);
        if(result.length === 0) {
            throw generateError('No existe un usuario con ese email', 404)
        }
        return result[0];
    } finally {
        if(connection) connection.release();
    }
}
 
module.exports = {
    createUser,
    getUserById,
    getUserByEmail
}