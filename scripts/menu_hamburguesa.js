$(document).ready(function() {
    let idioma = $('html').attr('lang');
    const toCompra = $("#pedidos_desde_hamburguesa");
    const nombreRegistrado = localStorage.getItem('nombre');
    const telefonoRegistrado = localStorage.getItem('telefono');
    const emailRegistrado = localStorage.getItem('email');
    const direccionRegistrada = localStorage.getItem('direccion');
    toCompra.click(function() {
        // Si venimos desde el menu de compra y aun no disponemos de cookies, vamos a redirigir a la pagina de registro
        if (!(nombreRegistrado && telefonoRegistrado && emailRegistrado && direccionRegistrada)) {
            if (idioma === "es") toCompra.attr('href','registro.html?source=pagina_pedido');
            else toCompra.attr('href','registro_eng.html?source=pagina_pedido');
        }
    });
});
function myFunction() {
    let x = $("#myLinks");
    let logo = $("#logo_topnav");
    logo.slideUp();
    x.slideDown();

}

function showStripres(){
    let x = $("#myLinks");
    let logo = $("#logo_topnav");
    logo.slideDown();
    x.slideUp();
}

