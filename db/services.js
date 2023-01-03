const { generateError } = require("../helpers");
const { getConnection } = require("./db");

const createService = async (title, description, price, date, userId, categoriaId, subcategoriaId) => {
    let connection;
    try {
        connection = await getConnection();
        const sqlQuery = `INSERT INTO SERVICIOS (TITULO, DESCRIPCION, PRECIO, FECHA_LIMITE, ID_USUARIOS, ID_CATEGORIAS, ID_SUBCATEGORIAS) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await connection.query(sqlQuery, [title, description, price, date, userId, categoriaId, subcategoriaId]);
        return result.insertId;
    } catch (error) {
        throw generateError('No se ha podido crear el servicio', 500);
    } finally {
        if(connection) connection.release();
    }
};

module.exports = {
    createService,
};
    