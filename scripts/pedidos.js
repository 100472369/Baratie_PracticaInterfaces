$(document).ready(function () {
    const platos = $(".plato");
    const addButtons = $(".add");
    const removeButtons = $(".remove");
    const botonpasarCarrito = $(".boton-carrito");
    const botonModificarCompra = $("#Boton_modificar_pedido");
    const botonFinalizarCompra = $("#Boton_finalizar_pedido");
    const contadorCarrito = $("#contador_carrito");
    const totalArticulosResumen = $("#total_articulos_resumen");
    const nombreArticuloElement = $("#nombre_articulo");
    const precioArticuloElement = $("#precio_articulo");
    const precioTotalElement = $("#precio_total");
    const pagina_carrito = $("#Pagina_carrito");
    const pagina_pedido_realizado = $("#Pagina_pedido_realizado");

    let contadores = obtenerContadoresDesdeStorage() || {};

    pagina_carrito.hide();
    pagina_pedido_realizado.hide();

    botonpasarCarrito.click(function(){
        mostrarCarrito();
    })

    botonModificarCompra.click(function(){
        mostrarCarta();
    })

    botonFinalizarCompra.click(function() {
        // Verificar si hay datos en el localStorage antes de mostrar la finalización
        if (hayDatosEnLocalStorage()) {
            mostrarFinalizacion();
            // Borrar los datos del localStorage
            limpiarLocalStorage();
        } else {
            // Mostrar un mensaje de alerta si no hay datos en el carrito
            alert("Ooops! Parece que has intentado finalizar la compra... pero no tienes nada YOHOHOHOHO")
        }
    });

    platos.each(function (index, plato) {
        const removeButton = removeButtons.eq(index);
        const addButton = addButtons.eq(index);
        const contadorElement = $(plato).find(".contador");

        if (!contadores.hasOwnProperty(index)) {
            contadores[index] = 0;
            guardarContadorEnStorage(index, 0); // Inicializar el contador en el almacenamiento local
        } else {
            contadorElement.text(contadores[index]); // Restaurar el valor del contador en la interfaz
        }

        if (contadores[index] <= 0) {
            removeButton.prop("disabled", true);
        } else {
            removeButton.prop("disabled", false);
        }

        addButton.click(function () {
            contadores[index]++;
            contadorElement.text(contadores[index]);
            removeButton.prop("disabled", false);
            actualizarCarrito();
            guardarContadorEnStorage(index, contadores[index]);
        });

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
        // Limpiar contenido antes de agregar nuevas líneas
        nombreArticuloElement.empty();
        precioArticuloElement.empty();

        let totalProductos = 0;
        let precioTotal = 0;

        // Filtrar solo los platos que tienen cantidad mayor a 0 en el carrito
        const platosSeleccionados = Object.keys(contadores).filter(index => contadores[index] > 0);

        // Actualizar el carrito
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

            nombreArticuloElement.append(elementoNombre);
            precioArticuloElement.append(elementoPrecio);

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

        // Actualizar el contador en el header
        contadorCarrito.text(totalProductos);
    }
    function guardarContadorEnStorage(index, valor) {
        /* Guardamos en el local storage los valores de los contadores en su indice correspondiente */
        localStorage.setItem(`contador_${index}`, valor);
    }

    function hayDatosEnLocalStorage() {
        // Verificar si hay al menos un contador diferente de cero en el localStorage
        return Object.keys(localStorage).some(key => key.startsWith('contador_') && parseInt(localStorage.getItem(key)) !== 0);
    }

    function limpiarLocalStorage() {
        try {
            // Obtener todas las claves del localStorage
            const claves = Object.keys(localStorage);

            // Filtrar solo las claves relacionadas con el carrito
            const clavesCarrito = claves.filter(key => key.startsWith('contador_'));

            // Imprimir las claves antes de intentar borrar
            console.log("Claves antes de borrar:", clavesCarrito);

            // Borrar cada clave relacionada con el carrito
            clavesCarrito.forEach(key => {
                localStorage.removeItem(key);
            });

            // Imprimir las claves después de borrar
            console.log("Claves después de borrar:", Object.keys(localStorage));
        } catch (error) {
            console.error("Error al intentar borrar claves:", error);
        }
    }


    function obtenerContadoresDesdeStorage() {
        let contadoresStorage = {};
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('contador_')) {
                const index = key.replace('contador_', '');
                contadoresStorage[index] = parseInt(localStorage.getItem(key));
            }
        });
        return contadoresStorage;
    }

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
            pagina_pedido_realizado.fadeIn(500);
        });
    }

});
