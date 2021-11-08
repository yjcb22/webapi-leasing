//Contantes
const URL_FARM_GET_ALL = "http://mintic.cengtel.com:2109/api/Farm/all";
const URL_FARM_GET_ID = "http://mintic.cengtel.com:2109/api/Farm";
const URL_FARM_CREATE = "http://mintic.cengtel.com:2109/api/Farm/save";
const URL_FARM_UPDATE = "http://mintic.cengtel.com:2109/api/Farm/update";
const URL_FARM_DELETE = "http://mintic.cengtel.com:2109/api/Farm";
//Variables
let tablaFinca = $("#tablaFinca");
let tablaFincaEditar = $("#tablaFincaEditar");
let tablaFincaCrear = $("#tablaFincaCrear");


///////////LOGICA PROGRAMACION PARA FINCAS///////////////////

/*
 Metodo: obtenerFincaPorId
 Realiza una peticion HTTP/GET para obtener un solo registro
 de la base de datos por medio del API REST usando el ID.
 */
function obtenerFincaPorId(element) {
    limpiarTabla("#tablaFincaEditar tr");
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_FARM_GET_ID + "/" + id;
    //console.log(urlId);

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaFincaEditar(tablaFincaEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
 Metodo: obtenerTodasLasFincas
 Hacer una peticion HTTP/GET para obtener la lista de toda las categorias en 
 la base de datos por medio del API REST.
 */
function obtenerTodasLasFincas() {
    limpiarTabla("#tablaFinca tr");

    $.ajax({
        url: URL_FARM_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaFinca(tablaFinca, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
 Metodo: agregarATablaFinca
 Recibe la tabla y los elementos JSON de la peticion HTTP 
 para agregarlos a la tabla que lista las categorias creadas
 */
function agregarATablaFinca(tabla, data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        $(tabla).children().append("<tr><td>" + element["id"] + "</td><td><a onclick='obtenerFincaPorId(this)' href='#'>" +
                element["name"] + "</a></td><td>" +
                element["extension"] + "</td><td>" +
                element["category"]["id"] + "</td><td>" +
                element["address"] + "</td><td>" +
                element["description"] +
                "</td><td><button onclick='borrarFinca(this)'>Borrar</button></td></tr>");
    }
}

/*
 Metodo: agregarATablaFincaEditar
 Recibe la tabla y los elementos de la peticion HTTP 
 para agregarlos a la tabla que permite editar la informacion
 */
function agregarATablaFincaEditar(tabla, data) {
    limpiarTabla("#tablaFincaEditar tr");
    //console.log(data);
    $(tabla).children().append("<tr><td>" +
            data["id"] + "</td><td><input name='test' id='test' value=\"" +
            data["name"] + "\"></td><td><input name='test' id='test' value=\"" +
            data["extension"] + "\"></td><td><input name='test' id='test' value=\"" +
            data["category"]["id"] + "\"></td><td><input name='test' id='test' value=\"" +
            data["address"] + "\"></td><td><input name='test' id='test' value=\"" +
            data["description"] + "\"></td><td><button onclick='actualizarFinca(this)'>Actualizar</button></td></tr>");
}

/*
 Metodo: borrarFinca
 Obtiene el ID de la finca y envia una peticion HTTP para borrar
 el elemento de la base de datos
 */
function borrarFinca(element) {
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_FARM_DELETE + "/" + id;
    let datosObject = {id: id};
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

    limpiarTabla("#tablaFinca tr");

    setTimeout(
            function () {
                obtenerTodasLasFincas();
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
 Metodo: actualizarFinca
 Obtiene los valores de la tabla detalle y luego 
 envia una peticion HTTP/PUT para actualizar el registro
 en la base de datos por medio de la API REST
 */
function actualizarFinca(element) {
    let id = $(element).parent().parent().find('td').html();
    let rows = $("#tablaFincaEditar td");

    let datosObject = {
        id: id,
        address: $(rows[4]).children().val(),
        extension: $(rows[2]).children().val(),
        category: {id: $(rows[3]).children().val()},
        name: $(rows[1]).children().val(),
        description: $(rows[5]).children().val()
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_FARM_UPDATE,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("La finca con id: " + id + " fue actualizada exitosamente");
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

    limpiarTabla("#tablaFinca tr");
    setTimeout(
            function () {
                obtenerTodasLasFincas();
            }, 200);
    limpiarTabla("#tablaFincaEditar tr");
}

/*
 Metodo: crearFinca
 Obtiene los valores de la tabla crear y luego 
 envia una peticion HTTP/POST para crear el registro
 en la base de datos por medio de la API REST
 */
function crearFinca() {
    let rows = $("#tablaFincaCrear td");

    let datosObject = {
        address: $(rows[3]).children().val(),
        extension: $(rows[1]).children().val(),
        category: {id: $(rows[2]).children().val()},
        name: $(rows[0]).children().val(),
        description: $(rows[4]).children().val()
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_FARM_CREATE,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            $(rows[0]).children().val("");
            $(rows[1]).children().val("");
            $(rows[2]).children().val("");
            $(rows[3]).children().val("");
            $(rows[4]).children().val("");
            $("#mensajes").html("El elemento con id: " + datosObject.id + " fue creado exitosamente");
            limpiarTabla("#tablaFinca tr");
            setTimeout(
                    function () {
                        obtenerTodasLasFincas();
                    }, 200);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}
