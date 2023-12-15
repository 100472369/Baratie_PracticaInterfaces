// let date = new Date();
// // funcion para renderizar el calendario
// function renderCalendar() {
//     date.setDate(1);
//
//     const monthDays = document.getElementById('calendar-body');
//     const month = document.getElementById('month');
//     const lastDay = new Date(
//         date.getFullYear(),
//         date.getMonth() + 1,
//         0
//     ).getDate();
//
//     const prevLastDay = new Date(
//         date.getFullYear(),
//         date.getMonth(),
//         0
//     ).getDate();
//
//     const firstDayIndex = date.getDay();
//
//     const lastDayIndex = new Date(
//         date.getFullYear(),
//         date.getMonth() + 1,
//         0
//     ).getDay();
//
//     const nextDays = 7 - lastDayIndex - 1;
//
//     const months = [
//         'enero',
//         'ferbero',
//         'marzo',
//         'abril',
//         'mayo',
//         'junio',
//         'julio',
//         'agosto',
//         'septiembre',
//         'octubre',
//         'noviembre',
//         'diciembre'
//     ];
//
//     month.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;
//     let days = `<div>L</div>
//     <div>Ma</div>
//     <div>Mi</div>
//     <div>J</div>
//     <div>V</div>
//     <div>S</div>
//     <div>D</div>`;
//
//     for (let x = firstDayIndex; x > 0; x--) {
//         days += `<div class='prev-date'>${prevLastDay - x + 1}</div>`;
//     }
//
//     for (let i = 1; i <= lastDay; i++) {
//         if (
//             i === new Date().getDate() &&
//             date.getMonth() === new Date().getMonth()
//         ) {
//             days += `<div class='today days' id='day_${i}' >${i}</div>`;
//         } else {
//             days += `<div class='days' id='day_${i}'>${i}</div>`;
//         }
//     }
//
//     for (let j = 1; j <= nextDays; j++) {
//         days += `<div class='next-date'>${j}</div>`;
//         monthDays.innerHTML = days;
//     }
// }
//
// // Crear el div del mes con estilos
// // let mesDiv = $("<div>")
// //     .addClass("campos_reserva meses_dropdown")
// //     .text(obtenerNombreMes(nextMonth.getMonth()))
// //     .css({
// //         display: "none", // Establecer propiedad display: none
// //         margin: 0         // Establecer propiedad margin: 0
// //     });
//
// // Agregar el div al contenedor
// // mesesContainer.append(mesDiv);
//
// function bajar_fechas(){
//     $("#fecha_down").hide();
//     $("#fecha_up").show();
//     $("#calendar").show();
// }
//
// // funcion para ir al mes siguiente
// $('#month-next').click(function(){
//     document.getElementById('calendar-body').classList.add('fade-out');
//     setTimeout(() => {
//         date.setMonth(date.getMonth() + 1);
//         renderCalendar();
//         document.getElementById('calendar-body').classList.remove('fade-out');
//     }, 500);
// });
//
// // cargar calendario
// renderCalendar();
//
// // funcion para ir al mes anterior
// $('#month-prev').click(function(){
//     document.getElementById('calendar-body').classList.add('fade-out');
//     setTimeout(() => {
//         date.setMonth(date.getMonth() - 1);
//         renderCalendar();
//         document.getElementById('calendar-body').classList.remove('fade-out');
//     }, 500);
// });
//
// // funcion para seleccionar un dia
// $('.days').each(function(){
//     $(this).click(function(){
//         let date = $(this).text() + ' ' + $("#month").text();
//         fecha_elegida.text(date);
//         subir_fechas();
//     })
//
// })