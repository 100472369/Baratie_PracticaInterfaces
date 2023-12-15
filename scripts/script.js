$(document).ready(function() {
    // Array de objetos con información de las redes sociales
    const redesSociales = [
        { nombre: 'Instagram', enlace: 'https://www.instagram.com/onepiece_staff/?utm_source=ig_web_button_share_sheet&igshid=YzAwZjE1ZTI0Zg==' },
        { nombre: 'TikTok', enlace: 'https://www.tiktok.com/@onepiece.staff.official?is_from_webapp=1&sender_device=pc' },
        { nombre: 'Crunchyroll', enlace: 'https://www.crunchyroll.com/es-es/series/GRMG8ZQZR/one-piece' },
        { nombre: 'Twitter', enlace: 'https://twitter.com/Eiichiro_Staff' },
        { nombre: 'YouTube', enlace: 'https://youtube.com/@onepieceofficial?si=DX-caqvmN9qSX5bF' }
    ];

    const redesSocialesMH = [
        { nombre: 'Instagram', enlace: 'https://www.instagram.com/onepiece_staff/?utm_source=ig_web_button_share_sheet&igshid=YzAwZjE1ZTI0Zg==' },
        { nombre: 'Twitter', enlace: 'https://twitter.com/Eiichiro_Staff' },
        { nombre: 'TikTok', enlace: 'https://www.tiktok.com/@onepiece.staff.official?is_from_webapp=1&sender_device=pc' }
    ];

    // Obtener las imágenes existentes y agregar enlaces
    $('#contenedor_redes_footer img').each(function(index) {
        // Agregar enlace a cada imagen
        let enlace = $('<a>', { href: redesSociales[index].enlace, target: '_blank' });
        $(this).wrap(enlace); // Envolver la imagen con el enlace
    });

    $('#Contenedor_redes_mh .redes_mh').each(function(index) {
        // Agregar enlace a cada imagen
        let enlace = $('<a>', { href: redesSocialesMH[index].enlace, target: '_blank' });
        $(this).wrap(enlace); // Envolver la imagen con el enlace
    });

    let enlaceReserva = $('<a>', { href: 'reserva.html', target: '_blank' });
    $('#Boton_reserva_mh').wrap(enlaceReserva);

    let linkPolitica = $('<a>', { href: 'https://www.privacypolicies.com/live/6cc6bb19-5b51-4de4-a028-86e7dd0290ac', target: '_blank' });
    $('#Link_politica').wrap(linkPolitica);

});