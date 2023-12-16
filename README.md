# Baratie_PracticaInterfaces
1. Header dinamico en el homepage: con hacer scroll hacia abajo en la pagina principal se comprueba que este se comprime
2. Carrito de compra: una vez registrados y en la pagina de pedido, este figura arriba en la esquina derecha, siendo 'clickable'
   para enviar al resumen del carrito
3. En la pagina de reserva está el formulario de reserva:
   3.1. Se selecciona dia
   3.2. Se selecciona mes (ofrecemos los proximos 6 meses segun la fecha actual del servidor)
   3.3. Se selecciona dia del mes (si no esta el mes seleccionado, no debe estar habilitado el dropdown).
        si hemos elegido el mes actual, los dias disponibles son hasta el ultimo empezando por el posterior al actual de la fecha del servidor
   3.4. Se selecciona hora
   3.5. Se selecciona num_personas
   Si el usuario no esta registrado, se le redirige a la pagina de reserva. Al completar, vuelve a esta sin perder los datos
   Se entrega y se comprueba que esta todo ok.
6. Confirmar acciones: al completar registros, reservas, o pedidos; se recibira mensajes de confirmaciones de que todo está Ok
   para las acciones efectuadas