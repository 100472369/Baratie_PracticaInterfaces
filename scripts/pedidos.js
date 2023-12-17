// script con la funcionalidad de los pedidos
$(document).ready(function () {
    let idioma = $('html').attr('lang');
    const platos = $(".plato");
    const addButtons = $(".add");
    const removeButtons = $(".remove");
    const botonModificarCompra = $("#Boton_modificar_pedido");
    const botonFinalizarCompra = $("#Boton_finalizar_pedido");
    const contadorCarrito = $("#contador_carrito");
    const totalArticulosResumen = $("#total_articulos_resumen");
    const nombreArticuloElement = $("#nombre_articulo");
    const precioArticuloElement = $("#precio_articulo");
    const precioTotalElement = $("#precio_total");
    const pagina_carrito = $("#Pagina_carrito");
    const pagina_pedido_realizado = $("#Pagina_pedido_realizado");
    // Cargamos los contadores desde el storage si existen, o establecemos por defecto sus valores
    let contadores = obtenerContadoresDesdeStorage() || {};
    // Fases 2 y 3 (resumen, finalizacion) ocultas
    pagina_carrito.hide();
    pagina_pedido_realizado.hide();
    // Mostrar resumen en caso de presionar el carrito
    $(".boton-carrito, #carrito-header").click(function(){
        mostrarCarrito();
    })
    // Mostrar de nuevo la pagina 1 de la carta al presionar en el boton correspondiente
    botonModificarCompra.click(function(){
        mostrarCarta();
    })
    /* Manejo de eventos al finalizar la compra */
    botonFinalizarCompra.click(function() {
        // Verificar si hay datos en el localStorage antes de mostrar la finalización
        if (hayDatosEnLocalStorage()) {
            // Mostrar aviso para para confirmar el pedido
            let confirmado;
            if (idioma === "en") confirmado = confirm("Do you want to confirm your order ('Accept' in order to confirm; otherwise 'cancel')");
            else confirmado = confirm("¿Desea confirmar su pedido? ('Aceptar' para confirmar, 'cancelar' para volver)");
            if (confirmado) {
            mostrarFinalizacion();
            // Borrar los datos del localStorage
            limpiarLocalStorage();
            }
        } else {
            // Mostrar un mensaje de alerta si no hay datos en el carrito
            if (idioma === "en") alert("Ooops! Looks like you've tried to confirm your order... without order anything YOHOHOHOHO")
            else alert("Ooops! Parece que has intentado finalizar la compra... pero no tienes nada YOHOHOHOHO")
        }
    });
    /* Funciones que manejan la cuenta del carrito para cada plato (con su indice individual asociado) */
    platos.each(function (index, plato) {
        const removeButton = removeButtons.eq(index);
        const addButton = addButtons.eq(index);
        const contadorElement = $(plato).find(".contador");
        // Asignamos un indice a cada uno de los platos dentro de sus contenedores
        if (!contadores.hasOwnProperty(index)) {
            contadores[index] = 0;
            guardarContadorEnStorage(index, 0);
        } else {
            contadorElement.text(contadores[index]); // Restaurar el valor del contador en la interfaz
        }
        // Desactivar boton de quitar en caso de estar la cuenta a 0
        if (contadores[index] <= 0) {
            removeButton.prop("disabled", true);
        } else {
            removeButton.prop("disabled", false);
        }
        // Aumentamos la cuenta del plato al seleccionar, procuramos tener siempre deshabilitado el boton de quitar,
        // se actualiza el plato en el carrito y se guardan sus datos en WebStorage
        addButton.click(function () {
            contadores[index]++;
            contadorElement.text(contadores[index]);
            removeButton.prop("disabled", false);
            actualizarCarrito();
            guardarContadorEnStorage(index, contadores[index]);
        });
        // Misma logica al quitar, con la excepcion de desactivar nuevamente el boton si la cuena esta a 0
        removeButton.click(function () {
            contadores[index]--;
            contadorElement.text(contadores[index]);
            if (contadores[index] <= 0) {
                removeButton.prop("disabled", true);
            }
            actualizarCarrito();
            guardarContadorEnStorage(index, contadores[index]);
        });
        // Actualizar el carrito al inicio
        actualizarCarrito();
    });
    function actualizarCarrito() {
        // Limpiar contenido
        nombreArticuloElement.empty();
        precioArticuloElement.empty();
        // Inicio de cuentas a 0
        let totalProductos = 0;
        let precioTotal = 0;
        // Filtrar solo los platos que tienen cantidad mayor a 0 en el carrito para mostrar
        const platosSeleccionados = Object.keys(contadores).filter(index => contadores[index] > 0);
        // Seleccion de platos de carrito para mostrar por pantalla en la ventana de resumen
        platosSeleccionados.forEach(index => {
            totalProductos += contadores[index];
            const nombrePlato = platos.eq(index).find(".nombre_plato").text();
            const cantidadSeleccionada = contadores[index];
            const precioIndividual = parseFloat(platos.eq(index).find(".precio").text());
            const textoNombre = `${nombrePlato}`;
            const textoPrecio = `${precioIndividual.toFixed(2)}€ x ${cantidadSeleccionada}`;
            // Actualizar el cuerpo de id="nombre_articulo" y id="precio_articulo"
            const elementoNombre = $("<p>").text(textoNombre);
            const elementoPrecio = $("<p>").text(textoPrecio);
            // Agregamos a los arrays el nombre y precio
            nombreArticuloElement.append(elementoNombre);
            precioArticuloElement.append(elementoPrecio);
            // Establecimiento de precio total para mostrarlo tambien
            precioTotal += contadores[index] * precioIndividual;
        });
        // Actualizar el resumen
        if (totalProductos >= 0) {
            // Actualizar el resumen
            totalArticulosResumen.text(`Total de productos: ${totalProductos}`);
            precioTotalElement.text(`${precioTotal.toFixed(2)} €`);
        } else {
            // Si no hay productos seleccionados, limpiar el resumen
            totalArticulosResumen.empty();
            nombreArticuloElement.empty();
            precioTotalElement.empty();
        }
        // Actualizar el contador en el header del carrito
        contadorCarrito.text(totalProductos);
    }
    function guardarContadorEnStorage(index, valor) {
        /* Funcion que guarda en el local storage los valores de los contadores en su indice correspondiente */
        localStorage.setItem(`contador_${index}`, valor);
    }

    function hayDatosEnLocalStorage() {
        /* Funcion que verifica si hay al menos un contador diferente de cero en el localStorage */
        return Object.keys(localStorage).some(key => key.startsWith('contador_') && parseInt(localStorage.getItem(key)) !== 0);
    }

    function limpiarLocalStorage() {
        /* Funcion que limpia el WebStorage */
        try {
            const claves = Object.keys(localStorage);
            // Filtrar solo las claves relacionadas con el carrito
            const clavesCarrito = claves.filter(key => key.startsWith('contador_'));
            // Borrar cada clave relacionada con el carrito
            clavesCarrito.forEach(key => {
                localStorage.removeItem(key);
            });
        } catch (error) {
            // Depuracion para posible error
            console.error("Error al intentar borrar claves:", error);
        }
    }


    function obtenerContadoresDesdeStorage() {
        // Funcion que obtiene los contadores dentro del storage para cada plato y podamos verificar si estan a 0
        let contadoresStorage = {};
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('contador_')) {
                const index = key.replace('contador_', '');
                contadoresStorage[index] = parseInt(localStorage.getItem(key));
            }
        });
        return contadoresStorage;
    }

    /* Funciones de manejo de animaciones para mostrar y ocultar los diferentes contenedores de la pagina de pedidos
       a medida que avanzamos en las fases de la compra */

    function mostrarCarrito() {
        $("#Pagina_carta").fadeOut(350, function() {
            pagina_carrito.fadeIn(350);
        });
        pagina_pedido_realizado.hide();
    }
    function mostrarCarta() {
        pagina_carrito.fadeOut(350, function() {
            $("#Pagina_carta").fadeIn(350);
        });
        pagina_pedido_realizado.hide();
    }
    function mostrarFinalizacion(){
        $("#Pagina_carta").hide()
        pagina_carrito.fadeOut(500, function() {
            $("#contador_carrito").fadeOut(100);
            $("#logo_carrito_header").fadeOut(100);
            pagina_pedido_realizado.fadeIn(500);
        });
    }
});
