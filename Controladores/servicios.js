

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

const createService = async (req, res, next) => {
    // Este endpoint es para crear servicios
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
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
    createService,
    deleteService,
    updateService,
    doneService,
    listSingleService
};
