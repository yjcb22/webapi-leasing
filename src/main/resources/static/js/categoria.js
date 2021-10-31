//Contantes
const URL_CATEGORY_GET_ALL = "http://127.0.0.1:2109/api/Category/all";
const URL_CATEGORY_GET_ID = "http://127.0.0.1:2109/api/Category";
const URL_CATEGORY_CREATE = "http://127.0.0.1:2109/api/Category/save";
const URL_CATEGORY_UPDATE = "http://127.0.0.1:2109/api/Category/update";
const URL_CATEGORY_DELETE = "http://127.0.0.1:2109/api/Category";
//Variables
let tablaCategoria = $("#tablaCategoria");
let tablaCategoriaEditar = $("#tablaCategoriaEditar");
let tablaCategoriaCrear = $("#tablaCategoriaCrear");


///////////LOGICA PROGRAMACION PARA CATEGORIA///////////////////

/*
Metodo: obtenerCategoriaPorId
Realiza una peticion HTTP/GET para obtener un solo registro
de la base de datos por medio del API REST usando el ID.
*/
function obtenerCategoriaPorId(element) {
    limpiarTabla("#tablaCategoriaEditar tr");
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_CATEGORY_GET_ID + "/" + id;
    //console.log(urlId);

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaCategoriaEditar(tablaCategoriaEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
Metodo: obtenerTodasLasCategorias
Hacer una peticion HTTP/GET para obtener la lista de toda las categorias en 
la base de datos por medio del API REST.
*/
function obtenerTodasLasCategorias() {
    limpiarTabla("#tablaCategoria tr");

    $.ajax({
        url: URL_CATEGORY_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaCategoria(tablaCategoria, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
Metodo: agregarATablaCategoria
Recibe la tabla y los elementos JSON de la peticion HTTP 
para agregarlos a la tabla que lista las categorias creadas
*/
function agregarATablaCategoria(tabla, data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        //console.log(element );
        //console.log("HOLA  4444");
        $(tabla).children().append("<tr><td>" + element["id"] + "</td><td><a onclick='obtenerCategoriaPorId(this)' href='#'>" +
            element["name"] + "</a></td><td>" +
            element["description"] + "</td>" +
            "<td><button onclick='borrarCategoria(this)'>Borrar</button></td></tr>");
    }
}

/*
Metodo: agregarATablaCategoriaEditar
Recibe la tabla y los elementos de la peticion HTTP 
para agregarlos a la tabla que permite editar la informacion
*/
function agregarATablaCategoriaEditar(tabla, data) {
    limpiarTabla("#tablaCategoriaEditar tr");
    //console.log(data);
    $(tabla).children().append("<tr><td>" +
            data["id"] + "</td><td><input name='categoriaEditarNombre' id='categoriaEditarNombre' value=\"" +
            data["name"] + "\"></td><td><input name='categoriaEditarDescripcion' id='categoriaEditarDescripcion' value=\"" +
            data["description"] + "\"></td>" +
            "<td><button onclick='actualizarCategoria(this)'>Actualizar</button></td></tr>");
}

/*
Metodo: borrarCategoria
Obtiene el ID de la finca y envia una peticion HTTP para borrar
el elemento de la base de datos
*/
function borrarCategoria(element) {
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_CATEGORY_DELETE + "/" + id;
    let datosObject = { id: id };
    //console.log(datosObject);

    $.ajax({
        url: urlId,
        data: JSON.stringify(datosObject),
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("La categoria con id: " + id + " fue borrada exitosamente");
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

    limpiarTabla("#tablaCategoria tr");

    setTimeout(
        function () {
            obtenerTodasLasCategorias();
        }, 200);
}

/*
Metodo: limpiarTabla
Recibe la tabla y borrar todas las filas
*/
function limpiarTabla(selector) {
    let rows = $(selector);
    for (let i = 1; i < rows.length; i++) {
        const element = rows[i];
        element.remove();
    }
}

/*
Metodo: actualizarCategoria
Obtiene los valores de la tabla detalle y luego 
envia una peticion HTTP/PUT para actualizar el registro
en la base de datos por medio de la API REST
*/
function actualizarCategoria(element) {
    let id = $(element).parent().parent().find('td').html();
    let rows = $("#tablaCategoriaEditar td");
    
    //console.log(rows);

    let datosObject = {
        id: id,
        name: $(rows[1]).children().val(),
        description: $(rows[2]).children().val()
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_CATEGORY_UPDATE,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("La categoria con id: " + id + " fue actualizada exitosamente");
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

    limpiarTabla("#tablaFinca tr");
    setTimeout(
        function () {
            obtenerTodasLasCategorias();
        }, 200);
    limpiarTabla("#tablaFincaEditar tr");
}

/*
Metodo: crearCategoria
Obtiene los valores de la tabla crear y luego 
envia una peticion HTTP/POST para crear el registro
en la base de datos por medio de la API REST
*/
function crearCategoria() {
    let rows = $("#tablaCategoriaCrear td");
    
    let datosObject = {
        name: $(rows[0]).children().val(),
        description: $(rows[1]).children().val()        
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_CATEGORY_CREATE,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            $(rows[0]).children().val("");
            $(rows[1]).children().val("");            
            $("#mensajes").html("La categoria " + datosObject.name + " fue creada exitosamente");
            limpiarTabla("#tablaCategoria tr");
            setTimeout(
                function () {
                    obtenerTodasLasCategorias();
                }, 200);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}
