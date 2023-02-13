const { getConnection } = require('../db/db.js');
const path = require('path');
const {
  createService,
  listServices,
  listSingleService,
  deleteService,
} = require('../db/services');
const {
  newServiceSchema,
  updateServiceSchema,
} = require('../validator/validadorServicios');

const { generateError, creathePathIfNotExists } = require('../helpers');

const listServicesController = async (req, res, next) => {
  // Este endpoint es para listar servicios
  try {
    const services = await listServices();

    res.send({
      status: 'ok',
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

const newServiceController = async (req, res, next) => {
  // Este endpoint es para crear servicios
  try {
    const userId = req.userId;
    const values = await newServiceSchema.validateAsync(req.body);
    const { title, description, price, date, categoriaId, subcategoriaId } =
      values;
    if (!req.files || !req.files.file) {
      throw generateError('falta el campo file', 400);
    }
    const file = req.files.file;
    const filename = `${Date.now()}-${file.name}`;
    const uploadsDir = path.join(__dirname, `../uploads/files/`);
    await creathePathIfNotExists(uploadsDir);
    await file.mv(`${uploadsDir}/${filename}`);
    const id = await createService(
      title,
      description,
      price,
      date,
      userId,
      categoriaId,
      subcategoriaId,
      filename
    );
    res.send({
      status: 'ok',
      message: `Servicio creado con el id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteServiceController = async (req, res, next) => {
  // Este endpoint es para borrar servicios

  try {
    const { id } = req.params;

    //Conseguir información del servicio a borrar
    const service = await listSingleService(id);
    //Comprobar que el usuario que quiere borrar el servicio es el propietario del servicio
    if (req.userId !== service.ID_USUARIOS) {
      throw generateError('No puedes borrar un servicio que no es tuyo', 401);
    }
    //Borrar el servicio
    await deleteService(id);
    res.send({
      status: 'ok',
      message: `Servicio borrado con el id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const updateServiceController = async (req, res, next) => {
  // Este endpoint es para actualizar servicios
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const values = await updateServiceSchema.validateAsync(req.body);
    const service = await listSingleService(id);
    if (req.userId !== service.ID_USUARIOS) {
      throw generateError(
        'No puedes actualizar un servicio que no es tuyo',
        401
      );
    }
    const { title, description, price, date, categoriaId, subcategoriaId } =
      values;

    await connection.query(
      `
      UPDATE SERVICIOS
      SET TITULO=?, DESCRIPCION=?, PRECIO=?, FECHA_LIMITE=?, ID_CATEGORIAS=?, ID_SUBCATEGORIAS=?
      WHERE id=?
    `,
      [title, description, price, date, categoriaId, subcategoriaId, id]
    );
    res.send({
      status: 'ok',
      message: `Servicio actualizado con el id: ${id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

const doneServiceController = async (req, res, next) => {
  // Este endpoint es para marcar servicios como realizados
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const service = await listSingleService(id);
    if (req.userId !== service.ID_USUARIOS) {
      throw generateError(
        'No puedes marcar como resuelto un servicio que no es tuyo',
        401
      );
    }
    await connection.query(
      `
      UPDATE SERVICIOS
      SET STATUS=?
      WHERE id=?
    `,
      ['done', id]
    );
    res.send({
      status: 'ok',
      message: `Servicio hecho con el id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const uploadFileServiceController = async (req, res, next) => {
  // Este endpoint es para cargar un fichero con una solución
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const service = await listSingleService(id);
    if (service.STATUS === 'done') {
      throw generateError('Este servicio ya ha sido resuelto', 401);
    }
    if (req.files && req.files.solution) {
      const file = req.files.solution;
      const filename = `${Date.now()}-${file.name}`;
      const uploadsDir = path.join(__dirname, `../uploads/solution/${id}`);
      await creathePathIfNotExists(uploadsDir);
      await file.mv(`${uploadsDir}/${filename}`);
      await connection.query(
        `
      INSERT INTO UPLOAD_SERVICE (ID_USUARIOS, ID_SERVICIOS, FILE_NAME) 
      VALUES (?, ?, ?)
    `,
        [req.userId, id, filename]
      );
      res.send({
        status: 'ok',
        message: 'La solución se ha cargado correctamente',
      });
    } else {
      throw generateError('no se ha cargado ningún parámetro a solution', 400);
    }
  } catch (error) {
    next(error);
  }
};

const listSingleServiceController = async (req, res, next) => {
  // Este endpoint es para listar un servicio
  try {
    const { id } = req.params;
    console.log(id)
    const service = await listSingleService(id);
    res.send({
      status: 'ok',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listServicesController,
  listSingleServiceController,
  newServiceController,
  deleteServiceController,
  updateServiceController,
  doneServiceController,
  uploadFileServiceController,
};
