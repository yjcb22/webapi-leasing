//Contantes
const REPORTBYTIME = "http://127.0.0.1:2109/api/Reservation/report-dates";
const REPORTCOMPARE = "http://127.0.0.1:2109/api/Reservation/report-status";
const REPORTCLIENTETOP = "http://127.0.0.1:2109/api/Reservation/report-clients";
//Variables
let inicio = $("#fechaInicio");
let fin = $("#fechaFin");
let tablaRepTiempo = $("#tablaRango");
let tablaComparar = $("#tablaTiempo");
let tablaTop = $("#tablaTopClientes");

function buscarReservaTiempo() {
    $("#tablaRango tbody").empty();
    inicio = $(inicio).val();
    fin = $(fin).val();
    let urlTemp = REPORTBYTIME + "/" + inicio + "/" + fin;

    $.ajax({
        url: urlTemp,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATableRepTiempo(tablaRepTiempo, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

function agregarATableRepTiempo(tabla, data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        //console.log(element);
        $(tabla).find("tbody").append('<tr><th scope="row">' + element.idReservation
                + '</th><td>' + element.startDate.substr(0, 10) + '</td>'
                + '<td>' + element.devolutionDate.substr(0, 10) + '</td>'
                + '<td>' + element.status + '</td>'
                + '<td>' + element.farm.name + '</td>'
                + '<td>' + element.client.name + '</td>'
                + '<td>' + element.score + '</td>'
                + '</tr>');
    }
}

function generarReporteComparar() {
    $("#tablaTiempo tbody").empty();

    $.ajax({
        url: REPORTCOMPARE,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaComparar(tablaComparar, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

function agregarATablaComparar(tabla, data) {
    $(tabla).find("tbody").append('<tr><td>' + data.completed + '</td><td>' + data.cancelled + '</td></tr>');
}

function generarReporteTopClientes() {
    $("#tablaTopClientes tbody").empty();

    $.ajax({
        url: REPORTCLIENTETOP,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            agregarATablaTop(tablaTop, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

function agregarATablaTop(tabla, data) {
   for (let i = 0; i < data.length; i++) {
        const element = data[i];
        //console.log(element);
        $(tabla).find("tbody").append('<tr><th scope="row">' + element.client.idClient
                + '</th><td>' + element.client.name + '</td>'
                + '<td>' + element.total + '</td>'               
                + '</tr>');
    }
}

$('#comparar-tab').on('click', function (e) {
    generarReporteComparar();
});
$('#topclientes-tab').on('click', function (e) {
    generarReporteTopClientes();
});