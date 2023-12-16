$(document).ready(function () {
    let idioma = $('html').attr('lang');
    const nombreRegistrado = localStorage.getItem('nombre');
    const telefonoRegistrado = localStorage.getItem('telefono');
    const emailRegistrado = localStorage.getItem('email');
    const direccionRegistrada = localStorage.getItem('direccion');
    let toCompra = $("#to_pedido");
    let botonPedido = $("#boton_hacer_pedido");
    // Si venimos desde el menu de compra y aun no disponemos de cookies, vamos a redirigir a la pagina de registro
    toCompra.click(function() {
        if (!(nombreRegistrado && telefonoRegistrado && emailRegistrado && direccionRegistrada)) {
            // Ademas, se incluye una fuente especial para poder manejar este evento en especifico
            if (idioma === "es") toCompra.attr('href','registro.html?source=pagina_pedido');
            else toCompra.attr('href','registro_eng.html?source=pagina_pedido');
        }
    });
    botonPedido.click(function() {
        if (!(nombreRegistrado && telefonoRegistrado && emailRegistrado && direccionRegistrada)) {
            if (idioma === "es") botonPedido.attr('href','registro.html?source=pagina_pedido');
            else botonPedido.attr('href','registro_eng.html?source=pagina_pedido');
        }
    });
});