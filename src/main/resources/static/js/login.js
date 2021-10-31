$( document ).ready(function() {
      $.ajax({
        url: "/usuario",
        dataType: "json",
        type: "GET",
        success: function (respuesta) {
            console.log(respuesta);
            $("#usuario").html(respuesta.name);
            $(".sinAutenticacion").hide();
            $(".conAutenticacion").show();
        }       
    });
});

function logout(){
    $.post("/logout", function() {
        $("#usuario").html('');
        $(".sinAutenticacion").show();
        $(".conAutenticacion").hide();
    });
    return true;
}

