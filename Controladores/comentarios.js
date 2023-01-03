
const listComments = async (req, res, next) => {
    // Este endpoint es para listar comentarios
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        })
     } catch (error) {
         next(error)
     }
};

const createComment = async (req, res, next) => {
    // Este endpoint es para crear comentarios
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        })
     } catch (error) {
         next(error)
     }
};

const deleteComment = async (req, res, next) => {
    // Este endpoint es para borrar comentarios
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        })
     } catch (error) {
         next(error)
     }
};

const listSingleComment = async (req, res, next) => {
    // Este endpoint es para listar un comentario
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
    listComments,
    createComment,
    deleteComment,
    listSingleComment
};
