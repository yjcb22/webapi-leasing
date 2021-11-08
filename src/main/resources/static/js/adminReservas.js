//Contantes
const URL_RESERVATION_GET_ALL = "http://127.0.0.1:2109/api/Reservation/all";
const URL_RESERVATION_GET_ID = "http://127.0.0.1:2109/api/Reservation";
const URL_RESERVATION_CREATE = "http://127.0.0.1:2109/api/Reservation/save";
const URL_RESERVATION_UPDATE = "http://127.0.0.1:2109/api/Reservation/update";
const URL_RESERVATION_DELETE = "http://127.0.0.1:2109/api/Reservation";
//Variables
let tablaReserva = $("#tablaReserva");
let formaReservaEditar = $("#formaReservaEditar");
let reserva_selectClientes = $("#clienteReserva");
let reserva_selectClientesEditar = $("#clienteReservaEditar");
let reserva_selectFincas = $("#fincaReserva");
let reserva_selectFincasEditar = $("#fincaReservaEditar");



///////////LOGICA PROGRAMACION PARA RESERVAS///////////////////


function actualizarInformacionTabReservas() {
//    console.log("hello");
    reserva_actualizarClientes();
    reserva_actualizarFincas();
    reserva_actualizarTabla();
}
/*
 Metodo: reserva_actualizarTabla
 Actualiza la tabla que muestra las reservas creadas o por actualizar
 */
function reserva_actualizarTabla() {
    //Borrar contenido de la tabla para evitar duplicados
    $("#tablaReserva tbody").empty();
    $.ajax({
        url: URL_RESERVATION_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
//            console.log(respuesta);
            reserva_agregarATablaReserva(tablaReserva, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
 Metodo: mensaje_actualizarClientes
 Actualiza el select con los clientes existentes
 */
function reserva_actualizarClientes() {
    //Borra los datos existentes en el select para que no queden duplicados
    $(reserva_selectClientes).empty();
    $(reserva_selectClientesEditar).empty();
    $.ajax({
        url: URL_CLIENT_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
//            console.log(respuesta);
            fillSelectClienteMensaje(reserva_selectClientes, respuesta);
            fillSelectClienteMensaje(reserva_selectClientesEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

}

/*
 Metodo: fillSelectClienteMensaje
 Llenar el select con la informacion de los clientes existentes
 */
function fillSelectClienteMensaje(select, data) {
    for (var i = 0; i < data.length; i++) {
//        console.log(data[i]);
        if (i === 0) {
            $(select).append('<option selected>Cliente</option>');
            $(select).append('<option value="' + data[i].idClient + '">' + data[i].name + '</option>');
        } else {
            $(select).append('<option value="' + data[i].idClient + '">' + data[i].name + '</option>');
        }
    }
}
/*
 Metodo: mensaje_actualizarFincas
 Llenar el select con la informacion de las fincas existentes
 */
function reserva_actualizarFincas() {
    //Borra los datos existentes en el select para que no queden duplicados
    $(reserva_selectFincas).empty();
    $(reserva_selectFincasEditar).empty();
    $.ajax({
        url: URL_FARM_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
//            console.log(respuesta);

            fillSelectFincaMensaje(reserva_selectFincas, respuesta);
            fillSelectFincaMensaje(reserva_selectFincasEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}
/*
 Metodo: fillSelectFincaMensaje
 Llenar el select con la informacion de las fincas existentes
 */
function fillSelectFincaMensaje(select, data) {
    for (var i = 0; i < data.length; i++) {
//        console.log(data[i]);
        if (i === 0) {
            $(select).append('<option selected>Finca</option>');
            $(select).append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
        } else {
            $(select).append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
        }
    }
}
/*
 Metodo: obtenerReservaPorId
 Realiza una peticion HTTP/GET para obtener un solo registro
 de la base de datos por medio del API REST usando el ID.
 */
function obtenerReservaPorId(element) {
    let id = $(element).parent().parent().find("th").html();
    let urlId = URL_RESERVATION_GET_ID + "/" + id;
    //console.log(urlId);

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarAFormaReservaEditar(formaReservaEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

///*
// Metodo: obtenerTodasLasCategorias
// Hacer una peticion HTTP/GET para obtener la lista de toda las categorias en 
// la base de datos por medio del API REST.
// */
//function obtenerTodasLasCategorias() {
//    limpiarTabla("#tablaCategoria tr");
//    $.ajax({
//        url: URL_CATEGORY_GET_ALL,
//        dataType: "json",
//        type: "GET",
//        success: function (respuesta) {
////            console.log(respuesta);
//            agregarATablaCategoria(tablaCategoria, respuesta);
//        },
//        error: function (xhr, status) {
//            $("#mensajes").html("Error POST" + status);
//        }
//    });
//}
//
/*
 Metodo: reserva_agregarATablaReserva
 Recibe la tabla y los elementos JSON de la peticion HTTP 
 para agregarlos a la tabla que lista las categorias creadas
 */
function reserva_agregarATablaReserva(tabla, data) {
//    console.log(tabla);
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        $(tabla).find("tbody").append('<tr><th scope="row">' + element.idReservation
                + '</th><td>' + element.startDate.substr(0, 10) + '</td><td>'
                + element.devolutionDate.substr(0, 10) + '</td>'
                + '<td>' + element.status + '</td>'
                + '<td>' + element.farm.name + '</td>'
                + '<td>' + element.client.name + '</td>'
                + '<td>' + element.score + '</td>'
                + '<td><button type="button" class="btn btn-secondary mr-2" onclick="obtenerReservaPorId(this)">Editar</button>'
                + '<button type="button" class="btn btn-danger" onclick="borrarReserva(this)">Borrar</button></td>'
                + '</tr>');
    }
}

/*
 Metodo: agregarAFormaReservaEditar
 Recibe la tabla y los elementos de la peticion HTTP 
 para agregarlos a la tabla que permite editar la informacion
 */
function agregarAFormaReservaEditar(forma, data) {
    //console.log(data);
    let inputs = $(forma).find("input");
    let boton = $(forma).find("button");
    let etiqueta = $("#idReservaEditar");
    let selector = $(forma).find("select");
    for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).prop('disabled', false);
    }
    for (var i = 0; i < selector.length; i++) {
        $(selector[i]).prop('disabled', false);
    }
    $(boton).prop('disabled', false);

    let inicio = data.startDate.substr(0, 10);
    let fin = data.devolutionDate.substr(0, 10);
//    console.log(inicio);
    $(etiqueta).html(data.idReservation);
    $(inputs[0]).val(inicio);
    $(inputs[1]).val(fin);
    $(selector[0]).val(data.client.idClient);
    $(selector[1]).val(data.farm.id);
    if (data.status == null) {
        $(selector[2]).val("Estado");
    } else {
        $(selector[2]).val(data.status);
    }
    if (data.score == null || data.score === "null") {
        $(selector[3]).val("Calificacion");
    } else {
        $(selector[3]).val(data.score);
    }


}

/*
 Metodo: borrarReserva
 Obtiene el ID de la finca y envia una peticion HTTP para borrar
 el elemento de la base de datos
 */
function borrarReserva(element) {
    let id = $(element).parent().parent().find("th").html();
    let urlId = URL_RESERVATION_DELETE + "/" + id;
    let datosObject = {id: id};
//    console.log(id);

    $.ajax({
        url: urlId,
        data: JSON.stringify(datosObject),
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#alertaReserva").find("span").html("La reserva con id: " + id + " fue borrada exitosamente");
            $("#alertaReserva").attr("class", "alert alert-success fade show");
        },
        error: function (xhr, status) {
            $("#alertaReserva").find("span").html(status);
            $("#alertaReserva").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                reserva_actualizarTabla();
            }, 800);
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
 Metodo: deshabilitarForma
 Deshabilita la forma para editar valores
 */
function deshabilitarForma(forma) {
    let inputs = $(forma).find("input");
    let boton = $(forma).find("button");
    let etiqueta = $("#idReservaEditar");
    let selector = $(forma).find("select");
    for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).prop('disabled', true);
    }
    for (var i = 0; i < selector.length; i++) {
        $(selector[i]).prop('disabled', true);
    }
    $(boton).prop('disabled', true);
    $(etiqueta).html("ID");
}

/*
 Metodo: actualizarReserva
 Obtiene los valores de la tabla detalle y luego 
 envia una peticion HTTP/PUT para actualizar el registro
 en la base de datos por medio de la API REST
 */
function actualizarReserva(element) {
    let id = $("#idReservaEditar").html();
    let inicio = $("#fechaInicioEditar").val();
    let fin = $("#fechaFinEditar").val();
    let cliente = $("#clienteReservaEditar").val();
    let finca = $("#fincaReservaEditar").val();
    let estado = $("#estadoReservaEditar").val();
    let calificacion = $("#calificacionReservaEditar").val();
    let datosObject;


    if (estado === "Estado" && calificacion === "Calificacion") {
        datosObject = {
            idReservation: id,
            startDate: inicio,
            devolutionDate: fin,
            client: {idClient: cliente},
            farm: {id: finca}
        };
    } else if (estado === "Estado") {
        datosObject = {
            idReservation: id,
            startDate: inicio,
            devolutionDate: fin,
            client: {idClient: cliente},
            farm: {id: finca},
            score: calificacion
        };
    } else if (calificacion === "Calificacion") {
        datosObject = {
            idReservation: id,
            startDate: inicio,
            devolutionDate: fin,
            status: estado,
            client: {idClient: cliente},
            farm: {id: finca}
        };
    } else {
        datosObject = {
            idReservation: id,
            startDate: inicio,
            devolutionDate: fin,
            status: estado,
            client: {idClient: cliente},
            farm: {id: finca},
            score: calificacion
        };
    }

//    console.log(datosObject);



    $.ajax({
        url: URL_RESERVATION_UPDATE,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#alertaReserva").find("span").html("Reserva actualizada con exito!");
            $("#alertaReserva").attr("class", "alert alert-success fade show");
            $("#fechaInicioEditar").val("");
            $("#fechaFinEditar").val("");
            $("#clienteReservaEditar").val("Cliente");
            $("#fincaReservaEditar").val("Finca");
            $("#estadoReservaEditar").val("Estado");
            $("#calificacionReservaEditar").val("Calificacion");
        },
        error: function (xhr, status) {
            $("#alertaReserva").find("span").html(status);
            $("#alertaReserva").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                reserva_actualizarTabla();
            }, 800);
    deshabilitarForma(formaReservaEditar);
}

/*
 Metodo: crearCategoria
 Obtiene los valores de la tabla crear y luego 
 envia una peticion HTTP/POST para crear el registro
 en la base de datos por medio de la API REST
 */
function crearReserva() {

    let inicio = $("#fechaInicio").val();
    let fin = $("#fechaFin").val();
    let cliente = $("#clienteReserva").val();
    let finca = $("#fincaReserva").val();
    let estado = $("#estadoReserva").val();
    let calificacion = $("#calificacionReserva").val();
    let datosObject;


    if (estado === "Estado" && calificacion === "Calificacion") {
        datosObject = {
            startDate: inicio,
            devolutionDate: fin,
            client: {idClient: cliente},
            farm: {id: finca}
        };
    } else if (estado === "Estado") {
        datosObject = {
            startDate: inicio,
            devolutionDate: fin,
            client: {idClient: cliente},
            farm: {id: finca},
            score: calificacion
        };
    } else if (calificacion === "Calificacion") {
        datosObject = {
            startDate: inicio,
            devolutionDate: fin,
            status: estado,
            client: {idClient: cliente},
            farm: {id: finca}
        };
    } else {
        datosObject = {
            startDate: inicio,
            devolutionDate: fin,
            status: estado,
            client: {idClient: cliente},
            farm: {id: finca},
            score: calificacion
        };
    }



    $.ajax({
        url: URL_RESERVATION_CREATE,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            $("#fechaInicio").val("");
            $("#fechaFin").val("");
            $("#clienteReserva").val("Cliente");
            $("#fincaReserva").val("Finca");
            $("#calificacionReserva").val("Calificacion");
            $("#alertaReserva").find("span").html("Reserva creada con exito!");
            $("#alertaReserva").attr("class", "alert alert-success fade show");
        },
        error: function (xhr, status) {
            $("#alertaReserva").find("span").html(status);
            $("#alertaReserva").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                reserva_actualizarTabla();
            }, 800);
}
$('#reserva-tab').on('click', function (e) {
    actualizarInformacionTabReservas();
});