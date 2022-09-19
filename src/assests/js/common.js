/*================================= Sticky Header Starts =================================*/
function fixedHeader() {
    var sticky = $('#header'),
        scroll = $(window).scrollTop();
    if (scroll >= 10) sticky.addClass('fixHeader');
    else sticky.removeClass('fixHeader');
}
$(window).scroll(function (e) {
    fixedHeader();
});
fixedHeader();
/* Sticky Header Ends */


// $('#header').load('header.html');
// $('#footer').load('footer.html');


/* common tab start */
$('.tabgroup > div').hide();
$('.tabgroup > div:first-of-type').show();
$('.tabs a').click(function (e) {
    e.preventDefault();
    var $this = $(this),
        tabgroup = '#' + $this.parents('.tabs').data('tabgroup'),
        others = $this.closest('li').siblings().children('a'),
        target = $this.attr('href');
    others.removeClass('active');
    $this.addClass('active');
    $(tabgroup).children('div').hide();
    $(target).show();
});
/* common tab end */



/* Form Feild Functionality */
$(document).on('input', '.form-field', function () {
    if ($(this).val().length > 0) {
        $(this).addClass('field--not-empty');
    } else {
        $(this).removeClass('field--not-empty');
    }
});
/* Form Feild Functionality ends */



/* Password View */
$(document).on('click', '.view-pass', function () {

    inp = $(this).parents('.form-grp').find('input');
    type = inp.attr('type');

    if (type == 'password') {
        inp.attr('type', 'text');
        $(this).removeClass('ph-eye-slash').addClass('ph-eye');
    } else {
        inp.attr('type', 'password');
        $(this).removeClass('ph-eye').addClass('ph-eye-slash');
    }
});
/* // Password View */




//  if ($('.enquireComponent').length > 0) {
//      $.getScript("./js/jquery.validate.min.js", function () {



// var bannedDomains = ["0-mail.com", "027168.com"];

// $.validator.addMethod('domainNotBanned', function (value, elem, param) {
//     var domain = value.split('@')[1];
//     return bannedDomains.indexOf(domain) < 0;
// }, 'Emails from this domain are not allowed.');

//          $.validator.addMethod("laxEmail", function (value, element) {
//              return this.optional(element) || /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value);
//          }, 'Please enter a valid email address.');
//          var ruleLists = {
//              'name': {
//                  required: true,
//                  minlength: 2,
//              },
//              'mob_no': {
//                  required: true,
//                  /* minlength: 10, maxlength: 10, */
//              },
//              'email': {
//                  required: true,
//                  laxEmail: true,
                    // domainNotBanned: true,
//              },
//          };
//          var messageList = {
//              'name': {
//                  required: "Your Name is required",
//                  minlength: "Name must be at least 2 characters",
//              },
//              'mob_no': {
//                  required: "Mobile Number is required",
//                  /* minlength: "Mobile Number must be at least 10 characters", maxlength: "Mobile Number must be 10 characters", */
//              },
//              'email': {
//                  required: "Email Address is required",
//                  laxEmail: "Please enter a valid email address.",
//              },
//          };

//          function sendForm(t) {
//              var name = $("#res-name").val();
//              var email = $("#email").val();
//              var mobile = $("#mobile").val();
//              var whatsappin = $("#purchase_confirmation").val();
//              $('.f-btn').html('Loading...');
//              $.ajax({
//                  url: 'selldo_response.php',
//                  type: "POST",
//                  data: {
//                      'name': name,
//                      'email': email,
//                      'mobile': mobile,
//                      'whatsappin': whatsappin
//                  },
//                  success: function (result) {
//                      if (result == 'Success') {
//                          window.location.href = 'thankyou.html';
//                      } else {
//                          console.log('eEror');
//                      }
//                  },
//                  error: function (xhr, resp, text) {
//                      console.log(xhr, resp, text);
//                  }
//              }); /* console.log($(t).serialize()); */
//          }
//          var validateObj = {
//              rules: ruleLists,
//              messages: messageList,
//              submitHandler: function (form) {
//                  sendForm(form);
//              }
//          };
//          $('.enquireComponent').load('content.php .enquireComponentIn', function () {
//              $("#enquiryForm").attr("autocomplete", "off");
//              $("#enquiryForm").validate(validateObj);
//              $.getScript("./js/intlTelInput.js", function () {
//                  var input = document.querySelector("#mobile");
//                  var iti = window.intlTelInput(input, {
//                      separateDialCode: true,
//                      preferredCountries: ['in'],
//                      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.3/build/js/utils.js",
//                  });
//                  window.iti = iti;
//              });
//          });
//      });
//  }



// if ($('.lazy').length > 0) {
//     $('.lazy').Lazy({
//         effect: 'fadeIn',
//         visibleOnly: true,
//     });
// }
// window.scrollTo(0, 0);
// $('window').scrollTop(0);
