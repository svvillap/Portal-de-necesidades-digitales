const { getConnection } = require("../db");


const listServices = async (req, res) => {
    let conection = await getConnection();

    const services = await conection.query("codigo sql");
    res.send(services);
};

const createService = async (req, res) => {
    // Este endpoint es para crear servicios
    res.status(201).send("Servicio creado");
};

const deleteService = async (req, res) => {
    // Este endpoint es para borrar servicios
    res.status(201).send("Servicio borrado");
};

const updateService = async (req, res) => {
    // Este endpoint es para actualizar servicios
    res.status(201).send("Servicio actualizado");
};

const doneService = async (req, res) => {
    // Este endpoint es para marcar servicios como realizados
    res.status(201).send("Servicio realizado");
};

module.exports = {
    listServices,
    createService,
    deleteService,
    updateService,
    doneService
};
