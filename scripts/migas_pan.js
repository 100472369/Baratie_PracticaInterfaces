$(document).ready(function () {
    // logica para cargar la pagina correcta viniendo desde el menu 
    const urlActual = window.location.href;
    if (urlActual.includes('source=index_entrantes')) {
        pasarEntrantes();
    } else if  (urlActual.includes('source=index_principales')) {
        pasarPrincipales();
    } else if  (urlActual.includes('source=index_postres')) {
        pasarPostres();
    } else if  (urlActual.includes('source=index_cocteles')) {
        pasarCocteles();
    }
    else {
  // por defecto se carga la carta de entrantes
  $("#pagina_principales").hide(); 
  $("#pagina_postres").hide(); 
  $("#pagina_cocteles").hide();
    }
  // los botones de moviemiento en la parte inferior de la pantalla
  $("#Button_entrantes, #Boton_movimiento_back_entrantes").click(function(){
    pasarEntrantes();
  })

  $("#Button_principales, #Boton_movimiento_to_principales, #Boton_movimiento_back_principales").click(function(){
    pasarPrincipales();
  })

  $("#Button_postres, #Boton_movimiento_to_postres, #Boton_movimiento_back_postres").click(function(){
    pasarPostres();
  })

  $("#Button_cocteles, #Boton_movimiento_to_cocteles").click(function(){
    pasarCocteles();
  })

})
// funcion para pasar a entrantes y esconder todas las demas secciones
function pasarEntrantes(){
    $("#Button_postres").css("background-color", "rgb(220, 220, 220)");
    $("#Button_principales").css("background-color", "rgb(220, 220, 220)");
    $("#Button_cocteles").css("background-color", "rgb(220, 220, 220)");
    $("#Button_entrantes").css("background-color", "rgb(229,168,41)");
    $("#pagina_entrantes").show(); 
    $("#pagina_postres").hide(); 
    $("#pagina_cocteles").hide(); 
    $("#pagina_principales").hide(); 
}

// funcion para pasar a principales y esconder todas las demas secciones
function pasarPrincipales(){
    $("#Button_entrantes").css("background-color", "rgb(220, 220, 220)");
    $("#Button_postres").css("background-color", "rgb(220, 220, 220)");
    $("#Button_cocteles").css("background-color", "rgb(220, 220, 220)");
    $("#Button_principales").css("background-color", "rgb(229,168,41)");
    $("#pagina_entrantes").hide(); 
    $("#pagina_postres").hide(); 
    $("#pagina_cocteles").hide(); 
    $("#pagina_principales").show(); 
}
// funcion para pasar a postres y esconder todas las demas secciones
function pasarPostres(){
    $("#Button_entrantes").css("background-color", "rgb(220, 220, 220)");
    $("#Button_principales").css("background-color", "rgb(220, 220, 220)");
    $("#Button_cocteles").css("background-color", "rgb(220, 220, 220)");
    $("#Button_postres").css("background-color", "rgb(229,168,41)");
    $("#pagina_entrantes").hide(); 
    $("#pagina_postres").show(); 
    $("#pagina_cocteles").hide(); 
    $("#pagina_principales").hide(); 
}
// funcion para pasar a cocteles y esconder todas las demas secciones
function pasarCocteles(){
    $("#Button_entrantes").css("background-color", "rgb(220, 220, 220)");
    $("#Button_principales").css("background-color", "rgb(220, 220, 220)");
    $("#Button_postres").css("background-color", "rgb(220, 220, 220)");
    $("#Button_cocteles").css("background-color", "rgb(229,168,41)");
    $("#pagina_entrantes").hide(); 
    $("#pagina_postres").hide(); 
    $("#pagina_cocteles").show(); 
    $("#pagina_principales").hide(); 
}
