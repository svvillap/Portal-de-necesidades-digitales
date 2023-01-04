const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUser = (req, res, next) => {
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
    } catch {
      throw generateError('Token no válido', 401);
    }
    req.userId = token.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
