$(document).ready(function () {
    const header = $(".header_main_page")[0];
    const toggleClass = "is-sticky";
    $(window).scroll(function(){
        const currentScroll = window.scrollY;
        if (currentScroll > 150) {
            header.classList.add(toggleClass);
            $(".links_page").hide();
            $("#texto_baratie").hide();
          } else {
            header.classList.remove(toggleClass);
            $(".links_page").show();
            $("#texto_baratie").show();
          }  
    });


    })

function myFunction() {
    var x = $("#myLinks");
    let logo = $("#logo_topnav");
    logo.slideUp();
    x.slideDown();

}

function showStripres(){
    let x = $("#myLinks");
    let logo = $("#logo_topnav");
    logo.slideDown();
    x.slideUp();
}

