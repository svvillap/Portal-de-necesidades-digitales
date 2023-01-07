const {
  createService,
  listServices,
  listSingleService,
  deleteService,
} = require('../db/services');
const { newServiceSchema } = require('../validator/validadorServicios');

const { generateError } = require('../helpers');

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

const listSingleServiceController = async (req, res, next) => {
  // Este endpoint es para listar un servicio
  try {
    const { id } = req.params;
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
  updateService,
  doneService,
};
