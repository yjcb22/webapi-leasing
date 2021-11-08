//Contantes
const URL_RESERVATION_GET_ALL = "http://127.0.0.1:2109/api/Reservation/all";
const URL_RESERVATION_GET_ID = "http://127.0.0.1:2109/api/Reservation";
const URL_RESERVATION_CREATE = "http://127.0.0.1:2109/api/Reservation/save";
const URL_RESERVATION_UPDATE = "http://127.0.0.1:2109/api/Reservation/update";
const URL_RESERVATION_DELETE = "http://127.0.0.1:2109/api/Reservation";
//Variables
let tablaReservas = $("#tablaReservas");
let tablaReservasEditar = $("#tablaReservasEditar");
let tablaReservasCrear = $("#tablaReservasCrear");


///////////LOGICA PROGRAMACION PARA RESERVAS///////////////////

/*
 Metodo: obtenerReservasPorId
 Realiza una peticion HTTP/GET para obtener un solo registro
 de la base de datos por medio del API REST usando el ID.
 */
function obtenerReservasPorId(element) {
    limpiarTabla("#tablaReservasEditar tr");
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_RESERVATION_GET_ID + "/" + id;
    //console.log(urlId);

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaReservasEditar(tablaReservasEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
 Metodo: obtenerTodasLasReservas
 Hacer una peticion HTTP/GET para obtener la lista de toda las reservas en 
 la base de datos por medio del API REST.
 */
function obtenerTodasLasReservas() {
    limpiarTabla("#tablaReservas tr");

    $.ajax({
        url: URL_RESERVATION_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaReservas(tablaReservas, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
 Metodo: agregarATablaReservas
 Recibe la tabla y los elementos JSON de la peticion HTTP 
 para agregarlos a la tabla que lista las reservas creadas
 */
function agregarATablaReservas(tabla, data) {
    //console.log(data);
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        //console.log(element );
        //console.log("HOLA  4444");
        $(tabla).children().append("<tr><td>" + element["idReservation"] + "</td><td><a onclick='obtenerReservasPorId(this)' href='#'>" +
                element["startDate"] + "</a></td><td>" +
                element["devolutionDate"] + "</td><td>" +
                element["farm"]["id"] + "</td><td>" +
                element["client"]["idClient"] + "</td><td>" +
                element["status"] + "</td><td>" +
                element["score"] + "</td>" +
                "<td><button onclick='borrarReservas(this)'>Borrar</button></td></tr>");
    }
}

/*
 Metodo: agregarATablaReservasEditar
 Recibe la tabla y los elementos de la peticion HTTP 
 para agregarlos a la tabla que permite editar la informacion
 */
function agregarATablaReservasEditar(tabla, data) {
    limpiarTabla("#tablaReservasEditar tr");
    //console.log(data);
    $(tabla).children().append("<tr><td>" +
            data["idReservation"] + "</td><td><input name='reservaEditarNombre' id='reservaEditarNombre' value=\"" +
            data["startDate"] + "\"></td><td><input name='reservaEditarDescripcion' id='reservaEditarDescripcion' value=\"" +
            data["devolutionDate"] + "\"></td><td><input name='reservaEditarDescripcion' id='reservaEditarDescripcion' value=\"" +
            data["client"]["idClient"] + "\"></td><td><input name='reservaEditarDescripcion' id='reservaEditarDescripcion' value=\"" +
            data["farm"]["id"] + "\"></td><td><input name='reservaEditarDescripcion' id='reservaEditarDescripcion' value=\"" +
            data["status"] + "\"></td><td><input name='reservaEditarDescripcion' id='reservaEditarDescripcion' value=\"" +
            data["score"] + "\"></td>" +
            "<td><button onclick='actualizarReservas(this)'>Actualizar</button></td></tr>");
}

/*
 Metodo: borrarReservas
 Obtiene el ID de la finca y envia una peticion HTTP para borrar
 el elemento de la base de datos
 */
function borrarReservas(element) {
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_RESERVATION_DELETE + "/" + id;
    let datosObject = {id: id};
    //console.log(datosObject);

    $.ajax({
        url: urlId,
        data: JSON.stringify(datosObject),
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("La reserva con id: " + id + " fue borrada exitosamente");
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

    limpiarTabla("#tablaReservas tr");

    setTimeout(
            function () {
                obtenerTodasLasReservas();
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
 Metodo: actualizarReservas
 Obtiene los valores de la tabla detalle y luego 
 envia una peticion HTTP/PUT para actualizar el registro
 en la base de datos por medio de la API REST
 */
function actualizarReservas(element) {
    let id = $(element).parent().parent().find('td').html();
    let rows = $("#tablaReservasEditar td");

    //console.log(rows);

    let datosObject = {
        idReservation: id,
        startDate: $(rows[1]).children().val(),
        devolutionDate: $(rows[2]).children().val(),
        status: $(rows[5]).children().val(),
        farm: {id: $(rows[4]).children().val()},
        client: {idClient: $(rows[3]).children().val()},
        score: $(rows[6]).children().val()
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_RESERVATION_UPDATE,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("La reserva con id: " + id + " fue actualizada exitosamente");
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

    limpiarTabla("#tablaReservas tr");
    setTimeout(
            function () {
                obtenerTodasLasReservas();
            }, 200);
    limpiarTabla("#tablaReservasEditar tr");
}

/*
 Metodo: crearReservas
 Obtiene los valores de la tabla crear y luego 
 envia una peticion HTTP/POST para crear el registro
 en la base de datos por medio de la API REST
 */
function crearReserva() {
    let rows = $("#tablaReservasCrear td");

    let datosObject = {
        startDate: $(rows[0]).children().val(),
        devolutionDate: $(rows[1]).children().val(),
        client: {idClient: $(rows[2]).children().val()},
        farm: {id: $(rows[3]).children().val()}
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_RESERVATION_CREATE,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            $(rows[0]).children().val("");
            $(rows[1]).children().val("");
            $(rows[2]).children().val("");
            $(rows[3]).children().val("");
            $("#mensajes").html("La reserva para la finca " + datosObject["farm"]["id"] + " fue creada exitosamente");
            limpiarTabla("#tablaReservas tr");
            setTimeout(
                    function () {
                        obtenerTodasLasReservas();
                    }, 200);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}
