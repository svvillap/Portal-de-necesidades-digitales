const express = require('express')
const morgan = require('morgan')


const { newUserController, updateUserController , deleteUserController, getUserController, loginController } = require('./Controladores/users');
const { listServices, newServiceController, deleteService, updateService, doneService, listSingleService } = require('./Controladores/servicios');
const { listComments, createComment, deleteComment, listSingleComment } = require('./Controladores/comentarios');
const { authUser } = require('./Middlewares/auth');

const app = express()

app.use(express.json());
app.use(morgan('dev'));

// Rutas de usuarios
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);
app.delete('/user/:id', deleteUserController);
app.put('/user/:id', updateUserController);


// Rutas de servicios
app.get('/', listServices);
app.post('/', authUser, newServiceController);
app.get('/service/:id', listSingleService);
app.delete('/service/:id', deleteService);
app.put('/service/:id', updateService);
app.put('/service/:id/done', doneService);

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
           