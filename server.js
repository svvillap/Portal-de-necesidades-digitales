const express = require('express')
const morgan = require('morgan')

const { listComments, createComment, deleteComment, listSingleComment } = require('./Controladores/comentarios');
const { listServices, createService, deleteService, updateService, doneService, listSingleService } = require('./Controladores/servicios');
const { newUserController, updateUser , deleteUser, getUserController, loginController } = require('./Controladores/users');

const app = express()

app.use(express.json());
app.use(morgan('dev'));

// Rutas de usuarios
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);

// Rutas de servicios
app.get('/', listServices);
app.post('/', createService);
app.get('/service/:id', listSingleService);
app.delete('/service/:id', deleteService);

// Rutas de comentarios
app.get('/comments', listComments);
app.post('/comments', createComment);
app.get('/comments/:id', listSingleComment);
app.delete('/comments/:id', deleteComment);


// Middleware de 404
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found'
    });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message
        });
    });

// Lanzamos el servidor
app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
           