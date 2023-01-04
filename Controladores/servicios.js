const { createService } = require('../db/services');
const { newServiceSchema } = require('../validator/validadorServicios');

const listServices = async (req, res, next) => {
  // Este endpoint es para listar servicios
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
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
    const id = await createService(
      title,
      description,
      price,
      date,
      userId,
      categoriaId,
      subcategoriaId
    );
    res.send({
      status: 'ok',
      message: `Servicio creado con el id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  // Este endpoint es para borrar servicios
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  // Este endpoint es para actualizar servicios
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const doneService = async (req, res, next) => {
  // Este endpoint es para marcar servicios como realizados
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const listSingleService = async (req, res, next) => {
  // Este endpoint es para listar un servicio
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listServices,
  newServiceController,
  deleteService,
  updateService,
  doneService,
  listSingleService,
};
