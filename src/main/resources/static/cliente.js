//Contantes
const URL_CLIENT_GET_ALL = "http://127.0.0.1:2109/api/Client/all";
const URL_CLIENT_GET_ID = "http://127.0.0.1:2109/api/Client";
const URL_CLIENT_CREATE = "http://127.0.0.1:2109/api/Client/save";
const URL_CLIENT_UPDATE = "http://127.0.0.1:2109/api/Client/update";
const URL_CLIENT_DELETE = "http://127.0.0.1:2109/api/Client";
//Variables
let tablaCliente = $("#tablaCliente");
let tablaClienteEditar = $("#tablaClienteEditar");
let tablaClienteCrear = $("#tablaClienteCrear");


///////////LOGICA PROGRAMACION PARA CLIENTE///////////////////

/*
 Metodo: obtenerClientePorId
 Realiza una peticion HTTP/GET para obtener un solo registro
 de la base de datos por medio del API REST usando el ID.
 */
function obtenerClientePorId(element) {
    limpiarTabla("#tablaClienteEditar tr");
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_CLIENT_GET_ID + "/" + id;
    //console.log(urlId);

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaClienteEditar(tablaClienteEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
 Metodo: obtenerTodasLasClientes
 Hacer una peticion HTTP/GET para obtener la lista de toda las categorias en 
 la base de datos por medio del API REST.
 */
function obtenerTodosLosClientes() {
    limpiarTabla("#tablaCliente tr");

    $.ajax({
        url: URL_CLIENT_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaCliente(tablaCliente, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

/*
 Metodo: agregarATablaCliente
 Recibe la tabla y los elementos JSON de la peticion HTTP 
 para agregarlos a la tabla que lista las categorias creadas
 */
function agregarATablaCliente(tabla, data) {

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        $(tabla).children().append("<tr><td>" + element["idClient"] + "</td><td><a onclick='obtenerClientePorId(this)' href='#'>" +
                element["name"] + "</a></td><td>" +
                element["email"] + "</td><td>" +
                element["password"] + "</td><td>" +
                element["age"] + "</td>" +
                "<td><button onclick='borrarCliente(this)'>Borrar</button></td></tr>");
        //console.log(i);
    }
}

/*
 Metodo: agregarATablaClienteEditar
 Recibe la tabla y los elementos de la peticion HTTP 
 para agregarlos a la tabla que permite editar la informacion
 */
function agregarATablaClienteEditar(tabla, data) {
    limpiarTabla("#tablaClienteEditar tr");
    //console.log(data);
    $(tabla).children().append("<tr><td>" +
            data["idClient"] + "</td><td><input name='test' id='test' value=\"" +
            data["name"] + "\"></td><td><input name='test' id='test' value=\"" +
            data["email"] + "\"></td><td><input name='test' id='test' value=\"" +
            data["password"] + "\"></td><td><input name='test' id='test' value=\"" +
            data["age"] + "\"></td><td><button onclick='actualizarCliente(this)'>Actualizar</button></td></tr>");
}

/*
 Metodo: borrarCliente
 Obtiene el ID de la finca y envia una peticion HTTP para borrar
 el elemento de la base de datos
 */
function borrarCliente(element) {
    let id = $(element).parent().parent().find('td').html();
    let urlId = URL_CLIENT_DELETE + "/" + id;
    let datosObject = {id: id};
    //console.log(datosObject);

    $.ajax({
        url: urlId,
        data: JSON.stringify(datosObject),
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("El cliente con id: " + id + " fue borrado exitosamente");
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

    limpiarTabla("#tablaCliente tr");

    setTimeout(
            function () {
                obtenerTodosLosClientes();
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
 Metodo: actualizarCliente
 Obtiene los valores de la tabla detalle y luego 
 envia una peticion HTTP/PUT para actualizar el registro
 en la base de datos por medio de la API REST
 */
function actualizarCliente(element) {
    let id = $(element).parent().parent().find('td').html();
    let rows = $("#tablaClienteEditar td");

    //console.log(id);

    let datosObject = {
        idClient: id,
        name: $(rows[1]).children().val(),
        email: $(rows[2]).children().val(),        
        password: $(rows[3]).children().val(),
        age: $(rows[4]).children().val(),
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_CLIENT_UPDATE,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#mensajes").html("El cliente con id: " + id + " fue actualizado exitosamente");
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

    limpiarTabla("#tablaFinca tr");
    setTimeout(
            function () {
                obtenerTodosLosClientes();
            }, 200);
    limpiarTabla("#tablaFincaEditar tr");
}

/*
 Metodo: crearCliente
 Obtiene los valores de la tabla crear y luego 
 envia una peticion HTTP/POST para crear el registro
 en la base de datos por medio de la API REST
 */
function crearCliente() {
    let rows = $("#tablaClienteCrear td");

    let datosObject = {
        name: $(rows[0]).children().val(),
        email: $(rows[1]).children().val(),
        age: $(rows[2]).children().val(),
        password: $(rows[3]).children().val()
    };

    $.ajax({
        url: URL_CLIENT_CREATE,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuestaCliente);
            $(rows[0]).children().val("");
            $(rows[1]).children().val("");
            $(rows[2]).children().val("");
            $(rows[3]).children().val("");

            $("#mensajes").html("El cliente: " + datosObject.name + " fue creado exitosamente");
            limpiarTabla("#tablaCliente tr");
            setTimeout(
                    function () {
                        obtenerTodosLosClientes();
                    }, 200);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}