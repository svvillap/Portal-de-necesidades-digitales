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

const createComment = async (userId, idService, texto) => {
  let connection;
  try {
    connection = await getConnection();
    const sqlQuery = `INSERT INTO COMENTARIOS (ID_USUARIOS, ID_SERVICIOS, TEXTO) VALUES (?, ?, ?)`;
    const [result] = await connection.query(sqlQuery, [
      userId,
      idService,
      texto,
    ]);
    return result.insertId;
  } catch (error) {
    console.log(error);
    throw generateError('No se ha podido crear el comentario', 500);
  } finally {
    if (connection) connection.release();
  }
};

const deleteComment = async (id) => {
  // Este endpoint es para borrar servicios
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `DELETE FROM COMENTARIOS WHERE ID = ?`,
      [id]
    );
    if (result.affectedRows === 0) {
      throw generateError(`No existe el comentario con el id: ${id}`, 404);
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const listSingleComment = async (id) => {
  // Este endpoint es para listar un servicio
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM COMENTARIOS WHERE ID = ?`,
      [id]
    );
    if (result.length === 0) {
      throw generateError(`No existe el comentario con el id: ${id}`, 404);
    }
    return result[0];
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  listComments,
  createComment,
  deleteComment,
  listSingleComment,
};
