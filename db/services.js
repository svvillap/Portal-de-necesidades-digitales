const { generateError } = require('../helpers');
const { getConnection } = require('./db');
const { listComments } = require('./comments');


const createService = async (
  title,
  description,
  price,
  date,
  userId,
  categoriaId,
  subcategoriaId,
  filename
) => {
  let connection;
  try {
    connection = await getConnection();
    console.log([
      title,
      description,
      price,
      date,
      userId,
      categoriaId,
      subcategoriaId,
    ]);
    const sqlQuery = `INSERT INTO SERVICIOS (TITULO, DESCRIPCION, PRECIO, FECHA_LIMITE, ID_USUARIOS, ID_CATEGORIAS, ID_SUBCATEGORIAS, FICHERO_DIGITAL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.query(sqlQuery, [
      title,
      description,
      price,
      date,
      userId,
      categoriaId,
      subcategoriaId,
      filename,
    ]);
    return result.insertId;
  } catch (error) {
    console.log(error);
    throw generateError('No se ha podido crear el servicio', 500);
  } finally {
    if (connection) connection.release();
  }
};

const listSolutions = async (id) => {
  let connection; 
  try {
    connection = await getConnection();
    const [solutions] = await connection.query(
      `SELECT * FROM UPLOAD_SERVICE WHERE ID_SERVICIOS=? ORDER BY CREATED_AT DESC`,
      [id]
    );
  return solutions;
  } catch (error) {
    console.log(error);
    throw generateError('No se ha podido listar las soluciones', 500);
  } finally {
    if (connection) connection.release();
  }
};


const listServices = async () => {
  // Este endpoint es para listar servicios
  let connection;
  try {
    connection = await getConnection();
    const [services] = await connection.query(
      `SELECT servicios.*, usuarios.NOMBRE_USUARIO FROM servicios LEFT JOIN usuarios on servicios.ID_USUARIOS = usuarios.ID ORDER BY servicios.CREATED_AT DESC`
    );

    return services;
  } catch (error) {
    console.log(error);
    throw generateError('No se ha podido listar los servicios', 500);
  } finally {
    if (connection) connection.release();
  }
};

const listSingleService = async (id) => {
  // Este endpoint es para listar un servicio
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM SERVICIOS WHERE ID = ?`,
      [id]
    );
    if (result.length === 0) {
      throw generateError(`No existe el servicio con el id: ${id}`, 404);
    }
    const service = result[0]
    const comments = await listComments(service.ID);
    const solutions= await listSolutions(service.ID)
    service.COMENTARIOS = comments;
    service.SOLUCIONES = solutions;
    return service;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const deleteService = async (id) => {
  // Este endpoint es para borrar servicios
  let connection;
  try {
    connection = await getConnection();

    await connection.query(`DELETE FROM COMENTARIOS WHERE ID_SERVICIOS = ?`, [
      id,
    ]);
    await connection.query(
      `DELETE FROM UPLOAD_SERVICE WHERE ID_SERVICIOS = ?`,
      [id]
    );
    const [result] = await connection.query(
      `DELETE FROM SERVICIOS WHERE ID = ?`,
      [id]
    );
    if (result.affectedRows === 0) {
      throw generateError(`No existe el servicio con el id: ${id}`, 404);
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createService,
  listServices,
  listSingleService,
  deleteService,
};
