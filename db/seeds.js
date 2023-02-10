const { getConnection } = require('./db');

let connection;

async function seeds() {
  try{
  connection = await getConnection();
  await connection.query(
    `
      INSERT INTO CATEGORIAS(id, nombre, descripcion) VALUES
      (1, 'marketing digital', 'gestión de las compañías con el fin de atraer y fidelizar a los clientes a través de la satisfacción de sus deseos y resolución de sus problemas.'), 
      (2, 'redaccion y traduccion', 'transposición de un texto de una lengua distinta de la que ha sido empleada para concebir y escribir el texto original.'), 
      (3, 'Programacion web', 'Creación de sitios dinámicos en Internet, esto se consigue generando contenidos del sitio a través de base de datos por lenguajes de programación.'), 
      (4, 'Servicio al cliente', 'se realiza para cumplir con la satisfacción de un producto o servicio'), 
      (5, 'Asesoria legal', 'orientación legal actualizada y acorde a las exigencias de la resolución de conflictos que están relacionados con leyes, normativas y reglamentos.')
    `
  );

  await connection.query(
    `
      INSERT INTO SUBCATEGORIAS(id, id_categorias, nombre, descripcion) VALUES
      (1, 1, 'Marketing de redes sociales', 'involucra acciones de posicionamiento, difusión de marca e incluso procesos de venta en redes sociales'),
      (2, 2, 'Contenido web', 'proceso de investigar, planificar, escribir, editar y publicar contenido para la web'),
      (3, 3, 'Aplicaciones web', 'programas informáticos que son ejecutados en el entorno del navegador o codificado con algún lenguaje para que navegador web reproduzca la aplicación.'),
      (4, 4, 'Ventas', 'ofrecer productos, servicios, ideas u otros mediante un sitio web en internet.'),
      (5, 5, 'Consultas legales', 'Prestar asesoramiento correcto y oportuno a los ejecutivos sobre distintas cuestiones jurídicas.')
  `
  );

  await connection.query(
    `
      INSERT INTO USUARIOS(id, nombre, email, contrasenha, nombre_usuario) VALUES
      (1, 'Pedro Perez', 'pedrop@prueba.com', '12345', 'userpedro'), 
      (2, 'Marta Sanchez', 'martas@prueba.com', '12345', 'usermarta'), 
      (3, 'Mara G', 'marag@prueba.com', '12345', 'usermara'), 
      (4, 'Jose Castro', 'joseg@prueba.com', '12345', 'userjose'), 
      (5, 'Ana Paz', 'anap@prueba.com', '12345', 'userana')
    `
  );

  await connection.query(
    `
      INSERT INTO SERVICIOS(id, titulo, id_categorias, id_subcategorias, id_usuarios) VALUES
      (1, 'servicio de promagracion', 3, 3, 1), 
      (2, 'servicio de traduccion', 2, 2, 2), 
      (3, 'servicio de asesoria legal', 5, 5, 3), 
      (4, 'servicio de marketing', 1, 1, 4), 
      (5, 'servicio de redaccion', 2, 2, 5)
    `
  );

  await connection.query(
    `
      INSERT INTO COMENTARIOS(id, id_usuarios, id_servicios, texto) VALUES
      (1, 1, 3, 'comentario de servicio de promagracion'), 
      (2, 2, 2, 'comentario de servicio de traduccion'), 
      (3, 3, 5, 'comentario de servicio de asesoria legal'), 
      (4, 4, 1, 'comentario de servicio de marketing'), 
      (5, 5, 2, 'comentario de servicio de redaccion')
    `
  );

} catch (error) {
  console.error(error);
} finally {
  console.log(`Categorías añadidas`)
  if (connection) connection.release();
  process.exit();
}

}

module.exports = { seeds };
