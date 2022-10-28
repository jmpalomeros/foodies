FOODIES
WHERE YOUR FAVS RESTAURANT ARE!

Description.

App de valoración y busqueda de restaurantes. Con FOODIES podrás buscar los restaurantes que más se ajustan a tu paladar y estilo de vida. 
Comparte, valora y comenta tus experiencias gastronómicas. ¡Únete a nuestra comunidad!

¡BE FOODIE!


User Stories

Una vez registrado y tras un posterior logado, el usuario puede buscar nuestra recomendaciones de restaurantes, ver su ubicación, datos relevantes y de interés así las valoraciones que ha recibido de otros usarios.


User profile:

El usuario, una vez registrado, puede ampliar sus datos e incluir una fotografia de perfil.
Tiene la posibilidad de editar y, en su caso, eliminar el perfil, así como la información que ha ido facilitando 
en cuanto a sus valoraciones de los restaurantes visitados.
Por último, dispone de la posibilidad de guardar en sus favoritos los restaurantes que recomendamos y desea visitar.

...
ROUTES:

/* GET home page */

// GET "/auth/signup" => PARA RENDERIZAR PAGINAS DE REGISTR

// POST "/auth/signup" => PARA CREAR USUARIO EN LA BASE DE DATOS

// GET "/auth/login" => RENDERIZA FORMULARIO DE ACCESO

// POST "/auth/login" => PARA VALIDAR LOS DATOS DEL USUARIO EN LA BS

// GET ("/auth/logout") => ruta para deslogar

//GET "/profile"=> ruta donde el usuario puede ver su perfil

//GET "profile/:id/edit"=> renderiza el formulario para editar los datos actuales del perfil

//POST "profile/:id/edit"=> recibe los datos editados y los actualiza

//POST "/profile"/:id/delete" RUTA PARA ELIMINAR EL PERFIL

//GET "/rating/new-rating" => ruta que renderiza formulario para crear valoracion

//POST "/rating/new-rating" => ruta para añadir la valoracion

//GET "/rating/:id/ratings" => renderizar todas las valoraciones de un mismo restaurante

//GET "/rating/my-ratings" => renderiza todas las opiniones del usuario logeado

//GET "/rating/:id/my-ratings/edit" => renderiza el rating a editar

//POST "/rating/:id/my-ratings/edit"

//POST "/rating/:id/delete"=>ruta para eliminar una valoracion

//GET "restaurant/create"=> para visualizar formulario de registro de restaurante

//POST "restaurant/create" => para enviar formulario a la BD

// GET Ruta de usuario para visualizar lista de restaurantes

//GET "/restaurant" ruta para randerizar un buscador de restaurantes

// GET ("/restaurant/:id") Ruta para mostrar detalles de restaurante

//POST "/restaurant/:id/"

// GET "/restaurant/:id/edit" Ruta para mostrar detalles a editar del restaurante.

//POST "/restaurant/:id/edit" Ruta para traer desde la BD los campos a editar y actualizar

//POST "/restaurant/:id/delete" ruta para eliminar restaurant de la BD

Para el desarrollo de la web nos hemos servido y hemos utilizado TRELLO y MIRO para organizar el trabajo y el flujo de la página.

El repositorio se encuetra en: https://github.com/jmpalomeros/foodies

La página se encuentra alojada en: https://foodies.cyclic.app/

