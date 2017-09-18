import '../scss/style.scss'

import 'slick-carousel';
import 'slick-carousel/slick/slick.css'

function changeColorIcon() {
    $('#setting').attr('fill', '#000');
}

function toggleShowMenu() {
    $(".header-menu").on("click", function () {
        $('#wrapper').toggleClass('is-show');
    });

    $('#overlay').on('click', function(){
        $('#wrapper').toggleClass('is-show');
    })
}

// **********************************************************************//
// ! DOM ready
// **********************************************************************//
$(document).ready(function () {
    $('.history-checkin').slick({
        dots: false,
        infinite: true,
        speed: 100,
        arrows: false,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        cssEase: 'ease-in'
    });
    changeColorIcon();
    toggleShowMenu();
});
