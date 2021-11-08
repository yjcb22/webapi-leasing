//BRING EXISTING DATA

let tablaCategoriasFill = $("#tablaCategoria");
let selectFincasFill =    $("#CategoriaFinca") ;   
let selectFicasEditarFill =  $("#CategoriaFincaEditar") ;   

$(document).ready(function () {
    traerTodasLasCategorias();
    mostrarUsuarioRegistradoNavbar();


});

function traerTodasLasCategorias(){
    limpiarTabla("#tablaCategoria tr");
    $.ajax({
        url: URL_CATEGORY_GET_ALL,
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
//            console.log(respuesta);
            fillTablaCategoria(tablaCategoriasFill, respuesta);
            fillSelectCategoriaFinca(selectFincasFill, respuesta);
            fillSelectCategoriaFinca(selectFicasEditarFill, respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Error POST" + status);
        }
    });
}

//PESTAÑA CATEGORIA
function fillTablaCategoria(tabla, data){
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

//PESTAÑA FINCA
function fillSelectCategoriaFinca(select, data){
    //console.log(select);
    for (var i = 0; i < data.length; i++) {
//        console.log(data[i]);
        if(i ===0 ){
            $(select).append('<option selected>Categoria</option>');
            $(select).append('<option value="'+data[i].id+'">'+data[i].name+'</option>');
        } else{
            $(select).append('<option value="'+data[i].id+'">'+data[i].name+'</option>');            
        }        
    }
}


function mostrarUsuarioRegistradoNavbar() {
    $.ajax({
        url: "/usuario",
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
//            console.log(respuesta);
            $("#usuarioRegistradoNavbar").html("@" + respuesta.name);
        }
    });
}

function logout() {
    $.post("/logout", function () {
//        console.log("log out");
        document.location.href = "/";
//        $("#usuario").html('');
//        $(".sinAutenticacion").show();
//        $(".conAutenticacion").hide();
    });
    return true;
}