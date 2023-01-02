const { getConnection } = require("../db");

const listComments = async (req, res) => {
    let conection = await getConnection();

    const comments = await conection.query("codigo sql");
    res.send(comments);
};

const createComment = async (req, res) => {
    // Este endpoint es para crear comentarios
    res.status(201).send("Comentario creado");
};

module.exports = {
    listComments,
    createComment,
};
