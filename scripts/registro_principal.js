$(document).ready(function () {
    const nombreRegistrado = localStorage.getItem('nombre');
    const telefonoRegistrado = localStorage.getItem('telefono');
    const emailRegistrado = localStorage.getItem('email');
    const direccionRegistrada = localStorage.getItem('direccion');
    let toCompra = $("#to_pedido");
    // Si venimos desde el menu de compra y aun no disponemos de cookies, vamos a redirigar a la pagina de registro
    toCompra.click(function() {
        if (!(nombreRegistrado && telefonoRegistrado && emailRegistrado && direccionRegistrada)) {
            // Ademas, se incluye una fuente especial para poder manejar este evento en especifico
            toCompra.attr('href','registro.html?source=pagina1');
        }
    });

});