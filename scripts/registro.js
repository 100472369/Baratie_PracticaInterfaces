
$(document).ready(function () {
    const registroForm = $("#formulario");
    const registroExito = $("#registro_exito");
    const submitButton = $("#submit");
    const botonExito = $("#boton_exito");
    const deleteButton = $("#delete");

    // Verificar si hay datos de registro en el Web Storage. Si los datos estan presentes no se muestra el formulario
    const nombreRegistrado = localStorage.getItem('nombre');
    const telefonoRegistrado = localStorage.getItem('telefono');
    const emailRegistrado = localStorage.getItem('email');
    const direccionRegistrada = localStorage.getItem('direccion');
    if (nombreRegistrado && telefonoRegistrado && emailRegistrado && direccionRegistrada) {
        registroForm.hide();
        registroExito.show();
    }

    /* Manejador de la funcion cuando se envia el formulario de registro */
    submitButton.click(function () {
        let nombre = $("#nombre").val();
        let telefono = $("#telefono").val();
        let email = $("#email").val();
        let direccion = $("#direccion").val();

        // Control de errores via REGEX
        if (nombre.trim() === '') {
            alert("Nombre no válido");
        } else if (!telefonoValido(telefono)) {
            alert("Teléfono no válido");
        } else if (!emailValido(email)) {
            alert("Correo electrónico no válido");
        } else if (direccion.trim() === '') {
            alert("Dirección no válida");
        } else {
            /* Los datos son válidos, guardar en el Web Storage y mostrar el contenido de éxito */
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('telefono', telefono);
            localStorage.setItem('email', email);
            localStorage.setItem('direccion', direccion);

            registroForm.fadeOut(500, function () {
                registroExito.fadeIn(500);
            });
        }
    });

    deleteButton.click(function(){
        // Desactivar temporalmente la validación
        registroForm.find(':input[required]').removeAttr('required');

        // Limpiar el formulario
        registroForm[0].reset();

        // Restaurar la validación después de un breve retraso (para permitir la limpieza)
        setTimeout(function() {
            registroForm.find(':input[required]').attr('required', 'required');
        }, 1);
    });
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    // Verificar si venimos desde el enlace de compra para que una vez registrados podamos continuar con el pedido
    if (urlParams.has('fuente')) {
        botonExito.text('Continuar con el pedido');
        botonExito.click(function () {
            // Puedes agregar acciones adicionales al hacer clic en el botón de éxito
            window.location.href = "pedido.html";
        });
    }
    // Si no, tenemos la opcion de volver a la pagina principal
    else {
        botonExito.click(function () {
            window.location.href = "index.html";
        });
    }
    /* Funciones de validacion con REGEX para comprobar que el telefono y el e-mail sean
    * correctos
    */
    function telefonoValido(telefono) {
        return /^[0-9]{9}$/.test(telefono);
    }
    function emailValido(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
});