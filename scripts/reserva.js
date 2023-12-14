$(document).ready(function (){
    generarDivsProximosMeses();
    // generarDivsProximosDias();
    let ciudad_elegida = $("#ciudad_elegida");
    let fecha_elegida = $("#fecha_elegida");
    let hora_elegida = $("#hora_elegida");
    let personas_elegidas = $("#personas_elegidas");
    let mes_elegido = $("#mes_elegido");
    let dia_elegido = $("#dia_elegido");
    const submit = $("#submit");
    const nombreRegistrado = localStorage.getItem('nombre');
    const telefonoRegistrado = localStorage.getItem('telefono');
    const emailRegistrado = localStorage.getItem('email');
    const direccionRegistrada = localStorage.getItem('direccion');

    ciudad_elegida.text(localStorage.getItem('ciudad_elegida') || "Elige la ciudad correspondiente");
    hora_elegida.text(localStorage.getItem('hora_elegida') || "Elige la hora");
    dia_elegido.text(localStorage.getItem('dia_elegido') || "Elige el día");
    mes_elegido.text(localStorage.getItem('mes_elegido') || "Elige el mes");
    personas_elegidas.text(localStorage.getItem('personas_elegidas') || "Elige el número de personas");


    // cargar calendario
    renderCalendar();
    // funcion para ir al mes anterior
    $('#month-prev').click(function(){
        document.getElementById('calendar-body').classList.add('fade-out');
        setTimeout(() => {
            date.setMonth(date.getMonth() - 1);
            renderCalendar();
            document.getElementById('calendar-body').classList.remove('fade-out');
        }, 500);
    });
    // funcion para ir al mes siguiente
    $('#month-next').click(function(){
        document.getElementById('calendar-body').classList.add('fade-out');
        setTimeout(() => {
            date.setMonth(date.getMonth() + 1);
            renderCalendar();
            document.getElementById('calendar-body').classList.remove('fade-out');
        }, 500);
    });
    $(".ciudad_icon").each(function() {
        $(this).click(function() {
            console.log(isCiudadBajado);
            if (isCiudadBajado) {
                console.log("He de subir")
                subir_ciudades();
            } else {
                bajar_ciudades();
            }
        });
    });
    $(".mes_icon").each(function() {
        $(this).click(function() {
            console.log(isMesBajado);
            if (isMesBajado) {
                console.log("He de subir")
                subir_meses();
            } else {
                bajar_meses();
            }
        });
    });
    $(".dia_icon").each(function() {
        $(this).click(function() {
            console.log(isDiasBajado);
            if (isDiasBajado) {
                console.log("He de subir")
                subir_dias();
            } else {
                bajar_dias();
            }
        });
    });

    // funcion para seleccionar ciudad
    $(".hora_icon").each(function() {
        $(this).click(function() {
            console.log(isHorasBajado);
            if (isHorasBajado) {
                console.log("He de subir")
                subir_horas();
            } else {
                bajar_horas();
            }
        });
    })

    $(".personas_icon").each(function() {
        $(this).click(function() {
            console.log(isPersonasBajado);
            if (isPersonasBajado) {
                console.log("He de subir")
                subir_personas();
            } else {
                bajar_personas();
            }
        });
    })

    $(".ciudades_dropdown").each(function () {
        $(this).click(function () {
            let city = $(this).text();
            ciudad_elegida.text(city);
            localStorage.setItem('ciudad_elegida', city); // Guardar en localStorage
            subir_ciudades();
        })
    })

    // funcion para seleccionar un dia
    $('.days').each(function(){
        $(this).click(function(){
            let date = $(this).text() + ' ' + $("#month").text();
            fecha_elegida.text(date);
            subir_fechas();
        })
        
    })
    if ($("#mes_elegido").text() === "Elige el mes") {
        console.log("Nao nao");
        $("#num_dias_down").css("pointer-events", "none").addClass("not-allowed");
    }
    $(".meses_dropdown").each(function () {
        $(this).click(function () {
            let nombreMes = $(this).text();
            let numeroMes = obtenerNumeroMes(nombreMes);
            let fechaMes = new Date(numeroMes + " 1, 2023"); // Puedes ajustar el año según tu necesidad
            $("#mes_elegido").text(nombreMes);
            localStorage.setItem('mes_elegido', nombreMes); // Guardar en localStorage
            subir_meses();
            generarDivsProximosDias(fechaMes);
            $("#num_dias_down").css("pointer-events", "auto").removeClass("not-allowed");
        });
    })
    $("body").on("click", ".dias_dropdown", function () {
        let dia = $(this).text();
        console.log(dia);
        $("#dia_elegido").text(dia);
        localStorage.setItem('dia_elegido', dia); // Guardar en localStorage
        subir_dias();
    });
    // funcion para seleccionar hora
    $(".horas_dropdown").each(function () {
        $(this).click(function () {
            let hora = $(this).text();
            hora_elegida.text(hora);
            localStorage.setItem('hora_elegida', hora); // Guardar en localStorage
            subir_horas();
        })
    })
    // funcion para seleccionar persoans
    $(".personas_dropdown").each(function () {
        $(this).click(function () {
            let num_personas = $(this).text();
            personas_elegidas.text(num_personas);
            localStorage.setItem('personas_elegidas', num_personas); // Guardar en localStorage
            subir_personas();
        })
    })
    // mandar reservar
    $("#formulario").submit(function(e){
        e.preventDefault();
    })
    submit.click(function(){
        // P
        if (ciudad_elegida.text() !== "Elige la ciudad correspondiente"  && hora_elegida.text() !== "Elige la hora" &&
            personas_elegidas.text() !== "Elige el número de personas" && mes_elegido.text() !== "Elige el mes" &&
            $("#dia_elegido").text !== "Elige el día"){
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
                $("#formulario").fadeOut(500, function(){
                    $("#mensaje_reserva").text(`Mesa reservada el próximo ${dia_elegido.text()} de ${mes_elegido.text()} a las ${hora_elegida.text()}.`)
                    $("#reserva_exito").fadeIn(500);
                });
            }
        }
    })

});

// Función para habilitar la elección de día cuando hay un mes seleccionado
$("#num_meses_down, #num_meses_up, .meses_dropdown").click(function () {
    $("#num_dias_down, #num_dias_up, .dias_dropdown").prop("disabled", false);
});

function generarDivsProximosMeses() {
    // Obtener la fecha actual
    let currentDate = new Date();

    // Contenedor de meses
    // let mesesContainer = $(".contenido_meses");

    // Función para obtener el nombre del mes a partir del número del mes
    function obtenerNombreMes(numeroMes) {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return meses[numeroMes];
    }

    // Limpiar contenido actual del contenedor
    // mesesContainer.empty();

    // Generar divs para los próximos 6 meses
    for (let i = 0; i < 6; i++) {
        let nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + i);
        $(".meses_dropdown").eq(i).text(obtenerNombreMes(nextMonth.getMonth()));

        // Crear el div del mes con estilos
        // let mesDiv = $("<div>")
        //     .addClass("campos_reserva meses_dropdown")
        //     .text(obtenerNombreMes(nextMonth.getMonth()))
        //     .css({
        //         display: "none", // Establecer propiedad display: none
        //         margin: 0         // Establecer propiedad margin: 0
        //     });

        // Agregar el div al contenedor
        // mesesContainer.append(mesDiv);
    }
}

function generarDivsProximosDias(fecha) {
    // Contenedor de días
    let diasContainer = $(".contenido_dias");
    function obtenerUltimoDiaMes(fecha) {
        return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
    }

    // Limpiar contenido actual del contenedor
    diasContainer.empty();

    // Obtener la fecha actual
    let currentDate = new Date();
    // Determinar si la fecha es la actual
    let esFechaActual = fecha.getFullYear() === currentDate.getFullYear() && fecha.getMonth() === currentDate.getMonth();
    console.log(esFechaActual);
    console.log(currentDate.getDate());
    // Generar divs para los próximos días del mes actual o del mes proporcionado
    let limite = esFechaActual ? obtenerUltimoDiaMes(currentDate) : obtenerUltimoDiaMes(fecha);
    let inicio;
    if (esFechaActual) {inicio = currentDate.getDate() + 1}
    else inicio = 1
    for (let i = inicio; i <= limite; i++) {
        // Resto 1 si no es la fecha actual, para evitar que se incluya el día actual nuevamente
        let diaDiv = $("<div>")
            .addClass("campos_reserva dias_dropdown")
            .text(i)
            .css({
                display: "none", // Establecer propiedad display: none
                margin: 0,         // Establecer propiedad margin: 0
                cursor: "pointer"
            })
            .hover(
                function () {
                    // Función que se ejecuta al pasar el ratón sobre el elemento
                    $(this).css("opacity", 0.5);
                },
                function () {
                    // Función que se ejecuta al salir el ratón del elemento
                    $(this).css("opacity", 1);
                }
            );

        // Agregar el div al contenedor
        diasContainer.append(diaDiv);
    }
}

function obtenerNumeroMes(nombreMes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses.indexOf(nombreMes) + 1;
}



let date = new Date();
// funcion para renderizar el calendario
function renderCalendar() {
    date.setDate(1);

    const monthDays = document.getElementById('calendar-body');
    const month = document.getElementById('month');
    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        'enero',
        'ferbero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
    ];
    
    month.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;
    let days = `<div>L</div>
    <div>Ma</div>
    <div>Mi</div>
    <div>J</div>
    <div>V</div>
    <div>S</div>
    <div>D</div>`;

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class='prev-date'>${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            days += `<div class='today days' id='day_${i}' >${i}</div>`;
        } else {
            days += `<div class='days' id='day_${i}'>${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class='next-date'>${j}</div>`;
        monthDays.innerHTML = days;
    }
}
// funciones para esconder elementos al hacer el dropdown
let isCiudadBajado = false;
let isMesBajado = false;
let isDiasBajado = false;
let isHorasBajado = false;
let isPersonasBajado = false;
function bajar_fechas(){
    $("#fecha_down").hide();
    $("#fecha_up").show();
    $("#calendar").show();
}

function bajar_ciudades() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 180 grados
    $(".ciudad_icon").animate({
        deg: 180
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500, // Puedes ajustar la duración de la animación según tus preferencias
        complete: function() {
            // Ocultar los elementos con clase "ciudades_dropdown"
            $(".ciudades_dropdown").show();

            // Actualizar el estado
            isCiudadBajado = true;
        }
    });
}

function bajar_meses() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 180 grados
    $(".mes_icon").animate({
        deg: 180
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500, // Puedes ajustar la duración de la animación según tus preferencias
        complete: function() {
            // Ocultar los elementos con clase "ciudades_dropdown"
            $(".meses_dropdown").show();

            // Actualizar el estado
            isMesBajado = true;
        }
    });
}
function bajar_horas() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 180 grados
    $(".hora_icon").animate({
        deg: 180
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500, // Puedes ajustar la duración de la animación según tus preferencias
        complete: function() {
            // Ocultar los elementos con clase "ciudades_dropdown"
            $(".horas_dropdown").show();

            // Actualizar el estado
            isHorasBajado = true;
        }
    });
}
function bajar_dias() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 180 grados
    $(".dia_icon").animate({
        deg: 180
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500, // Puedes ajustar la duración de la animación según tus preferencias
        complete: function() {
            // Ocultar los elementos con clase "ciudades_dropdown"
            $(".dias_dropdown").show();

            // Actualizar el estado
            isDiasBajado = true;
        }
    });
}
function bajar_personas() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 180 grados
    $(".personas_icon").animate({
        deg: 180
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500, // Puedes ajustar la duración de la animación según tus preferencias
        complete: function() {
            // Ocultar los elementos con clase "ciudades_dropdown"
            $(".personas_dropdown").show();

            // Actualizar el estado
            isPersonasBajado = true;
        }
    });
}
// funciones para quitar elementos del dropdown
function subir_ciudades() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 0 grados
    $(".ciudad_icon").animate({
        deg: 0
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500, // Puedes ajustar la duración de la animación según tus preferencias
        complete: function() {
            // Mostrar los elementos con clase "ciudades_dropdown"
            $(".ciudades_dropdown").hide();

            // Actualizar el estado
            isCiudadBajado = false;
        }
    });
}


function subir_fechas(){
    $("#fecha_down").show();
    $("#fecha_up").hide();
    $("#calendar").hide();
}
function subir_meses() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 0 grados
    $(".mes_icon").animate({
        deg: 0
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500, // Puedes ajustar la duración de la animación según tus preferencias
        complete: function() {
            // Mostrar los elementos con clase "ciudades_dropdown"
            $(".meses_dropdown").hide();

            // Actualizar el estado
            isMesBajado = false;
        }
    });
}
function subir_dias() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 0 grados
    $(".dia_icon").animate({
        deg: 0
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500, // Puedes ajustar la duración de la animación según tus preferencias
        complete: function() {
            // Mostrar los elementos con clase "ciudades_dropdown"
            $(".dias_dropdown").hide();

            // Actualizar el estado
            isDiasBajado = false;
        }
    });
}
function subir_horas() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 0 grados
    $(".hora_icon").animate({
        deg: 0
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500, // Puedes ajustar la duración de la animación según tus preferencias
        complete: function() {
            // Mostrar los elementos con clase "ciudades_dropdown"
            $(".horas_dropdown").hide();

            // Actualizar el estado
            isHorasBajado = false;
        }
    });
}
function subir_personas() {
    // Animar la rotación del elemento con clase "dropdown_icon_up" a 0 grados
    $(".personas_icon").animate({
        deg: 0
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 500, // Puedes ajustar la duración de la animación según tus preferencias
        complete: function() {
            // Mostrar los elementos con clase "ciudades_dropdown"
            $(".personas_dropdown").hide();

            // Actualizar el estado
            isPersonasBajado = false;
        }
    });
}
