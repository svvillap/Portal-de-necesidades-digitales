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

module.exports = {
  listComments,
};
