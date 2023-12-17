
$(document).ready(function () {
    // atributos del registro
    let idioma = $('html').attr('lang');
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
    const urlActual = window.location.href;
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
        let mensajes = {
            'es': {
                nombreInvalido: "Nombre no válido",
                telefonoInvalido: "Teléfono no válido",
                emailInvalido: "Correo electrónico no válido",
                direccionInvalida: "Dirección no válida"
            },
            'en': {
                nombreInvalido: "Invalid name",
                telefonoInvalido: "Invalid phone number",
                emailInvalido: "Invalid email address",
                direccionInvalida: "Invalid address"
            }
        };

        if (nombre.trim() === '') {
            alert(mensajes[idioma].nombreInvalido);
        } else if (!telefonoValido(telefono)) {
            alert(mensajes[idioma].telefonoInvalido);
        } else if (!emailValido(email)) {
            alert(mensajes[idioma].emailInvalido);
        } else if (direccion.trim() === '') {
            alert(mensajes[idioma].direccionInvalida);
        }
        else {
            /* Los datos son validos, guardar en el Web Storage y mostrar el contenido de exito en registro */
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
        // Desactivar temporalmente la validacion para evitar el mensaje de campo requerido
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
    // Verificar si venimos desde el enlace de compra/reserva para que una vez registrados podamos continuar con el pedido/reserva
    if (urlActual.includes('source=pagina_pedido')) {
        if (idioma === "en") botonExito.text('Complete your delivery');
        else botonExito.text('Continuar con el pedido');
        botonExito.click(function () {
        if (idioma === "en") window.location.href = "pedido_eng.html";
        else window.location.href = "pedido.html";
        });
    } else if (urlActual.includes('source=pagina_reserva')) {
        if (idioma === "en") botonExito.text('Complete your reservation');
        else botonExito.text('Continuar con la reserva')
        botonExito.click(function () {
            if (idioma === "en") window.location.href = "reserva_eng.html";
            else window.location.href = "reserva.html";
        });
    }
    // Si no, tenemos la opcion de volver a la pagina principal
    else {
        botonExito.click(function () {
            if (idioma === "en") window.location.href = "index_eng.html";
            else window.location.href = "index.html";
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