//Contantes
const URL_MESSAGE_GET_ALL = "http://mintic.cengtel.com:2109/api/Message/all";
const URL_MESSAGE_GET_ID = "http://mintic.cengtel.com:2109/api/Message";
const URL_MESSAGE_CREATE = "http://mintic.cengtel.com:2109/api/Message/save";
const URL_MESSAGE_UPDATE = "http://mintic.cengtel.com:2109/api/Message/update";
const URL_MESSAGE_DELETE = "http://mintic.cengtel.com:2109/api/Message";
//Variables
let tablaMensaje = $("#tablaMensaje");
let formaMensajeEditar = $("#formaMensajeEditar");
let selectClientes = $("#clienteMensaje");
let selectClientesEditar = $("#clienteMensajeEditar");
let selectFincas = $("#fincaMensaje");
let selectFincasEditar = $("#fincaMensajeEditar");
/////////////LOGICA PROGRAMACION PARA MENSAJES///////////////////

/*
 Metodo: actualizarInformacionTabClientes
 LLama todos los metodos necesarios para traer la informacion necesaria
 */
function actualizarInformacionTabMensaje() {
    mensaje_actualizarClientes();
    mensaje_actualizarFincas();
    mensaje_actualizarTabla();
}
/*
 Metodo: mensaje_actualizarTabla
 Actualiza la tabla que muestra las fincas creadas o por actualizar
 */
function mensaje_actualizarTabla() {
    //Borrar contenido de la tabla para evitar duplicados
    $("#tablaMensaje tbody").empty();
    $.ajax({
        url: URL_MESSAGE_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            mensaje_agregarATablaMensaje(tablaMensaje, respuesta);
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
function mensaje_actualizarClientes() {
    //Borra los datos existentes en el select para que no queden duplicados
    $(selectClientes).empty();
    $(selectClientesEditar).empty();
    $.ajax({
        url: URL_CLIENT_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
//            console.log(respuesta);
            fillSelectClienteMensaje(selectClientes, respuesta);
            fillSelectClienteMensaje(selectClientesEditar, respuesta);
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
function mensaje_actualizarFincas() {
    //Borra los datos existentes en el select para que no queden duplicados
//    console.log("here!");
    $(selectFincas).empty();
    $(selectFincasEditar).empty();
    
    $.ajax({
        url: URL_FARM_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);

            fillSelectFincaMensaje(selectFincas, respuesta);
            fillSelectFincaMensaje(selectFincasEditar, respuesta);
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
        //console.log(data[i]);
        if (i === 0) {
            $(select).append('<option selected>Finca</option>');
            $(select).append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
        } else {
            $(select).append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
        }
    }
}

/*
 Metodo: crearMensaje
 Obtiene los valores del formulario crear y luego 
 envia una peticion HTTP/POST para crear el registro
 en la base de datos por medio de la API REST
 */
function crearMensaje() {
    let texto = $("#textoMensaje").val();
    let cliente = $("#clienteMensaje").val();
    let finca = $("#fincaMensaje").val();   
//    console.log(categoria);

    let datosObject = {
        messageText: texto,
        client: {idClient: cliente},
        farm: {id: finca}
    };


    $.ajax({
        url: URL_MESSAGE_CREATE,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            $(texto).val("");
            $(cliente).val("Cliente");
            $(finca).val("Finca");            
            $("#alertaMensaje").find("span").html("Mensaje creado con exito!");
            $("#alertaMensaje").attr("class", "alert alert-success fade show");
        },
        error: function (xhr, status) {
            $("#alertaMensaje").find("span").html(status);
            $("#alertaMensaje").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                mensaje_actualizarTabla();
            }, 800);
}

/*
 Metodo: obtenerMensajePorId
 Realiza una peticion HTTP/GET para obtener un solo registro
 de la base de datos por medio del API REST usando el ID.
 */
function obtenerMensajePorId(element) {
    let id = $(element).parent().parent().find("th").html();
    let urlId = URL_MESSAGE_GET_ID + "/" + id;
    //console.log(urlId);

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            mensaje_agregarAFormaMensajeEditar(formaMensajeEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}


/*
 Metodo: agregarATablaMensaje
 Recibe la tabla y los elementos JSON de la peticion HTTP 
 para agregarlos a la tabla que lista las fincas creadas
 */
function mensaje_agregarATablaMensaje(tabla, data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        //console.log(element);
        $(tabla).find("tbody").append('<tr><th scope="row">' + element.idMessage
                + '</th><td>' + element.messageText + '</td><td>'
                + element.client.name + '</td>'
                + '<td>' + element.farm.name + '</td>'
                + '<td><button type="button" class="btn btn-secondary mr-2" onclick="obtenerMensajePorId(this)">Editar</button>'
                + '<button type="button" class="btn btn-danger" onclick="borrarMensaje(this)">Borrar</button></td>'
                + '</tr>');
    }
}

/*
 Metodo: agregarAFormaMensajeEditar
 Recibe la tabla y los elementos de la peticion HTTP 
 para agregarlos a el formulario que permite editar la informacion
 */
function mensaje_agregarAFormaMensajeEditar(forma, data) {   
    console.log(data);
    let inputs = $(forma).find("input");
    let selector = $(forma).find("select");
    let etiqueta = $(forma).find("label");
    let boton = $(forma).find("button");

    for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).prop('disabled', false);
    }
    for (var i = 0; i < selector.length; i++) {
        $(selector[i]).prop('disabled', false);
    }
    $(boton).prop('disabled', false);
    $(etiqueta).html(data.idMessage);
    $(inputs).val(data.messageText);
    $(selector[0]).val(data.client.idClient);
    $(selector[1]).val(data.farm.id);
}

/*
 Metodo: borrarCliente
 Obtiene el ID de la finca y envia una peticion HTTP para borrar
 el elemento de la base de datos
 */
function borrarMensaje(element) {
    let id = $(element).parent().parent().find("th").html();
    let urlId = URL_MESSAGE_DELETE + "/" + id;
    let datosObject = {id: id};
//    console.log(id);

    $.ajax({
        url: urlId,
        data: JSON.stringify(datosObject),
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#alertaMensaje").find("span").html("El mensaje con id: " + id + " fue borrado exitosamente");
            $("#alertaMensaje").attr("class", "alert alert-success fade show");
        },
        error: function (xhr, status) {
            $("#alertaMensaje").find("span").html(status);
            $("#alertaMensaje").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                 mensaje_actualizarTabla();
            }, 800);
}

/*
 Metodo: mensaje_deshabilitarForma
 Deshabilita la forma para editar valores
 */
function mensaje_deshabilitarForma(forma) {
    $("#textoMensajeEditar").val("");
    $("#clienteMensajeEditar").val("Cliente");
    $("#fincaMensajeEditar").val("Finca");   

    let inputs = $(forma).find("input");
    let selects = $(forma).find("select");
    let boton = $(forma).find("button");
    let etiqueta = $(forma).find("label");
    for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).prop('disabled', true);
    }
    for (var i = 0; i < selects.length; i++) {
        $(selects[i]).prop('disabled', true);
    }
    $(boton).prop('disabled', true);
    $(etiqueta).html("ID");
//    console.log(inputs);
}

/*
 Metodo: actualizarMensaje
 Obtiene los valores de la tabla detalle y luego 
 envia una peticion HTTP/PUT para actualizar el registro
 en la base de datos por medio de la API REST
 */
function actualizarMensaje(element) {
    let id = $("#idMensajeEditar").html();
    let texto = $("#textoMensajeEditar").val();
    let cliente = $("#clienteMensajeEditar").val();
    let finca = $("#fincaMensajeEditar").val();   
//    console.log(descripcion);

    let datosObject = {
        idMessage: id,
        messageText: texto,
        client: {idClient: cliente},
        farm: {id: finca}
    };

    //console.log(datosObject);

    $.ajax({
        url: URL_MESSAGE_UPDATE,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#alertaMensaje").find("span").html("Mensaje actualizado con exito!");
            $("#alertaMensaje").attr("class", "alert alert-success fade show");
        },
        error: function (xhr, status) {
            $("#alertaMensaje").find("span").html(status);
            $("#alertaMensaje").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                mensaje_actualizarTabla();
            }, 800);
    mensaje_deshabilitarForma(formaMensajeEditar);
}


$('#mensaje-tab').on('click', function (e) {
    actualizarInformacionTabMensaje();
});
