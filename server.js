const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const {
  newUserController, //Done
  updateUserController, //Done
  deleteUserController, //Done
  getUserController, //Done
  loginController,
  getMeController, //Done
} = require('./Controladores/users');
const {
  listServicesController, //Done
  listSingleServiceController, //Done
  newServiceController, //Done
  deleteServiceController, //Done
  updateServiceController, //Done
  doneServiceController, //Done
  uploadFileServiceController, //done?
} = require('./Controladores/servicios');
const {
  listCommentsController, //Done
  createCommentController, //Done
  deleteCommentController, //Done
  listSingleCommentController, // Done
} = require('./Controladores/comentarios');
const { authUser } = require('./Middlewares/auth');

const app = express();
//Permitir el acceso desde cualquier origen
app.use(cors());

app.get('/', function (req, res, next) {
  res.json({msg: 'CORS-enabled for all origins!'})
});



app.use(fileUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));

// Rutas de usuarios
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);
app.delete('/user', authUser, deleteUserController);
app.put('/user/:id', authUser, updateUserController);
app.get('/user', authUser, getMeController)

// Rutas de servicios
app.get('/service', listServicesController);
app.post('/service', authUser, newServiceController);
app.get('/service/:id', listSingleServiceController);
app.delete('/service/:id', authUser, deleteServiceController);
app.put('/service/:id', authUser, updateServiceController);
app.put('/service/:id/done', authUser, doneServiceController);
app.post('/service/:id/uploadFile', authUser, uploadFileServiceController);

// Rutas de comentarios
app.get('/service/:idService/comments', listCommentsController);
app.post('/service/:idService/comments', authUser, createCommentController);
app.get('/comments/:id', authUser, listSingleCommentController);
app.delete('/comments/:id', authUser, deleteCommentController);

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// Lanzamos el servidor
app.listen(4000, function () {
  console.log('CORS-enabled web server listening on port 4000');
});
