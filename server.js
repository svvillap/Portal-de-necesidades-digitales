const express = require('express')
const bodyParser = require('body-parser')

const { getConnection } = require("./db");
const { response } = require('express');

const { listComments, createComment } = require('./Controladores/comentarios');
const { listServices, createService, deleteService, updateService, doneService } = require('./Controladores/servicios');
const { createUser, updateUser , deleteUser } = require('./Controladores/users');

const app = express()


