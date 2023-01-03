const { generateError } = require('../helpers');
const { createService } = require('../db/services');

const listServices = async (req, res, next) => {
    // Este endpoint es para listar servicios
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        })
     } catch (error) {
         next(error)
     }
};

const newServiceController = async (req, res, next) => {
    // Este endpoint es para crear servicios
    try {
        const userId = req.userId;
        const { title, description, price, date, categoriaId, subcategoriaId } = req.body;
        console.log(req.body);
        console.log(userId, title, description, price, date);
        // TODO: Implementar con Joi (validar que los campos no estén vacíos, y maximo de caracteres)
        if(!title || !description || !price || !date) {
            throw generateError('Faltan campos', 400);
        }
        const id = await createService(title, description, price, date, userId, categoriaId, subcategoriaId);
        res.send({
         status: 'ok',
         message: `Servicio creado con el id: ${id}`
        })
     } catch (error) {
         next(error)
     }
};

const deleteService = async (req, res, next) => {
    // Este endpoint es para borrar servicios
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        })
     } catch (error) {
         next(error)
     }
};

const updateService = async (req, res, next) => {
    // Este endpoint es para actualizar servicios
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        })
     } catch (error) {
         next(error)
     }
};

const doneService = async (req, res, next) => {
    // Este endpoint es para marcar servicios como realizados
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        })
     } catch (error) {
         next(error)
     }
};

const listSingleService = async (req, res, next) => {
    // Este endpoint es para listar un servicio
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        })
     } catch (error) {
         next(error)
     }
};


module.exports = {
    listServices,
    newServiceController,
    deleteService,
    updateService,
    doneService,
    listSingleService
};
