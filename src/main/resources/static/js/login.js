$(document).ready(function () {
    obtenerUsuarioRegistrado();
});

function obtenerUsuarioRegistrado() {
    $.ajax({
        url: "/usuario",
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            //console.log(respuesta);
            $("#usuarioRegistradoNavbar").html("@" + respuesta.name);
        }
    });
}
function login(){
    document.location.href = "/oauth2/authorization/github";
}

function logout() {
    $.post("/logout", function () {
        console.log("log out");
        document.location.href = "/";
//        $("#usuario").html('');
//        $(".sinAutenticacion").show();
//        $(".conAutenticacion").hide();
    });
    return true;
}

