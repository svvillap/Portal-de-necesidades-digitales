const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const listComments = async (id) => {
  // Este endpoint es para listar servicios
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM COMENTARIOS WHERE ID_SERVICIOS=? ORDER BY CREATED_AT DESC`,
      [id]
    );
    return result;
  } catch (error) {
    console.log(error);
    throw generateError('No se ha podido listar los comentarios', 500);
  } finally {
    if (connection) connection.release();
  }
};

const createComment = async (userId, idService, texto, date) => {
  let connection;
  try {
    connection = await getConnection();
    console.log([userId, idService, texto, date]);
    const sqlQuery = `INSERT INTO COMENTARIOS (ID_USUARIOS, ID_SERVICIOS, TEXTO, CREATED_AT) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.query(sqlQuery, [
      userId,
      idService,
      texto,
      date,
    ]);
    return result.insertId;
  } catch (error) {
    console.log(error);
    throw generateError('No se ha podido crear el comentario', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  listComments,
  createComment,
};
