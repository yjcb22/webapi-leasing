//Contantes
const URL_FARM_GET_ALL = "http://mintic.cengtel.com:2109/api/Farm/all";
const URL_FARM_GET_ID = "http://mintic.cengtel.com:2109/api/Farm";
const URL_FARM_CREATE = "http://mintic.cengtel.com:2109/api/Farm/save";
const URL_FARM_UPDATE = "http://mintic.cengtel.com:2109/api/Farm/update";
const URL_FARM_DELETE = "http://mintic.cengtel.com:2109/api/Farm";
//Variables
let tablaFinca = $("#tablaFinca");
let formaFincaEditar = $("#formaFincaEditar");



///////////LOGICA PROGRAMACION PARA FINCAS///////////////////
/*
 Metodo: actualizarInformacionTabFinca
 LLama todos los metodos necesarios para traer la informacion necesaria
 */
function actualizarInformacionTabFinca() {
    finca_actualizarCategorias();
    finca_actualizarTabla();
}
/*
 Metodo: finca_actualizarCategorias
 Actualiza el select de los formularios agregar y editar Fincas
 */
function finca_actualizarCategorias() {
    //Borra los datos existentes en el select para que no queden duplicados
    $(selectFincasFill).empty();
    $(selectFicasEditarFill).empty();
    $.ajax({
        url: URL_CATEGORY_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
//            console.log(respuesta);
//funcion definida en informacionInicial.js
            fillSelectCategoriaFinca(selectFincasFill, respuesta);
            fillSelectCategoriaFinca(selectFicasEditarFill, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

function finca_actualizarTabla() {
    //Borrar contenido de la tabla para evitar duplicados
    $("#tablaFinca tbody").empty();
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
 Metodo: crearFinca
 Obtiene los valores del formulario crear y luego 
 envia una peticion HTTP/POST para crear el registro
 en la base de datos por medio de la API REST
 */
function crearFinca() {

    let nombre = $("#nombreFinca").val();
    let direccion = $("#direccionFinca").val();
    let extencion = $("#extensionFinca").val();
    let descripcion = $("#descripcionFinca").val();
    let categoria = $("#CategoriaFinca").val();
//    console.log(categoria);

    let datosObject = {
        address: direccion,
        extension: extencion,
        category: {id: categoria},
        name: nombre,
        description: descripcion,

    };


    $.ajax({
        url: URL_FARM_CREATE,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            $("#nombreFinca").val("");
            $("#direccionFinca").val("");
            $("#extensionFinca").val("");
            $("#descripcionFinca").val("");

            $("#alertaFinca").find("span").html("Finca creada con exito!");
            $("#alertaFinca").attr("class", "alert alert-success fade show");


        },
        error: function (xhr, status) {
            $("#alertaFinca").find("span").html(status);
            $("#alertaFinca").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                finca_actualizarTabla();
            }, 800);
}

/*
 Metodo: obtenerFincaPorId
 Realiza una peticion HTTP/GET para obtener un solo registro
 de la base de datos por medio del API REST usando el ID.
 */
function obtenerFincaPorId(element) {
    let id = $(element).parent().parent().find("th").html();
    let urlId = URL_FARM_GET_ID + "/" + id;
    //console.log(urlId);

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarAFormaFincaEditar(formaFincaEditar, respuesta);
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
function agregarATablaFinca(tabla, data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        //console.log(element);
        if (element.category == null) {
            $(tabla).find("tbody").append('<tr><th scope="row">' + element.id
                    + '</th><td>' + element.name + '</td><td>'
                    + element.address + '</td>'
                    + '<td>' + element.extension + '</td>'
                    + '<td>' + element.description + '</td>'
                    + '<td>' + element.category + '</td>'
                    + '<td><button type="button" class="btn btn-secondary mr-2" onclick="obtenerFincaPorId(this)">Editar</button>'
                    + '<button type="button" class="btn btn-danger" onclick="borrarFinca(this)">Borrar</button></td>'
                    + '</tr>');
        } else {
            $(tabla).find("tbody").append('<tr><th scope="row">' + element.id
                    + '</th><td>' + element.name + '</td><td>'
                    + element.address + '</td>'
                    + '<td>' + element.extension + '</td>'
                    + '<td>' + element.description + '</td>'
                    + '<td>' + element.category.name + '</td>'
                    + '<td><button type="button" class="btn btn-secondary mr-2" onclick="obtenerFincaPorId(this)">Editar</button>'
                    + '<button type="button" class="btn btn-danger" onclick="borrarFinca(this)">Borrar</button></td>'
                    + '</tr>');
        }

    }
}

/*
 Metodo: agregarAFormaFincaEditar
 Recibe la tabla y los elementos de la peticion HTTP 
 para agregarlos a la tabla que permite editar la informacion
 */
function agregarAFormaFincaEditar(forma, data) {
    //limpiarTabla("#tablaCategoriaEditar tr");
    //console.log(data);
    let inputs = $(forma).find("input");
    let boton = $(forma).find("button");
    let etiqueta = $(forma).find("label");
    let selector = $(forma).find("select");
    for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).prop('disabled', false);
    }
    $(boton).prop('disabled', false);
    $(selector).prop('disabled', false);
    $(etiqueta).html(data.id);
    $(inputs[0]).val(data.name);
    $(inputs[1]).val(data.address);
    $(inputs[2]).val(data.extension);
    $(inputs[3]).val(data.description);
    if (data.category.id != null) {
        selector.val(data.category.id);
    }


}

/*
 Metodo: borrarCategoria
 Obtiene el ID de la finca y envia una peticion HTTP para borrar
 el elemento de la base de datos
 */
function borrarFinca(element) {
    let id = $(element).parent().parent().find("th").html();
    let urlId = URL_FARM_DELETE + "/" + id;
    let datosObject = {id: id};
//    console.log(id);

    $.ajax({
        url: urlId,
        data: JSON.stringify(datosObject),
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#alertaFinca").find("span").html("La categoria con id: " + id + " fue borrada exitosamente");
            $("#alertaFinca").attr("class", "alert alert-success fade show");
        },
        error: function (xhr, status) {
            $("#alertaFinca").find("span").html(status);
            $("#alertaFinca").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                finca_actualizarTabla();
            }, 800);
}

/*
 Metodo: deshabilitarForma
 Deshabilita la forma para editar valores
 */
function finca_deshabilitarForma(forma) {
    $("#idFincaEditar").html("ID");
    $("#nombreFincaEditar").val("");
    $("#direccionFincaEditar").val("");
    $("#extensionFincaEditar").val("");
    $("#descripcionFincaEditar").val("");
    $("#CategoriaFincaEditar").val("Categoria");
    let inputs = $(forma).find("input");
    let boton = $(forma).find("button");
    let etiqueta = $(forma).find("label");
    for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).prop('disabled', true);
    }
    $(boton).prop('disabled', true);
    $("#CategoriaFincaEditar").prop('disabled', true); 
}

/*
 Metodo: actualizarFinca
 Obtiene los valores de la tabla detalle y luego 
 envia una peticion HTTP/PUT para actualizar el registro
 en la base de datos por medio de la API REST
 */
function actualizarFinca(element) {
    let id = $("#idFincaEditar").html();
    let nombre = $("#nombreFincaEditar").val();
    let direccion = $("#direccionFincaEditar").val();
    let extencion = $("#extensionFincaEditar").val();
    let descripcion = $("#descripcionFincaEditar").val();
    let categoria = $("#CategoriaFincaEditar").val();
//    console.log(descripcion);

    let datosObject = {
        id: id,
        address: direccion,
        extension: extencion,
        category: {id: categoria},
        name: nombre,
        description: descripcion

    };
    //console.log(datosObject);

    $.ajax({
        url: URL_FARM_UPDATE,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#alertaFinca").find("span").html("Finca actualizada con exito!");
            $("#alertaFinca").attr("class", "alert alert-success fade show");
            finca_deshabilitarForma(formaFincaEditar);
        },
        error: function (xhr, status) {
            $("#alertaFinca").find("span").html(status);
            $("#alertaFinca").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                finca_actualizarTabla();
            }, 800);
    
}


$('#finca-tab').on('click', function (e) {
    actualizarInformacionTabFinca();
});
