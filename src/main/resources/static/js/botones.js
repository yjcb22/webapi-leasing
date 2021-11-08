/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    mostrarUsuarioRegistrado();
});

function mostrarUsuarioRegistrado() {
    $.ajax({
        url: "/usuario",
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            console.log(respuesta);
            $("#usuarioRegistrado").html("@" + respuesta.name);
        }
    });
}

function logoutPrincipal() {
    $.post("/logout", function () {
        console.log("log out");
        document.location.href = "/";
    });
    return true;
}

function go(e) {
    elementId = $(e).attr('id');
    console.log(elementId);
    if (elementId === "navLogin") {
        document.location.href = "/oauth2/authorization/github";
    } else if (elementId === "admin") {
        document.location.href = "admin.html";
    } else if (elementId === "categorias") {
        document.location.href = "categorias.html";
    } else if (elementId === "fincas") {
        document.location.href = "fincas.html";
    } else if (elementId === "clientes") {
        document.location.href = "clientes.html";
    } else if (elementId === "reservas") {
        document.location.href = "reservas.html";
    } else if (elementId === "mensajes") {
        document.location.href = "mensajes.html";
    } else if (elementId === "reportes") {
        document.location.href = "reportes.html";
    }else if (elementId === "mainLogout") {
        logoutPrincipal();        
    }
}