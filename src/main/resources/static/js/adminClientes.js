//Contantes
const URL_CLIENT_GET_ALL = "http://mintic.cengtel.com:2109/api/Client/all";
const URL_CLIENT_GET_ID = "http://mintic.cengtel.com:2109/api/Client";
const URL_CLIENT_CREATE = "http://mintic.cengtel.com:2109/api/Client/save";
const URL_CLIENT_UPDATE = "http://mintic.cengtel.com:2109/api/Client/update";
const URL_CLIENT_DELETE = "http://mintic.cengtel.com:2109/api/Client";
//Variables
let tablaCliente = $("#tablaCliente");
let formaClienteEditar = $("#formaClienteEditar");
/////////////LOGICA PROGRAMACION PARA CLIENTES///////////////////

/*
 Metodo: actualizarInformacionTabClientes
 LLama todos los metodos necesarios para traer la informacion necesaria
 */
function actualizarInformacionTabClientes() {
    cliente_actualizarTabla();
}
/*
 Metodo: cliente_actualizarTabla
 Actualiza la tabla que muestra las fincas creadas o por actualizar
 */
function cliente_actualizarTabla() {
    //Borrar contenido de la tabla para evitar duplicados
    $("#tablaCliente tbody").empty();
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
 Metodo: crearCliente
 Obtiene los valores del formulario crear y luego 
 envia una peticion HTTP/POST para crear el registro
 en la base de datos por medio de la API REST
 */
function crearCliente() {
    let nombre = $("#nombreCliente").val();
    let email = $("#emailCliente").val();
    let password = $("#passwordCliente").val();
    let edad = $("#edadCliente").val();
//    console.log(categoria);

    let datosObject = {
        name: nombre,
        email: email,
        password: password,
        age: edad
    };


    $.ajax({
        url: URL_CLIENT_CREATE,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            $("#nombreCliente").val("");
            $("#emailCliente").val("");
            $("#passwordCliente").val("");
            $("#edadCliente").val("");
            $("#alertaCliente").find("span").html("Cliente creado con exito!");
            $("#alertaCliente").attr("class", "alert alert-success fade show");
        },
        error: function (xhr, status) {
            $("#alertaCliente").find("span").html(status);
            $("#alertaCliente").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                cliente_actualizarTabla();
            }, 800);
}

/*
 Metodo: obtenerClientePorId
 Realiza una peticion HTTP/GET para obtener un solo registro
 de la base de datos por medio del API REST usando el ID.
 */
function obtenerClientePorId(element) {
    let id = $(element).parent().parent().find("th").html();
    let urlId = URL_CLIENT_GET_ID + "/" + id;
    //console.log(urlId);

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarAFormaClienteEditar(formaClienteEditar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}


/*
 Metodo: agregarATablaFinca
 Recibe la tabla y los elementos JSON de la peticion HTTP 
 para agregarlos a la tabla que lista las fincas creadas
 */
function agregarATablaCliente(tabla, data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        //console.log(element);
        $(tabla).find("tbody").append('<tr><th scope="row">' + element.idClient
                + '</th><td>' + element.name + '</td><td>'
                + element.email + '</td>'
                + '<td>' + element.password + '</td>'
                + '<td>' + element.age + '</td>'
                + '<td><button type="button" class="btn btn-secondary mr-2" onclick="obtenerClientePorId(this)">Editar</button>'
                + '<button type="button" class="btn btn-danger" onclick="borrarCliente(this)">Borrar</button></td>'
                + '</tr>');
    }
}

/*
 Metodo: agregarAFormaClienteEditar
 Recibe la tabla y los elementos de la peticion HTTP 
 para agregarlos a la tabla que permite editar la informacion
 */
function agregarAFormaClienteEditar(forma, data) {
    //limpiarTabla("#tablaCategoriaEditar tr");
    //console.log(data);
    let inputs = $(forma).find("input");
    let boton = $(forma).find("button");
    let etiqueta = $(forma).find("label");

    for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).prop('disabled', false);
    }
    $(boton).prop('disabled', false);
    $(etiqueta).html(data.idClient);
    $(inputs[0]).val(data.name);
    $(inputs[1]).val(data.email);
    $(inputs[2]).val(data.password);
    $(inputs[3]).val(data.age);



}

/*
 Metodo: borrarCliente
 Obtiene el ID de la finca y envia una peticion HTTP para borrar
 el elemento de la base de datos
 */
function borrarCliente(element) {
    $("#idClienteEditar").html("ID");
    $("#nombreFincaEditar").val("");
    $("#direccionFincaEditar").val("");
    $("#extensionFincaEditar").val("");
    $("#descripcionFincaEditar").val("");
    $("#CategoriaFincaEditar").val("Categoria");
    let id = $(element).parent().parent().find("th").html();
    let urlId = URL_CLIENT_DELETE + "/" + id;
    let datosObject = {id: id};
//    console.log(id);

    $.ajax({
        url: urlId,
        data: JSON.stringify(datosObject),
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#alertaCliente").find("span").html("El cliente con id: " + id + " fue borrado exitosamente");
            $("#alertaCliente").attr("class", "alert alert-success fade show");
        },
        error: function (xhr, status) {
            $("#alertaCliente").find("span").html(status);
            $("#alertaCliente").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                cliente_actualizarTabla();
            }, 800);
}

/*
 Metodo: deshabilitarForma
 Deshabilita la forma para editar valores
 */
function cliente_deshabilitarForma(forma) {
    $("#nombreClienteEditar").val("");
    $("#emailClienteEditar").val("");
    $("#passwordClienteEditar").val("");
    $("#edadClienteEditar").val("");

    let inputs = $(forma).find("input");
    let boton = $(forma).find("button");
    let etiqueta = $(forma).find("label");
    for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).prop('disabled', true);
    }
    $(boton).prop('disabled', true);
    $(etiqueta).html("ID");
//    console.log(inputs);
}

/*
 Metodo: actualizarCliente
 Obtiene los valores de la tabla detalle y luego 
 envia una peticion HTTP/PUT para actualizar el registro
 en la base de datos por medio de la API REST
 */
function actualizarCliente(element) {
    let id = $("#IdClienteEditar").html();
    let nombre = $("#nombreClienteEditar").val();
    let email = $("#emailClienteEditar").val();
    let password = $("#passwordClienteEditar").val();
    let edad = $("#edadClienteEditar").val();
//    console.log(descripcion);

    let datosObject = {
        idClient: id,
        name: nombre,
        email: email,
        password: password,
        age: edad
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_CLIENT_UPDATE,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#alertaCliente").find("span").html("Cliente actualizado con exito!");
            $("#alertaCliente").attr("class", "alert alert-success fade show");
        },
        error: function (xhr, status) {
            $("#alertaCliente").find("span").html(status);
            $("#alertaCliente").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                cliente_actualizarTabla();
            }, 800);
    cliente_deshabilitarForma(formaClienteEditar);
}


$('#cliente-tab').on('click', function (e) {
    actualizarInformacionTabClientes();
});
