$(document).ready(function () {
    const nombreRegistrado = localStorage.getItem('nombre');
    const telefonoRegistrado = localStorage.getItem('telefono');
    const emailRegistrado = localStorage.getItem('email');
    const direccionRegistrada = localStorage.getItem('direccion');
    let linkToCompra = $("#to_pedido");
    if (!nombreRegistrado && !telefonoRegistrado && !emailRegistrado && !direccionRegistrada) {
        linkToCompra.attr('href','registro.html')
    }
    else {
        linkToCompra.attr('href', 'pedido.html')
    }
});