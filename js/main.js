//Contantes
const URL_FINCA = "https://g2c470a075741f7-dbfinca.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/farm/farm";
const URL_CLIENTE = ""
const URL_MENSAJE = ""
//Variables
let tablaFinca = $("#tablaFinca");
let tablaFincaEditar = $("#tablaFincaEditar");
let tablaFincaCrear = $("#tablaFincaCrear");

///////////LOGICA PROGRAMACION PARA FINCA///////////////////

/*
Metodo: obtenerFincaPorId
Realiza una peticion HTTP/GET para obtener un solo registro
de la base de datos por medio del API REST usando el ID.
*/
function obtenerFincaPorId(element) {
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_FINCA + "/" + id;

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            agregarATablaEditar(tablaFincaEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
Metodo: listarFinca
Hacer una peticion HTTP/GET para obtener la lista de fincas en la tabla
por medio del API REST configurada en Oracle cloud.
*/
function obtenerTodasLasFincas() {
    limpiarTabla("#tablaFinca tr");

    $.ajax({
        url: URL_FINCA,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta.items);
            agregarATabla(tablaFinca, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
Metodo: agregarATabla
Recibe la tabla y los elementos de la peticion HTTP 
para agregarlos a la tabla que lista las fincas creadas
*/
function agregarATabla(tabla, data) {

    for (let i = 0; i < data["items"].length; i++) {
        const element = data["items"][i];
        //console.log(element );
        $(tabla).children().append("<tr><td>" + element["id"] + "</td><td><a onclick='obtenerFincaPorId(this)' href='#'>" +
            element["name"] + "</a></td><td>" +
            element["exension"] + "</td><td>" +
            element["category_id"] + "</td><td>" +
            element["address"] +
            "</td><td><button onclick='borrarFinca(this)'>Borrar</button></td></tr>");
    }
}

/*
Metodo: agregarATablaEditar
Recibe la tabla y los elementos de la peticion HTTP 
para agregarlos a la tabla que permite editar la informacion
*/
function agregarATablaEditar(tabla, data) {
    for (let i = 0; i < data["items"].length; i++) {
        const element = data["items"][i];
        //console.log(element );
        $(tabla).children().append("<tr><td>" +
            element["id"] + "</td><td><input name='test' id='test' value=\"" +
            element["name"] + "\"></td><td><input name='test' id='test' value=\"" +
            element["exension"] + "\"></td><td><input name='test' id='test' value=\"" +
            element["category_id"] + "\"></td><td><input name='test' id='test' value=\"" +
            element["address"] + "\"></td><td><button onclick='actualizarFinca(this)'>Actualizar</button></td></tr>");
    }
}

/*
Metodo: borrarFinca
Obtiene el ID de la finca y envia una peticion HTTP para borrar
el elemento de la base de datos
*/
function borrarFinca(element) {
    let id = $(element).parent().parent().find('td').html();
    let datosObject = { id: id };

    $.ajax({
        url: URL_FINCA,
        data: JSON.stringify(datosObject),
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("El elemento con id: " + id + " fue borrado exitosamente");
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
        exension: $(rows[2]).children().val(),
        category_id: $(rows[3]).children().val(),
        name: $(rows[1]).children().val()
    };

    $.ajax({
        url: URL_FINCA,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("El elemento con id: " + id + " fue actualizado exitosamente");
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
        id: $(rows[0]).children().val(),
        address: $(rows[4]).children().val(),
        exension: $(rows[2]).children().val(),
        category_id: $(rows[3]).children().val(),
        name: $(rows[1]).children().val()
    };

    $.ajax({
        url: URL_FINCA,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            $(rows[0]).children().val("");
            $(rows[4]).children().val("");
            $(rows[2]).children().val("");
            $(rows[3]).children().val("");
            $(rows[1]).children().val("");
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


///////////LOGICA PROGRAMACION PARA CLIENTE///////////////////
//Comentario agregado para rama develop


///////////LOGICA PROGRAMACION PARA MENSAJE///////////////////
//Comentario agregado para rama develop

// este es la prueba de mensaje