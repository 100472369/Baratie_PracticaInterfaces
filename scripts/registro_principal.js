$(document).ready(function () {
    const nombreRegistrado = localStorage.getItem('nombre');
    const telefonoRegistrado = localStorage.getItem('telefono');
    const emailRegistrado = localStorage.getItem('email');
    const direccionRegistrada = localStorage.getItem('direccion');
    let linkToCompra = $("#to_pedido");
    let botonExito = $("#boton_exito");
    if (!nombreRegistrado && !telefonoRegistrado && !emailRegistrado && !direccionRegistrada) {
        linkToCompra.attr('href','registro.html');
        botonExito.text('Continuar con el pedido');
        botonExito.click(function () {
            // Puedes agregar acciones adicionales al hacer clic en el botón de éxito
            window.location.href = "pedido.html";
        });

    }
    /*
    else {
        linkToCompra.attr('href', 'pedido.html');
        botonExito.text('Volver a la página principal');
        botonExito.click(function () {
            // Puedes agregar acciones adicionales al hacer clic en el botón de éxito
            window.location.href = "index.html";
        });
    }*/
});