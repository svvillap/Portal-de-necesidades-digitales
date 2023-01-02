# Portal de necesidades digitales
## ¿Qué es?
Esta plataforma permite a los usuarios obtener información que requieran del medio digital ya sean productos o servicios más estos solo pueden obtenerse de forma digital, no como elementos físicos. Siendo una plataforma de fácil acceso, con servicios y productos de calidad que han sido comprobados antes de ser obtenidos por los usuarios para así ofrecer soluciones de primera a sus necesidades.
La lista de productos y servicios que se pueden ofrecer es extensa, siempre y cuando sean elementos que puedan ofrecer/adquirir por los usuarios en formato digital. Esto podría ser desde diseño gráfico, marketing, programación, tecnología, etc. Las opciones son considerablemente amplias aunque tenemos una lista con las áreas profesionales con mayor éxito en la plataforma:
- Marketing digital.
- Programación web.
- Redacción y traducción.
- Diseño digital.
- Servicio al cliente.
- Asesoria legal.
## ¿Cómo tener acceso a la plataforma?
Tendrás acceso a la lista de productos y servicios que se ofrecen en la plataforma sin registro previo, pero para poder adquirirlos o ofrecerlos necesitarás registrarte en la plataforma. Lo primero sería registrarte en la plataforma, algo sencillo ya que no te tomará mucho tiempo rellenar tus datos básicos y de forma gratuita. También puedes registrarte con tu cuenta de Google o Facebook, esto te ahorrará tiempo y es más sencillo.
Posterior a tu registro tendrás acceso a la plataforma y a tu perfil el cual podrás personalizar de forma creativa para los demás usuarios. Si presentas algún producto o servicio lo ideal sería impresionar haciendo enfásis en por qué deberían contratarte, creando el producto o servicio perfecto con información básica del elemento, tan sencillo pero importante como ciertas descripciones de lo que ofreces.
## ¿Cómo está creada la base de datos?
|   USERS    |  SERVICIOS   |  CATEGORÍAS   |  SUBCATEGORIAS   |  COMENTARIOS   |
| :--------: | :-----: | :-------------: | :-------------: | :-------------: |
| ID    |   ID   |   ID  |   ID  |   ID  |
|   NOMBRE  |   TÍTULO  |   NOMBRE  |   ID_CATEGORÍA  |   ID_USERS  |
|   EMAIL  |   ID_CATEGORÍA  |   DESCRIPCIÓN  |   NOMBRE  |   ID_SERVICIOS  |
|  PASSWORD  |   ID_SUBCATEGORÍA  |   - |   DESCRIPCIÓN  |   TEXTO  |
|   IMAGEN  |   ID_USER  |   -  |   -  |   -  |
|   BIOGRAFÍA  |   DESCRIPCIÓN  |   -  |   -  |   -  |
|   NOMBRE_USUARIO  |   FICHERO_DIGITAL  |   -  |   -  |   -  |
|   -  |   STATUS  |   -  |   -  |   -  |

### Relaciones entre tablas

#### USERS-SERVICIOS
Users tiene una relación de uno a muchos con servicios, esto quiere decir que un usuario puede tener muchos servicios pero un servicio solo puede tener un usuario.

En la tabla SERVICIOS tenemos una columna ID_USER que hace referencia a la columna ID de la tabla USERS, esto quiere decir que el ID de la tabla USERS es la clave foránea de la tabla SERVICIOS.

#### SERVICIOS-CATEGORÍAS
Categoria tiene una relación de uno a muchos con servicios, esto quiere decir que una categoria puede tener muchos servicios pero un servicio solo puede tener una categoria.

En la tabla SERVICIOS tenemos una columna ID_CATEGORÍA que hace referencia a la columna ID de la tabla CATEGORÍAS, esto quiere decir que el ID de la tabla CATEGORÍAS es la clave foránea de la tabla SERVICIOS.

#### CATEGORÍAS-SUBCATEGORÍAS

Subcategoria tiene una relación de uno a muchos con categorias, esto quiere decir que una subcategoria puede tener muchas categorias pero una categoria solo puede tener una subcategoria.

En la tabla CATEGORÍAS tenemos una columna ID_SUBCATEGORÍA que hace referencia a la columna ID de la tabla SUBCATEGORÍAS, esto quiere decir que el ID de la tabla SUBCATEGORÍAS es la clave foránea de la tabla CATEGORÍAS.

#### SERVICIOS-COMENTARIOS

Servicios tiene una relación de uno a muchos con comentarios, esto quiere decir que un servicio puede tener muchos comentarios pero un comentario solo puede tener un servicio.

En la tabla COMENTARIOS tenemos una columna ID_SERVICIOS que hace referencia a la columna ID de la tabla SERVICIOS, esto quiere decir que el ID de la tabla SERVICIOS es la clave foránea de la tabla COMENTARIOS.
