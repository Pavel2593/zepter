// $(document).ready(function () {
//     var linkPopupFirst = $('.contacts-section__link');
//     var linkPopupSecond = $('.step__link');
//     var popupWrapper = $('.feedback-wrapper');
//     var popup = $('.feedback');
//     var popupCloseIcon = popupWrapper.find('.form__close-icon');

//     linkPopupFirst.on('click', function() {
//         popupWrapper.addClass('feedback-wrapper-show');
//     });

//     linkPopupSecond.on('click', function () {
//         popupWrapper.addClass('feedback-wrapper-show');
//     });

//     popupWrapper.on('click', function (e) {
//         var isClickNotPopup = popup.has(e.target).length === 0;
//         if (isClickNotPopup) {
//             popupWrapper.removeClass('feedback-wrapper-show');
//         }
//     });

//     popupCloseIcon.on('click', function() {
//         popupWrapper.removeClass('feedback-wrapper-show');
//     });

//     $('.feedback .form').submit(function (event) {
//         event.preventDefault();
//         var feedbackForm = $(this);
//         console.log(feedbackForm[0]);
//         var name = feedbackForm[0].elements.feedbackName.value;
//         var surname = feedbackForm[0].elements.feedbackSurname.value;
//         var middleName = feedbackForm[0].elements.feedbackMiddleName.value;
//         var city = feedbackForm[0].elements.feedbackCity.value;
//         var phoneNumber = feedbackForm[0].elements.feedbackPhoneNumber.value;
//         var email = feedbackForm[0].elements.feedbackEmail.value;

//         var data = {
//             'name': name,
//             'surname': surname,
//             'middleName': middleName,
//             'city': city,
//             'phoneNumber': phoneNumber,
//             'email': email
//         }
//         console.log(data);
//     });
// });