$(document).ready(function () {
    var linkPopupHeader = $('.header .header__link');
    var linkPopupFirst = $('.contacts-section__link');
    var linkPopupSecond = $('.step__popup-link');
    var popupWrapper = $('.feedback-wrapper');
    var popup = $('.feedback');
    var popupCloseIcon = popupWrapper.find('.form__close-icon');

    linkPopupHeader.on('click', function () {
        popupWrapper.addClass('feedback-wrapper-show');
    });

    linkPopupFirst.on('click', function () {
        popupWrapper.addClass('feedback-wrapper-show');
    });

    linkPopupSecond.on('click', function () {
        popupWrapper.addClass('feedback-wrapper-show');
    });

    popupWrapper.on('click', function (e) {
        var isClickNotPopup = popup.has(e.target).length === 0;
        if (isClickNotPopup) {
            popupWrapper.removeClass('feedback-wrapper-show');
        }
    });

    popupCloseIcon.on('click', function () {
        popupWrapper.removeClass('feedback-wrapper-show');
    });

    $('.feedback .form').submit(function (event) {
        event.preventDefault();
        var formBtnWrapper = $(this).find('.form__btn-wrapper');
        var formBtn = formBtnWrapper.find('.form__btn');
        formBtn.html('...');

        $.ajax({
            type: "POST",
            url: './feedback.php',
            data: $(this).serialize(),
            success: function (data) {
                var newData = JSON.parse(data);
                formBtnWrapper.html(newData.message);
            },
            error: function (jqXHR, text, error) {
                formBtnWrapper.html(newData.message);
            }
        });
    });
});