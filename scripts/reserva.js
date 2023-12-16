$(document).ready(function (){
    // Cuando carguemos el documento es importante generar los meses segun la fecha en la que estamos
    let idioma = $('html').attr('lang');
    generarDivsProximosMeses(idioma);
    let ciudad_elegida = $("#ciudad_elegida");
    let hora_elegida = $("#hora_elegida");
    let personas_elegidas = $("#personas_elegidas");
    let mes_elegido = $("#mes_elegido");
    let dia_elegido = $("#dia_elegido");
    const submit = $("#submit");
    const nombreRegistrado = localStorage.getItem('nombre');
    const telefonoRegistrado = localStorage.getItem('telefono');
    const emailRegistrado = localStorage.getItem('email');
    const direccionRegistrada = localStorage.getItem('direccion');
    // El contenido por defecto de los seleccionables de reserva seran o el texto por defecto o lo residente por cookies
    // si ya se ha seleccionado algo previamente que no ha sido confirmado
    ciudad_elegida.text(localStorage.getItem('ciudad_elegida') || (default_text(idioma))[0]);
    mes_elegido.text(localStorage.getItem('mes_elegido') || (default_text(idioma))[1]);
    // Si no hay ningun valor por defecto, cambio el idioma
    if (mes_elegido.text() !== (default_text(idioma))[1]) {
        let numeroMes = obtenerNumeroMes(mes_elegido.text(), idioma);
        let fechaMes = new Date(numeroMes + " 1, 2023"); // Con esto generamos dias siguientes segun el mes
        generarDivsProximosDias(fechaMes);
    }
    dia_elegido.text(localStorage.getItem('dia_elegido') || (default_text(idioma))[2]);
    hora_elegida.text(localStorage.getItem('hora_elegida') || (default_text(idioma))[3]);
    personas_elegidas.text(localStorage.getItem('personas_elegidas') || (default_text(idioma))[4]);
    /* Manejador de clicks en las funciones de subir o bajar displays de los campos de reserva, mediante las funciones
       asociadas fuera del DOM*/
    $(".ciudad_icon").each(function() {
        $(this).click(function() {
            if (isCiudadBajado) {
                subir_ciudades();
            } else {
                bajar_ciudades();
            }
        });
    });
    $(".mes_icon").each(function() {
        $(this).click(function() {
            if (isMesBajado) {
                subir_meses();
            } else {
                bajar_meses();
            }
        });
    });

    $(".dia_icon").each(function() {
        $(this).click(function() {
            if (isDiasBajado) {
                subir_dias();
            } else {
                bajar_dias();
            }
        });
    });

    $(".hora_icon").each(function() {
        $(this).click(function() {
            if (isHorasBajado) {
                subir_horas();
            } else {
                bajar_horas();
            }
        });
    })

    $(".personas_icon").each(function() {
        $(this).click(function() {
            if (isPersonasBajado) {
                subir_personas();
            } else {
                bajar_personas();
            }
        });
    })

    /* Funciones de manejo asociadas a la seleccion de uno de los valores posibles de los desplegables al reservar*/
    $(".ciudades_dropdown").each(function () {
        /* Funcion para seleccionar ciudad */
        $(this).click(function () {
            let city = $(this).text();
            ciudad_elegida.text(city); // Establecemos nuevo valor textual en html
            localStorage.setItem('ciudad_elegida', city); // Guardar en localStorage para guardar la sesion si no se ha reservado
            subir_ciudades();
        })
    })
    //
    if (mes_elegido.text() === ("Elige el mes") || mes_elegido.text() === ("Pick the month"))  {
        $("#num_dias_down").css("pointer-events", "none").addClass("not-allowed");
    }

    $(".meses_dropdown").each(function () {
        /* Funcion para seleccionar mes */
        $(this).click(function () {
            let nombreMes = $(this).text();
            let numeroMes = obtenerNumeroMes(nombreMes, idioma);
            let fechaMes = new Date(numeroMes + " 1, 2023"); // Con esto generamos dias siguientes segun el mes
            mes_elegido.text(nombreMes);
            localStorage.setItem('mes_elegido', nombreMes);
            subir_meses();
            generarDivsProximosDias(fechaMes);
            $("#num_dias_down").css("pointer-events", "auto").removeClass("not-allowed");
        });
    })

    $("body").on("click", ".dias_dropdown", function () {
        /* Funcion para seleccionar dia */
        let dia = $(this).text();
        $("#dia_elegido").text(dia);
        localStorage.setItem('dia_elegido', dia);
        subir_dias();
    });

    $(".horas_dropdown").each(function () {
        /* Funcion para seleccionar hora */
        $(this).click(function () {
            let hora = $(this).text();
            hora_elegida.text(hora);
            localStorage.setItem('hora_elegida', hora);
            subir_horas();
        })
    })

    $(".personas_dropdown").each(function () {
        /* Funcion para seleccionar personas */
        $(this).click(function () {
            let num_personas = $(this).text();
            personas_elegidas.text(num_personas);
            localStorage.setItem('personas_elegidas', num_personas); // Guardar en localStorage
            subir_personas();
        })
    })

    /* Funcion de manejo para poder eniar el submit al terminar la reserva */
    $("#formulario").submit(function(e){
        e.preventDefault();
    })
    submit.click(function(){
        // Se tiene que asegurar que se ha elegido correctamente un valor (no hay nada por defecto)
        if (ciudad_elegida.text() !== (default_text(idioma))[0]  && mes_elegido.text() !== (default_text(idioma))[1] &&
            dia_elegido.text !== (default_text(idioma))[2] && hora_elegida.text() !== (default_text(idioma))[3] &&
            personas_elegidas.text() !== (default_text(idioma))[4])
            {
            // Si el usuario no esta registrado, tiene que registrarse previamente mediante una redireccion
            if (!(nombreRegistrado && telefonoRegistrado && emailRegistrado && direccionRegistrada)) {
                alert("Ooops, parece que antes hay que registrarse para poder hacer reservas!");
                // Ademas, se incluye una fuente especial para poder manejar este evento en especifico
                window.location.href = 'registro.html?source=pagina_reserva';
            }
            else{
                // Eliminar datos del localStorage al hacer clic en submit ya que no se usaran para futuras reservas
                localStorage.removeItem('ciudad_elegida');
                localStorage.removeItem('hora_elegida');
                localStorage.removeItem('personas_elegidas');
                localStorage.removeItem('mes_elegido');
                localStorage.removeItem('dia_elegido');
                // Generacion de la pantalla que mestra que la reserva ha sido efectuada con exito
                $("#formulario").fadeOut(500, function(){
                    $("#mensaje_reserva").text(`Mesa reservada el próximo ${dia_elegido.text()} de ${mes_elegido.text()} a las ${hora_elegida.text()}.`)
                    $("#reserva_exito").fadeIn(500);
                    if (idioma === "en") $("#boton_exito").text('Go back to homepage');
                });
            }
        }
    })
});

 /* Funcion que genera los 6 proximos meses de la fecha actual en el div correspondiente de meses_dropdown */
function generarDivsProximosMeses(idioma) {
    let currentDate = new Date();
    // Funcion alternativa a la anteriormente definida para obtener el nombre del mes a partir del número del mes
    function obtenerNombreMes(numeroMes, idioma) {
        let meses;
        if (idioma === "en"){
            meses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        }
        else meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return meses[numeroMes];
    }
    // Generar divs para los proximos 6 meses desde el actual
    for (let i = 0; i < 6; i++) {
        let nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + i);
        $(".meses_dropdown").eq(i).text(obtenerNombreMes(nextMonth.getMonth(), idioma));
    }
}

/* Funciones que genera los dias restantes (si el mes coincide con el actual del sistema) o todos los de un mes dado*/
function generarDivsProximosDias(fecha) {
    let diasContainer = $(".contenido_dias");
    // Funcion para obtener el ultimo dia de un mes dado
    function obtenerUltimoDiaMes(fecha) {
        return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
    }
    // Limpiar contenido actual del contenedor al iniciarlo
    diasContainer.empty();
    // Obtener la fecha actual y determinar si es la actual
    let currentDate = new Date();
    let esFechaActual = fecha.getFullYear() === currentDate.getFullYear() && fecha.getMonth() === currentDate.getMonth();
    // Obtenemos el ultimo dia del mes actual o cualquiera de los otros
    let limite = esFechaActual ? obtenerUltimoDiaMes(currentDate) : obtenerUltimoDiaMes(fecha);
    let inicio;
    // Iniciamos si es la fecha actual en ese dia + 1; si no, el primer dia de cada mes
    if (esFechaActual) inicio = currentDate.getDate() + 1
    else inicio = 1
    for (let i = inicio; i <= limite; i++) {
        let diaDiv = $("<div>")
            .addClass("campos_reserva dias_dropdown")
            .text(i)
            .css({ // Asignacion de mismas propiedades CSS que los demas dropdown
                display: "none",
                margin: 0,
                cursor: "pointer"
            })
            .hover( // Manejacion al crear el css del hover
                function () {
                    $(this).css("opacity", 0.5);
                },
                function () {
                    $(this).css("opacity", 1);
                }
            );
        // Agregar el div al contenedor
        diasContainer.append(diaDiv);
    }
}

/* Funcion para obtener el indice de mes que usaremos para calcular los 6 proximos meses que se van a displayear*/
function obtenerNumeroMes(nombreMes, idioma) {
    let meses;
    if (idioma === "en"){
        meses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
    else meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses.indexOf(nombreMes) + 1;
}


// Para las funciones de subir y bajar displays de los datos, vamos a empezar señalando que originalmente esta subido
let isCiudadBajado = false;
let isMesBajado = false;
let isDiasBajado = false;
let isHorasBajado = false;
let isPersonasBajado = false;

/* Funciones de bajar y subir displays de las opciones a elegir en la reserva.
   Para ello, usamos animaciones de rotacion durante 0.5s en los icones de subir/bajar para posteriormente
   mostrar los datos u ocultarlos */
function bajar_ciudades() {
    $(".ciudad_icon").animate({
        deg: 180
    }, {
        step: function(now) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500,
        complete: function() {
            $(".ciudades_dropdown").show();
            isCiudadBajado = true;
        }
    });
}

function bajar_meses() {
    $(".mes_icon").animate({
        deg: 180
    }, {
        step: function(now) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500,
        complete: function() {
            $(".meses_dropdown").show();
            isMesBajado = true;
        }
    });
}

function bajar_horas() {
    $(".hora_icon").animate({
        deg: 180
    }, {
        step: function(now) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500,
        complete: function() {
            $(".horas_dropdown").show();
            isHorasBajado = true;
        }
    });
}

function bajar_dias() {
    $(".dia_icon").animate({
        deg: 180
    }, {
        step: function(now) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500,
        complete: function() {
            $(".dias_dropdown").show();
            isDiasBajado = true;
        }
    });
}

function bajar_personas() {
    $(".personas_icon").animate({
        deg: 180
    }, {
        step: function(now) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500,
        complete: function() {
            $(".personas_dropdown").show();
            isPersonasBajado = true;
        }
    });
}

function subir_ciudades() {
    $(".ciudad_icon").animate({
        deg: 0
    }, {
        step: function(now) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500,
        complete: function() {
            $(".ciudades_dropdown").hide();
            isCiudadBajado = false;
        }
    });
}

/* Funciones para bajar los desplegables de reserva mediante animaciones para las flechas de direccion */
function subir_meses() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 180 grados de la posicion actual
    $(".mes_icon").animate({
        deg: 0
    }, {
        step: function(now) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500,
        complete: function() {
            $(".meses_dropdown").hide();
            isMesBajado = false;
        }
    });
}

function subir_dias() {
    $(".dia_icon").animate({
        deg: 0
    }, {
        step: function(now) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500,
        complete: function() {
            $(".dias_dropdown").hide();

            isDiasBajado = false;
        }
    });
}

function subir_horas() {
    $(".hora_icon").animate({
        deg: 0
    }, {
        step: function(now) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500,
        complete: function() {
            $(".horas_dropdown").hide();
            isHorasBajado = false;
        }
    });
}

function subir_personas() {
    $(".personas_icon").animate({
        deg: 0
    }, {
        step: function(now) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500,
        complete: function() {
            $(".personas_dropdown").hide();
            isPersonasBajado = false;
        }
    });
}

function default_text(idioma){
    let textos;
    if (idioma === "en") {
        textos = ["Pick your preferred city", "Pick the month", "Pick the day", "Pick the time", "Pick the number of people"];
    }
    else textos = ["Elige la ciudad correspondiente", "Elige el mes", "Elige el día", "Elige la hora", "Elige el número de personas"];
    return textos;
}
