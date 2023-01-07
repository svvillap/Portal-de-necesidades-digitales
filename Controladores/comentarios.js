const { listComments, createComment } = require('../db/comments');
const { newCommentSchema } = require('../validator/validadorComentarios');

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

const deleteComment = async (req, res, next) => {
  // Este endpoint es para borrar comentarios
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const listSingleComment = async (req, res, next) => {
  // Este endpoint es para listar un comentario
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
  listCommentsController,
  createCommentController,
  deleteComment,
  listSingleComment,
};
