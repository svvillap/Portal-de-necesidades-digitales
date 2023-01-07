const {
  listComments,
  createComment,
  deleteComment,
  listSingleComment,
} = require('../db/comments');
const { newCommentSchema } = require('../validator/validadorComentarios');
const { generateError } = require('../helpers');

const listCommentsController = async (req, res, next) => {
  // Este endpoint es para listar comentarios
  try {
    const comentarios = await listComments(req.params.idService);

    res.send({
      status: 'ok',
      message: comentarios,
    });
  } catch (error) {
    next(error);
  }
};

const createCommentController = async (req, res, next) => {
  // Este endpoint es para crear comentarios
  try {
    const userId = req.userId;
    const idService = req.params.idService;
    const values = await newCommentSchema.validateAsync(req.body);
    const date = new Date();
    const { texto } = values;
    const id = await createComment(userId, idService, texto, date);
    res.send({
      status: 'ok',
      message: `Comentario creado con el id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCommentController = async (req, res, next) => {
  // Este endpoint es para borrar comentarios
  try {
    const { id } = req.params;

    //Conseguir información del servicio a borrar
    const comentario = await listSingleComment(id);
    //Comprobar que el usuario que quiere borrar el servicio es el propietario del servicio
    if (req.userId !== comentario.ID_USUARIOS) {
      throw generateError('No puedes borrar un servicio que no es tuyo', 401);
    }
    //Borrar el servicio
    await deleteComment(id);
    res.send({
      status: 'ok',
      message: `Comentario borrado con el id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const listSingleCommentController = async (req, res, next) => {
  // Este endpoint es para listar un comentario
  try {
    const { id } = req.params;
    const comentario = await listSingleComment(id);
    res.send({
      status: 'ok',
      data: comentario,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listCommentsController,
  createCommentController,
  deleteCommentController,
  listSingleCommentController,
};
