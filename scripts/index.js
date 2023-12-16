$(document).ready(function () {
    const header = $(".header_main_page")[0];
    const toggleClass = "is-sticky";
    $(window).scroll(function(){
        const currentScroll = window.scrollY;
        if (currentScroll > 150) {
            header.classList.add(toggleClass);
            $(".ul_link_page").hide();
            $("#texto_baratie").hide();
            $(".header_main_page").css("animation", ""); 
          } else {
            header.classList.remove(toggleClass);
            $(".ul_link_page").show();
            $("#texto_baratie").show();
            
            $(".header_main_page").css("animation", "slideUp 0.5s ease-out"); 
          }  
    });
    
    })