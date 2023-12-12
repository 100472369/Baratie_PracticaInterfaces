$(document).ready(function (){
    let ciudad_elegida = $("#ciudad_elegida");
    let fecha_elegida = $("#fecha_elegida");
    let hora_elegida = $("#hora_elegida");
    let personas_elegidas = $("#personas_elegidas");
    const submit = $("#submit");
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
    // funcion para cargar dropdowns
    $(".dropdown_icon_down").each(function(){
        $(this).click(function(){
        let id = $(this)[0].id;
        if (id === "ciudad_down"){
            bajar_ciudades();
        }
        if (id === "fecha_down"){
            bajar_fechas();
        }
        if (id === "hora_down"){
            bajar_horas()
        }
        if (id === "num_personas_down"){
            bajar_personas()
        }
        })  
    })
    // funcion para quitar dropdowns
    $(".dropdown_icon_up").each(function(){
        $(this).click(function(){
        let id = $(this)[0].id;
        if (id === "ciudad_up"){
            subir_ciudades();
        }
        if (id === "fecha_up"){
            subir_fechas();
        }
        if (id === "hora_up"){
            subir_horas();
        }
        if (id === "num_personas_up"){
            subir_personas();
        }
        })  
    })

    // funcion para seleccionar ciudad
    $(".ciudades_dropdown").each(function(){
        $(this).click(function(){
            let city = $(this).text();
            ciudad_elegida.text(city);
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
    // funcion para seleccionar hora
    $(".horas_dropdown").each(function(){
        $(this).click(function(){
            let hora = $(this).text();
            hora_elegida.text(hora); 
            subir_horas();
        })
        
    })
    // funcion para seleccionar persoans
    $(".personas_dropdown").each(function(){
        $(this).click(function(){
            let num_personas = $(this).text();
            personas_elegidas.text(num_personas); 
            subir_personas();
        })
        
    })
    // mandar reservar
    $("#formulario").submit(function(e){
        e.preventDefault();
    })
    submit.click(function(){
        if (ciudad_elegida.text() !== ""  && hora_elegida.text() !== "" && personas_elegidas.text() !== ""){
            console.log("AQUI 1");
            $("#formulario").fadeOut(500, function(){
                $("#mensaje_reserva").text(`Mesa reservada el ${fecha_elegida.text()} a las ${hora_elegida.text()}.`)
                $("#reserva_exito").fadeIn(500);
            });
        }
    })
    
});


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
function bajar_ciudades(){
    $("#ciudad_down").hide();
    $("#ciudad_up").show();
    $(".ciudades_dropdown").show();
}
function bajar_fechas(){
    $("#fecha_down").hide();
    $("#fecha_up").show();
    $("#calendar").show();
}
function bajar_horas(){
    $("#hora_down").hide();
    $("#hora_up").show();
    $(".horas_dropdown").show();
}
function bajar_personas(){
    $("#num_personas_down").hide();
    $("#num_personas_up").show();
    $(".personas_dropdown").show();
}
// funciones para quitar elementos del dropdown
function subir_ciudades(){
    $("#ciudad_down").show();
    $("#ciudad_up").hide();
    $(".ciudades_dropdown").hide();
}
function subir_fechas(){
    $("#fecha_down").show();
    $("#fecha_up").hide();
    $("#calendar").hide();
}
function subir_horas(){
    $("#hora_down").show();
    $("#hora_up").hide();
    $(".horas_dropdown").hide();
}
function subir_personas(){
    $("#num_personas_down").show();
    $("#num_personas_up").hide();
    $(".personas_dropdown").hide();
}
