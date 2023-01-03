const { getConnection } = require('./db');

let connection;

async function seeds() {
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
}
module.exports = { seeds };
