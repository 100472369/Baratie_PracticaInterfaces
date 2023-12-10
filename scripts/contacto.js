$(document).ready(function () {
    const submitButton = $("#submit");
    const deleteButton = $("#delete");
    const contactoForm = $("#formulario")
    /* Manejador de la funcion cuando se envia el formulario de registro */
    submitButton.click(function () {
        let nombre = $("#nombre").val();
        let telefono = $("#telefono").val();
        let email = $("#email").val();
        let mensaje = $("#consulta").val();

        // Control de errores via REGEX
        if (nombre.trim() === '') {
            alert("Nombre no válido");
        } else if (!telefonoValido(telefono)) {
            alert("Teléfono no válido");
        } else if (!emailValido(email)) {
            alert("Correo electrónico no válido");
        } else if (mensaje.trim() === '') {
            alert("Necesita introducir un mensaje válido");
        } else {
            /* Los datos son válidos, guardar en el Web Storage y mostrar el contenido de éxito */
            alert("¡Gracias por enviarnos el mensaje! ¡Nuestros cocineros piratas del Baratie intentarán responderte" +
                " lo antes posible!");
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