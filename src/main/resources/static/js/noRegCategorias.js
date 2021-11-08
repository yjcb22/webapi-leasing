//Contantes
const URL_CATEGORY_GET_ALL = "http://127.0.0.1:2109/api/Category/all";
//Variables
let tablaCategoria = $("#noRegtablaCategoria");

$(document).ready(function () {
    noReg_MostrarCategorias();
});
function noReg_MostrarCategorias() {   
    $.ajax({
        url: URL_CATEGORY_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
//            console.log(respuesta);
            noReg_agregarATablaCategoria(tablaCategoria, respuesta);
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
function noReg_agregarATablaCategoria(tabla, data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        $(tabla).find("tbody").append('<tr><th scope="row">' + element.id
                + '</th><td>' + element.name + '</td><td>'
                + element.description + '</td>'            
                + '</tr>');
    }
}

function noReg_MostrarFincas() {
    console.log("fincas")
}

function noReg_MostraClientes() {
    console.log("clientes")
}

function noReg_MostrarReservas() {
    console.log("reservas")
}

function noReg_MostrarMensajes() {
    console.log("mensajes")
}

//
//$('#navCategorias').on('load', function (e) {
//    noReg_MostrarCategorias();
//});
//$('#navFincas').on('click', function (e) {
//    noReg_MostrarFincas();
//});
//$('#navClientes').on('click', function (e) {
//    noReg_MostraClientes();
//});
//$('#navReservas').on('click', function (e) {
//    noReg_MostrarReservas();
//});
//$('#navMensajes').on('click', function (e) {
//    noReg_MostrarMensajes();
//});


