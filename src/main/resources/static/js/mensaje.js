//Contantes
const URL_MESSAGE_GET_ALL = "http://mintic.cengtel.com:2109/api/Message/all";
const URL_MESSAGE_GET_ID = "http://mintic.cengtel.com:2109/api/Message";
const URL_MESSAGE_CREATE = "http://mintic.cengtel.com:2109/api/Message/save";
const URL_MESSAGE_UPDATE = "http://mintic.cengtel.com:2109/api/Message/update";
const URL_MESSAGE_DELETE = "http://mintic.cengtel.com:2109/api/Message";
//Variables
let tablaMensaje = $("#tablaMensaje");
let tablaMensajeEditar = $("#tablaMensajeEditar");
let tablaMensajeCrear = $("#tablaMensajeCrear");


///////////LOGICA PROGRAMACION PARA MENSAJES///////////////////

/*
 Metodo: obtenerMensajePorId
 Realiza una peticion HTTP/GET para obtener un solo registro
 de la base de datos por medio del API REST usando el ID.
 */
function obtenerMensajePorId(element) {
    limpiarTabla("#tablaMensajeEditar tr");
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_MESSAGE_GET_ID + "/" + id;
    //console.log(urlId);

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaMensajeEditar(tablaMensajeEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
 Metodo: obtenerTodosLosMensajes
 Hacer una peticion HTTP/GET para obtener la lista de toda las mensajes en 
 la base de datos por medio del API REST.
 */
function obtenerTodosLosMensajes() {
    limpiarTabla("#tablaMensaje tr");

    $.ajax({
        url: URL_MESSAGE_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaMensaje(tablaMensaje, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
 Metodo: agregarATablaMensaje
 Recibe la tabla y los elementos JSON de la peticion HTTP 
 para agregarlos a la tabla que lista las mensajes creadas
 */
function agregarATablaMensaje(tabla, data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        //console.log(element );
        //console.log("HOLA  4444");
        $(tabla).children().append("<tr><td>" + element["idMessage"] + "</td><td><a onclick='obtenerMensajePorId(this)' href='#'>" +
                element["messageText"] + "</a></td><td>" +
                element["client"]["idClient"] + "</td><td>" +
                element["farm"]["id"] + "</td>" +
                "<td><button onclick='borrarMensaje(this)'>Borrar</button></td></tr>");
    }
}

/*
 Metodo: agregarATablaMensajeEditar
 Recibe la tabla y los elementos de la peticion HTTP 
 para agregarlos a la tabla que permite editar la informacion
 */
function agregarATablaMensajeEditar(tabla, data) {
    limpiarTabla("#tablaMensajeEditar tr");
    //console.log(data);
    $(tabla).children().append("<tr><td>" +
            data["idMessage"] + "</td><td><input name='test' id='test' value=\"" +
            data["messageText"] + "\"></td><td><input name='test' id='test' value=\"" +
            data["client"]["idClient"] + "\"></td><td><input name='test' id='test' value=\"" +
            data["farm"]["id"] + "\"></td><td><button onclick='actualizarMensaje(this)'>Actualizar</button></td></tr>");
}

/*
 Metodo: borrarMensaje
 Obtiene el ID de la finca y envia una peticion HTTP para borrar
 el elemento de la base de datos
 */
function borrarMensaje(element) {
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_MESSAGE_DELETE + "/" + id;
    let datosObject = {id: id};
    //console.log(datosObject);

    $.ajax({
        url: urlId,
        data: JSON.stringify(datosObject),
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("El mensaje con id: " + id + " fue borrado exitosamente");
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

    limpiarTabla("#tablaMensaje tr");

    setTimeout(
            function () {
                obtenerTodosLosMensajes();
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
 Metodo: actualizarMensaje
 Obtiene los valores de la tabla detalle y luego 
 envia una peticion HTTP/PUT para actualizar el registro
 en la base de datos por medio de la API REST
 */
function actualizarMensaje(element) {
    let id = $(element).parent().parent().find('td').html();
    let rows = $("#tablaMensajeEditar td");

    //console.log(rows);

    let datosObject = {
        idMessage: id,
        messageText: $(rows[1]).children().val(),
        client: {idClient: $(rows[2]).children().val()},
        farm: {id: $(rows[3]).children().val()}
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_MESSAGE_UPDATE,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("El mensaje con id: " + id + " fue actualizado exitosamente");
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

    limpiarTabla("#tablaFinca tr");
    setTimeout(
            function () {
                obtenerTodosLosMensajes();
            }, 200);
    limpiarTabla("#tablaFincaEditar tr");
}

/*
 Metodo: crearMensaje
 Obtiene los valores de la tabla crear y luego 
 envia una peticion HTTP/POST para crear el registro
 en la base de datos por medio de la API REST
 */
function crearMensaje() {
    let rows = $("#tablaMensajeCrear td");

    let datosObject = {
        messageText: $(rows[0]).children().val(),
        client: {idClient: $(rows[1]).children().val()},
        farm: {id: $(rows[2]).children().val()}
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_MESSAGE_CREATE,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            $(rows[0]).children().val("");
            $(rows[1]).children().val("");
            $(rows[2]).children().val("");
            $("#mensajes").html("El mensaje " + datosObject.messageText + " fue creado exitosamente");
            limpiarTabla("#tablaMensaje tr");
            setTimeout(
                    function () {
                        obtenerTodosLosMensajes();
                    }, 200);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}
