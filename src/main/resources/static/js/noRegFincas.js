//Contantes
const URL_FARM_GET_ALL = "http://mintic.cengtel.com:2109/api/Farm/all";
//Variables
let tablaFinca = $("#noRegtablaFinca");

$(document).ready(function () {
    noReg_MostrarFincas();
});

function noReg_MostrarFincas() {
    $.ajax({
        url: URL_FARM_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
//            console.log(respuesta);
            agregarATablaFinca(tablaFinca, respuesta);


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
                    + '</tr>');
        } else {
            $(tabla).find("tbody").append('<tr><th scope="row">' + element.id
                    + '</th><td>' + element.name + '</td><td>'
                    + element.address + '</td>'
                    + '<td>' + element.extension + '</td>'
                    + '<td>' + element.description + '</td>'
                    + '<td>' + element.category.name + '</td>'                    
                    + '</tr>');
        }

    }
}




