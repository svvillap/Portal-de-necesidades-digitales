const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const { getConnection } = require('../db/db.js');

const { generateError, creathePathIfNotExists } = require('../helpers');
const { createUser, getUserById, getUserByEmail } = require('../db/users');

const newUserController = async (req, res, next) => {
  // Este endpoint es para crear usuarios
  try {
    let imageFileName;
    if (req.files && req.files.image) {
      //procesado de imagenes
      //Creo path del directiorio uploads
      const uploadsDir = path.join(__dirname, '../uploads');
      //Creo el directorio uploads si no existe
      await creathePathIfNotExists(uploadsDir);
      //Procesar la imagen
      console.log(req.files.image);
      const image = sharp(req.files.image.data);
      image.resize(300, 300);
      //Guardo la imagen en el directorio uploads con un nombre único aleatorio
      imageFileName = `${nanoid()}.jpg`;
      await image.toFile(path.join(uploadsDir, imageFileName));
      console.log(imageFileName);
    }

    const { nameUser, email, password } = req.body;
    // TODO: Validar que los campos no estén vacíos con JOI
    if (!nameUser || !email || !password) {
      throw generateError('Faltan campos', 400);
    }
    const id = await createUser(email, password, nameUser, imageFileName);

    res.send({
      status: 'ok',
      message: `Usuario creado con el id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const getUserController = async (req, res, next) => {
  // Este endpoint es para listar usuarios
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    res.send({
      status: 'ok',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  // Este endpoint es para borrar usuarios
  let connection;
  try {
    const usuariosId = req.userId;
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM USUARIOS
      WHERE id=?
    `,
      [usuariosId]
    );
    res.send({
      status: 'ok',
      message: 'Usuario eliminado',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

const updateUserController = async (req, res, next) => {
  // Este endpoint es para actualizar usuarios
  let connection;
  try {
    connection = await getConnection();
    const usuariosId = req.userId;
    const { nameUser, email, password, biografia } = req.body;
    // TODO: Validar que los campos no estén vacíos con JOI
    if (!nameUser || !email || !password || !biografia) {
      throw generateError('Faltan campos', 400);
    }

    await connection.query(
      `
        UPDATE USUARIOS 
        SET NOMBRE =?, EMAIL=?, CONTRASENHA=?, BIOGRAFIA=?
        WHERE id=?
      `,
      [nameUser, email, password, biografia, usuariosId]
    );
    res.send({
      status: 'ok',
      message: 'Usuario actualizado',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

const loginController = async (req, res, next) => {
  // Este endpoint es para loguear usuarios
  try {
    const { email, password } = req.body;
    //(falta implementar con Joi)
    if (!email || !password) {
      throw generateError('Faltan campos', 400);
    }
    const user = await getUserByEmail(email);
    //comprobar contraseña coincide con la de la base de datos
    const validPassword = await bcrypt.compare(password, user.CONTRASENHA);
    if (!validPassword) {
      throw generateError('Contraseña incorrecta', 401);
    }
    //Creo payload para el token
    const payload = { id: user.ID };
    //Firmo el token
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '30d',
    });
    //Envío el token
    res.send({
      status: 'ok',
      message: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserController,
  deleteUserController,
  updateUserController,
  getUserController,
  loginController,
};
