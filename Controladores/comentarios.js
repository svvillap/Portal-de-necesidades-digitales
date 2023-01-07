const { listComments } = require('../db/comments');

const listCommentsController = async (req, res, next) => {
  // Este endpoint es para listar comentarios
  try {
    const comentarios = await listComments(req.idSerivce);

    res.send({
      status: 'ok',
      message: comentarios,
    });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  // Este endpoint es para crear comentarios
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
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
  createComment,
  deleteComment,
  listSingleComment,
};
