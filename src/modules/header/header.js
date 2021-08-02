console.log('header');
$(document).ready(function () {
    var burgerIcon = $('.header .header__burger-icon');
    var closeIcon = $('.header .nav__close-icon');
    var navContainer = $('.header .nav');
    var navLink = $('.header .nav__link');
    burgerIcon.on('click', function () {
        navContainer.addClass('nav-show');
    });
    closeIcon.on('click', function () {
        navContainer.removeClass('nav-show');
    });

    navLink.on('click', function () {
        navContainer.removeClass('nav-show');
    });

    $(document).mouseup(function (event) {
        if (!navContainer.is(event.target) && navContainer.has(event.target).length === 0) {
            navContainer.removeClass('nav-show');
        }
    });
});