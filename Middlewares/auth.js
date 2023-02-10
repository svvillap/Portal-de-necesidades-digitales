 const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/users');
const { generateError } = require('../helpers');

const authUser = async(req, res, next) => {
  // Este middleware es para comprobar si el usuario está logueado
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
      throw generateError('Es preciso estar logueado', 401);
    }
    let token;
    try {
      token = jwt.verify(authorization, process.env.SECRET);
      console.log(token)
    } catch {
      throw generateError('Token no válido', 401);
    }
    req.userId = token.id;

    // get the user by req.userId
    
    let user = await getUserById(req.userId)
    console.log(token.iat * 1000, user.CONTRASENHA_FECHA_UPDATED.getTime())
    if (token.iat * 1000 + 3600000 > user.CONTRASENHA_FECHA_UPDATED.getTime()) { next()}
    else { throw generateError('sesion no válida', 401)}
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
