//Contantes
const URL_RESERVATION_GET_ALL = "http://127.0.0.1:2109/api/Reservation/all";
//Variables
let tablaReserva = $("#noRegtablaReserva");
$(document).ready(function () {
    noReg_MostrarReservas();
});

function noReg_MostrarReservas() {
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
                + '</tr>');
    }
}
