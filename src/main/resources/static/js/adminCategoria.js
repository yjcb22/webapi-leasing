//Contantes
const URL_CATEGORY_GET_ALL = "http://127.0.0.1:2109/api/Category/all";
const URL_CATEGORY_GET_ID = "http://127.0.0.1:2109/api/Category";
const URL_CATEGORY_CREATE = "http://127.0.0.1:2109/api/Category/save";
const URL_CATEGORY_UPDATE = "http://127.0.0.1:2109/api/Category/update";
const URL_CATEGORY_DELETE = "http://127.0.0.1:2109/api/Category";
//Variables
let tablaCategoria = $("#tablaCategoria");
let formaCategoriaEditar = $("#formaCategoriaEditar");



///////////LOGICA PROGRAMACION PARA CATEGORIA///////////////////

/*
 Metodo: obtenerCategoriaPorId
 Realiza una peticion HTTP/GET para obtener un solo registro
 de la base de datos por medio del API REST usando el ID.
 */
function obtenerCategoriaPorId(element) {
    let id = $(element).parent().parent().find("th").html();
    let urlId = URL_CATEGORY_DELETE + "/" + id;
    //console.log(urlId);

    $.ajax({
        url: urlId,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarAFormaCategoriaEditar(formaCategoriaEditar, respuesta);
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
//            console.log(respuesta);
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
        $(tabla).find("tbody").append('<tr><th scope="row">' + element.id
                + '</th><td>' + element.name + '</td><td>'
                + element.description + '</td>'
                + '<td><button type="button" class="btn btn-secondary mr-2" onclick="obtenerCategoriaPorId(this)">Editar</button>'
                + '<button type="button" class="btn btn-danger" onclick="borrarCategoria(this)">Borrar</button></td>'
                + '</tr>');
    }
}

/*
 Metodo: agregarATablaCategoriaEditar
 Recibe la tabla y los elementos de la peticion HTTP 
 para agregarlos a la tabla que permite editar la informacion
 */
function agregarAFormaCategoriaEditar(forma, data) {
    //limpiarTabla("#tablaCategoriaEditar tr");
    //console.log(data);
    let inputs = $(forma).find("input");
    let boton = $(forma).find("button");
    let etiqueta = $(forma).find("label");
    $(inputs[0]).prop('disabled', false);
    $(inputs[1]).prop('disabled', false);
    $(boton).prop('disabled', false);
    $(etiqueta).html(data.id);
    $(inputs[0]).val(data.name);
    $(inputs[1]).val(data.description);

}

/*
 Metodo: borrarCategoria
 Obtiene el ID de la finca y envia una peticion HTTP para borrar
 el elemento de la base de datos
 */
function borrarCategoria(element) {
    let id = $(element).parent().parent().find("th").html();
    let urlId = URL_CATEGORY_DELETE + "/" + id;
    let datosObject = {id: id};
//    console.log(id);

    $.ajax({
        url: urlId,
        data: JSON.stringify(datosObject),
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#alertaCategoria").find("span").html("La categoria con id: " + id + " fue borrada exitosamente");
            $("#alertaCategoria").attr("class", "alert alert-success fade show");
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });

    setTimeout(
            function () {
                obtenerTodasLasCategorias();
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

    let inputs = $(forma).parent().find("input");
    let boton = $(forma).parent().find("button");
    let etiqueta = $(forma).parent().find("label");
//    console.log(inputs);

    $(inputs[0]).prop('disabled', true);
    $(inputs[1]).prop('disabled', true);
    $(boton).prop('disabled', true);
    $(etiqueta).html("ID");
}

/*
 Metodo: actualizarCategoria
 Obtiene los valores de la tabla detalle y luego 
 envia una peticion HTTP/PUT para actualizar el registro
 en la base de datos por medio de la API REST
 */
function actualizarCategoria(element) {
    let labels = $(element).parent().find("label");
    let id = $(labels[0]).html();
    let texto = $(element).parent().find("input");
    let nombre = $(texto[0]).val();
    let descripcion = $(texto[1]).val();
//    console.log(descripcion);

    let datosObject = {
        id: id,
        name: nombre,
        description: descripcion
    };
    //console.log(datosObject);

    $.ajax({
        url: URL_CATEGORY_UPDATE,
        data: JSON.stringify(datosObject),
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            $("#alertaCategoria").find("span").html("Categoria actualizada con exito!");
            $("#alertaCategoria").attr("class", "alert alert-success fade show");
            $("#nombreCategoriaEditar").val("");
            $("#descripcionCategoriaEditar").val("");
        },
        error: function (xhr, status) {
            $("#alertaCategoria").find("span").html(status);
            $("#alertaCategoria").attr("class", "alert alert-danger fade show");
        }
    });

    setTimeout(
            function () {
                obtenerTodasLasCategorias();
            }, 800);
    deshabilitarForma(formaCategoriaEditar);
}

/*
 Metodo: crearCategoria
 Obtiene los valores de la tabla crear y luego 
 envia una peticion HTTP/POST para crear el registro
 en la base de datos por medio de la API REST
 */
function crearCategoria() {

    let nombre = $("#nombreCategoria").val();
    let description = $("#descripcionCategoria").val();

    let datosObject = {
        name: nombre,
        description: description
    };

    $.ajax({
        url: URL_CATEGORY_CREATE,
        data: JSON.stringify(datosObject),
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            $("#nombreCategoria").val("");
            $("#descripcionCategoria").val("");
            $("#alertaCategoria").find("span").html("Categoria creada con exito!");
            $("#alertaCategoria").attr("class", "alert alert-success fade show");       
        },
        error: function (xhr, status) {
            $("#alertaCategoria").find("span").html(status);
            $("#alertaCategoria").attr("class", "alert alert-danger fade show");
        }
    });
    
    setTimeout(
            function () {
                obtenerTodasLasCategorias();
            }, 800);
}
