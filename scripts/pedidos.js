/*Codigo JS para manejar la pagina de las compras y los diferentes eventos que suceden en ella*/
document.addEventListener("DOMContentLoaded", function () {
    //Seleccionar todos los elementos de plato, botones de añadir y botones de quitar
    const platos = $(".plato");
    const addButtons = $(".add");
    const removeButtons = $(".remove");
    let contador = 0;
    const totalElement = $("#total-sum");
    const platosSeleccionadosElement = $("#platos-seleccionados");
    let carrito = {};
    const contadores = {};
    // Cargo los datos en el WebStorage del carrito si existe de alguna sesion no confirmada anteriormente
    const carritoData = localStorage.getItem('carrito');
    if (carritoData) {
        carrito = JSON.parse(carritoData);
        // Actualizar la vista del carrito con los datos cargados
        updateCarrito();
    }
    // Obtenemos la informacion de cada plato, asi como su cantidad para sumarla al carrito
    platos.each(function(index, plato) {
        contadores[index] = 0;
        // const nombrePlato = $(plato).find(".txt_plato").text();
        const removeButton = removeButtons.eq(index);
        const addButton = addButtons.eq(index);
        const contadorElement = $(plato).find(".contador"); // Seleccionar el elemento del contador
        if (contadores[index] <= 0) {
            removeButton.prop("disabled", true);
        }
        addButton.click(function() {
            // Incrementar el contador para el plato actual
            contadores[index]++;
            // Actualizar la interfaz de usuario o realizar otras acciones
            contadorElement.text(contadores[index]);
            removeButton.prop("disabled", false);
        });
        removeButton.click(function() {
            // Incrementar el contador para el plato actual
            contadores[index]--;
            // Actualizar la interfaz de usuario o realizar otras acciones
            contadorElement.text(contadores[index]);
            if (contadores[index] <= 0) {
                removeButton.prop("disabled", true);
            }
        });
            /*
            if (carrito[nombrePlato]) {
                carrito[nombrePlato].cantidad += 1;
                carrito[nombrePlato].total += precio;
            } else {
                carrito[nombrePlato] = { cantidad: 1, total: precio };
            }
            updateCarrito();*/
        /*
        // Manejar evento de restar platos del carrito
        removeButton.click(function() {
            if (carrito[nombrePlato] && carrito[nombrePlato].cantidad > 0) {
                carrito[nombrePlato].cantidad -= 1;
                carrito[nombrePlato].total -= parseFloat($(plato).data("precio"));
            }
            updateCarrito();
        });*/
    });

    // Funcion principal que actualiza el carrito cada vez que se quita o suma un nuevo plato
    function updateCarrito() {
        let totalCarrito = 0;
        let detallesCarrito = "";
        contador = 0;
        // Informacion que se mostrara en el ticket total
        for (const plato in carrito) {
            if (carrito[plato].cantidad > 0) {
                totalCarrito += carrito[plato].total;
                detallesCarrito += `${plato}: ${carrito[plato].cantidad} x €${carrito[plato].total.toFixed(2)}<br>`;
                contador += carrito[plato].cantidad;
            }
        }
        totalElement.text(totalCarrito.toFixed(2));
        platosSeleccionadosElement.html(detallesCarrito);
        $(".counter").text(contador);
        // Activar o desactivar los botones de quitar segun la cantidad en el carrito
        removeButtons.each(function(index, removeButton) {
            const plato = platos.eq(index).find(".txt_plato").text();
            if (carrito[plato] && carrito[plato].cantidad > 0) {
                $(removeButton).prop("disabled", false);
            } else {
                $(removeButton).prop("disabled", true);
            }
        });
        // Guardo los datos en el WebStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
});


