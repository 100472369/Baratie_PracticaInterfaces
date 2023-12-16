$(document).ready(function () {
    let idioma = $('html').attr('lang');
    const submitButton = $("#submit");
    const deleteButton = $("#delete");
    const contactoForm = $("#formulario")
    /* Manejador de la funcion cuando se envia el formulario de registro */
    submitButton.click(function () {
        let nombre = $("#nombre").val();
        let telefono = $("#telefono").val();
        let email = $("#email").val();
        let mensaje = $("#consulta").val();
        // Control de errores via REGEX. Antes cargamos los mensajes de alerta necesarios en ambos idiomas de la pagina
        let mensajes = {
            'es': {
                nombreInvalido: "Nombre no válido",
                telefonoInvalido: "Teléfono no válido",
                emailInvalido: "Correo electrónico no válido",
                mensajeVacio: "Necesita introducir un mensaje válido",
                mensajeExito: "¡Gracias por enviarnos el mensaje! ¡Nuestros cocineros piratas del Baratie intentarán responderte lo antes posible!"
            },
            'en': {
                nombreInvalido: "Invalid name",
                telefonoInvalido: "Invalid phone number",
                emailInvalido: "Invalid email address",
                mensajeVacio: "You need to enter a valid message",
                mensajeExito: "Thank you for sending us the message! Our pirate chefs from Baratie will try to respond as soon as possible!"
            }
        };
        if (nombre.trim() === '') {
            alert(mensajes[idioma].nombreInvalido);
        } else if (!telefonoValido(telefono)) {
            alert(mensajes[idioma].telefonoInvalido);
        } else if (!emailValido(email)) {
            alert(mensajes[idioma].emailInvalido);
        } else if (mensaje.trim() === '') {
            alert(mensajes[idioma].mensajeVacio);
        } else {
            /* Los datos son válidos, guardar en el Web Storage y mostrar el contenido de éxito */
            alert(mensajes[idioma].mensajeExito);
        }
    });
    deleteButton.click(function(){
        // Desactivar temporalmente la validación
        contactoForm.find(':input[required]').removeAttr('required');

        // Limpiar el formulario
        contactoForm[0].reset();

        // Restaurar la validación después de un breve retraso (para permitir la limpieza)
        setTimeout(function() {
            contactoForm.find(':input[required]').attr('required', 'required');
        }, 1);
    });
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