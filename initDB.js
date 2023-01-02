require('dotenv').config();

const { getConnection } = require('./db');

let connection;

async function main() {
  try {
    connection = await getConnection();

    await connection.query('DROP TABLE IF EXISTS USUARIOS');

    await connection.query(`
    CREATE TABLE USUARIOS (
            ID INTEGER PRIMARY KEY AUTO_INCREMENT,
            NOMBRE TINYTEXT,
            EMAIL VARCHAR(100) UNIQUE NOT null,
            CONTRASEÑA TINYTEXT NOT null,
            BIOGRAFIA TINYTEXT, 
            IMAGEN TINYTEXT,
            NOMBRE_USUARIO TINYTEXT NOT NULL 
            ); 
        `);

    await connection.query('DROP TABLE IF EXISTS SERVICIOS');

    await connection.query(`
    CREATE TABLE SERVICIOS (
        ID INTEGER PRIMARY KEY AUTO_INCREMENT
        TÍTULO TINYTEXT, 
        ID_CATEGORÍAS INTEGER NOT NULL,
        ID_SUBCATEGORÍAS INTEGER NOT NULL, 
        ID_USUARIOS INTEGER NOT NULL,
        DESCRIPCIÓN TINYTEXT, 
        FICHERO_DIGITAL MEDIUMBLOB,
        STATUS TINYTEXT
        ); 
    `);

    await connection.query('DROP TABLE IF EXISTS CATEGORÍAS');

    await connection.query(`
    CREATE TABLE CATEGORÍAS (
        ID INTEGER PRIMARY KEY AUTO_INCREMENT,
        NOMBRE TINYTEXT, 
        DESCRIPCIÓN VARCHAR(150),
    );
    `);

    await connection.query('DROP TABLE IF EXISTS SUBCATEGORÍAS');

    await connection.query(`
    CREATE TABLE SUBCATEGORÍAS (
        ID INTEGER PRIMARY KEY AUTO_INCREMENT,
        ID_CATEGORÍAS INTEGER NOT NULL,
        NOMBRE TINYTEXT, 
        DESCRIPCIÓN VARCHAR(150),
    );
    `);

    await connection.query('DROP TABLE IF EXISTS COMENTARIOS');

    await connection.query(`
    CREATE TABLE COMENTARIOS (
        ID INTEGER PRIMARY KEY AUTO_INCREMENT, 
        ID_USUARIOS INTEGER NOT NULL, 
        ID_SERVICIOS INETGER NOT NULL, 
        TEXTO VARCHAR(500)
    );
    `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
