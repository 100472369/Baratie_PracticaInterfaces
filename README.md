# Baratie_PracticaInterfaces

























4 En este apartado se comprueba la funcionalidad de el menú hamburguesa. Para poder comprobar la funcionalidad es necesario pinchar en las tres barras en la esquina superior derecha. Después se tendría que comprobar que todos los links funcionen y redirigan a sus respectivas secciones.

5 En este apartado se comprueba la funcionalidad de la función de traducción. Para cambiar la página entre ingles y español es necesario pinchar la bandera en la esquina inferior derecha de cualquier página. La página traducida se cargara automaticamente. Finalmente, hay que probar que cuando se cambia de página el idioma se mantiene. 
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