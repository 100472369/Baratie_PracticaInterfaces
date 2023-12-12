$(document).ready(function () {
    const platos = $(".plato");
    const addButtons = $(".add");
    const removeButtons = $(".remove");
    const contadorCarrito = $("#contador_carrito");
    const totalArticulosResumen = $("#total_articulos_resumen");
    const nombreArticuloElement = $("#nombre_articulo");
    const precioTotalElement = $("#precio_total");

    let contadores = obtenerContadoresDesdeStorage() || {};

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
        let totalProductos = 0;
        let precioTotal = 0;

        // Filtrar solo los platos que tienen cantidad mayor a 0 en el carrito
        const platosSeleccionados = Object.keys(contadores).filter(index => contadores[index] > 0);

        // Actualizar el carrito
        platosSeleccionados.forEach(index => {
            totalProductos += contadores[index];

            const precioPlato = parseFloat(platos.eq(index).find(".precio").text());
            precioTotal += contadores[index] * precioPlato;
        });

        // Actualizar el resumen solo si hay productos seleccionados
        if (totalProductos > 0) {
            // Actualizar el resumen
            totalArticulosResumen.text(`Total de productos: ${totalProductos}`);
            precioTotalElement.text(`Precio total: ${precioTotal.toFixed(2)} €`);

            // Actualizar el cuerpo de id="nombre_articulo"
            nombreArticuloElement.empty();
            platosSeleccionados.forEach(index => {
                const nombrePlato = platos.eq(index).find(".nombre_plato").text();
                const cantidadSeleccionada = contadores[index];
                const precioIndividual = parseFloat(platos.eq(index).find(".precio").text());

                const texto = `${nombrePlato} ${cantidadSeleccionada} x ${precioIndividual.toFixed(2)} €`;

                const elementoP = $("<p>").text(texto);
                nombreArticuloElement.append(elementoP);
            });
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
        localStorage.setItem(`contador_${index}`, valor);
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
});
