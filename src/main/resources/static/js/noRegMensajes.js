//Contantes
const URL_MESSAGE_GET_ALL = "http://mintic.cengtel.com:2109/api/Message/all";
//Variables
let tablaMensaje = $("#noRegtablaMensaje");
$(document).ready(function () {
    noReg_MostrarMensajes();
});


function noReg_MostrarMensajes() {
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
                + '</tr>');
    }
}