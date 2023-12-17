// funcion para la animacion del header
$(document).ready(function () {
    // obtener el objeto header
    const header = $(".header_main_page")[0];
    const toggleClass = "is-sticky";
    $(window).scroll(function(){
        // agregarle una subclase si se cumple la condicion de scroll 
        const currentScroll = window.scrollY;
        if (currentScroll > 150) {
            // agregar clase y quitar textos. Tambien cambiar el atributo de animation
            header.classList.add(toggleClass);
            $(".ul_link_page").hide();
            $("#texto_baratie").hide();
            $(".header_main_page").css("animation", ""); 
          } else {
            // quitar la clase y poner los textos de nuevo cuando se vuelve a la posicion origina. Tambien se agrega el CSS de la animacion.
            header.classList.remove(toggleClass);
            $(".ul_link_page").show();
            $("#texto_baratie").show();
            
            $(".header_main_page").css("animation", "slideUp 0.5s ease-out"); 
          }  
    });
    
    })