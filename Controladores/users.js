const { getConnection } = require("../db");

const createUser = async (req, res) => {
    // Este endpoint es para crear usuarios
    res.status(201).send("Usuario creado");
};

const deleteUser = async (req, res) => {
    // Este endpoint es para borrar usuarios
    let conection = await getConnection();
    const user = await conection.query("codigo sql");
    res.status(201).send("Usuario borrado");
    console.log(user)
};

const updateUser = async (req, res) => {
    // Este endpoint es para actualizar usuarios
    res.status(201).send("Usuario actualizado");
};

module.exports = {
    createUser,
    deleteUser,
    updateUser
};