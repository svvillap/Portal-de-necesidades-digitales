require('dotenv').config();

const { getConnection } = require('./db');

let connection;

async function main() {
  try {
    connection = await getConnection();
    console.log('Conectado a la base de datos');
    console.log('Borrando tablas antiguas...');

    await connection.query('DROP TABLE IF EXISTS COMENTARIOS');
    await connection.query('DROP TABLE IF EXISTS SERVICIOS');
    await connection.query('DROP TABLE IF EXISTS SUBCATEGORIAS');
    await connection.query('DROP TABLE IF EXISTS CATEGORIAS');
    await connection.query('DROP TABLE IF EXISTS USUARIOS');

    await connection.query(`
    CREATE TABLE USUARIOS (
            ID INTEGER PRIMARY KEY AUTO_INCREMENT,
            NOMBRE TINYTEXT,
            EMAIL VARCHAR(100) UNIQUE NOT null,
            CONTRASEÑA TINYTEXT NOT null,
            BIOGRAFIA TINYTEXT, 
            IMAGEN TINYTEXT,
            NOMBRE_USUARIO TINYTEXT NOT NULL,
            CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP
            ); 
        `);



    await connection.query(`
        CREATE TABLE CATEGORIAS (
            ID INTEGER PRIMARY KEY AUTO_INCREMENT,
            NOMBRE TINYTEXT, 
            DESCRIPCION VARCHAR(150)
        );
        `);

    await connection.query(`
        CREATE TABLE SUBCATEGORIAS (
            ID INTEGER PRIMARY KEY AUTO_INCREMENT,
            ID_CATEGORIAS INTEGER NOT NULL,
            NOMBRE TINYTEXT, 
            DESCRIPCION VARCHAR(150),
            FOREIGN KEY (ID_CATEGORIAS) REFERENCES CATEGORIAS(ID)
        );
        `);


    await connection.query(`
    CREATE TABLE SERVICIOS (
        ID INTEGER PRIMARY KEY AUTO_INCREMENT,
        TITULO TINYTEXT, 
        ID_CATEGORIAS INTEGER NOT NULL,
        ID_SUBCATEGORIAS INTEGER NOT NULL, 
        ID_USUARIOS INTEGER NOT NULL,
        DESCRIPCION TINYTEXT, 
        FICHERO_DIGITAL MEDIUMBLOB,
        STATUS TINYTEXT,
        CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_CATEGORIAS) REFERENCES CATEGORIAS(ID),
        FOREIGN KEY (ID_SUBCATEGORIAS) REFERENCES SUBCATEGORIAS(ID),
        FOREIGN KEY (ID_USUARIOS) REFERENCES USUARIOS(ID)
        ); 
    `);


    await connection.query(`
    CREATE TABLE COMENTARIOS (
        ID INTEGER PRIMARY KEY AUTO_INCREMENT, 
        ID_USUARIOS INTEGER NOT NULL, 
        ID_SERVICIOS INTEGER NOT NULL, 
        TEXTO VARCHAR(500),
        CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_USUARIOS) REFERENCES USUARIOS(ID),
        FOREIGN KEY (ID_SERVICIOS) REFERENCES SERVICIOS(ID)
    );
    `);
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`Tablas creadas`)
    if (connection) connection.release();
    process.exit();
  }
}


main();
