//Contantes
const URL_CLIENT_GET_ALL = "http://mintic.cengtel.com:2109/api/Client/all";
//Variables
let tablaCliente = $("#noRegTablaCliente");

$(document).ready(function () {
    noReg_MostrarClientes();
});

function noReg_MostrarClientes() {
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
                + '</tr>');
    }
}