// $("#commentForm").validate();


/* Prefilled Date */
$('#date2').daterangepicker({
    "singleDatePicker": true,
}, function (start, end, label) {
    console.log(start.format('YYYY-MM-DD'));
});
/* Prefilled Date Ends */



/* Date */
$('#date1').daterangepicker({
    "showDropdowns": true,
    autoUpdateInput: false,
    singleDatePicker: true,
});
$('#date1').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY'));
    if ($(this).val().length > 0) {
        $(this).addClass('field--not-empty');
    } else {
        $(this).removeClass('field--not-empty');
    }
});
/* Date Ends */




/* Time Picker */
$('#time1').daterangepicker({
    timePicker: true,
    timePicker24Hour: true,
    timePickerIncrement: 1,
    timePickerSeconds: true,
    autoUpdateInput: false,
    singleDatePicker: true,
    locale: {
        format: 'HH:mm:ss'
    }
}).on('show.daterangepicker', function (ev, picker) {
    picker.container.find(".calendar-table").hide();
});
$('#time1').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('HH:mm:ss'));
    if ($(this).val().length > 0) {
        $(this).addClass('field--not-empty');
    } else {
        $(this).removeClass('field--not-empty');
    }
});
/* Time Picker Ends */


/* Time Picker Prefilled */
$('#time2').daterangepicker({
    timePicker: true,
    timePicker24Hour: true,
    timePickerIncrement: 1,
    timePickerSeconds: true,
    autoUpdateInput: false,
    singleDatePicker: true,
    locale: {
        format: 'HH:mm:ss'
    }
}).on('show.daterangepicker', function (ev, picker) {
    picker.container.find(".calendar-table").hide();
});
$('#time2').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('HH:mm:ss'));
    if ($(this).val().length > 0) {
        $(this).addClass('field--not-empty');
    } else {
        $(this).removeClass('field--not-empty');
    }
});
/* Time Picker Prefilled Ends */




/* Clipboard js start */
function copyFunction() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Clipboard Copied";
}

function copyoutFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}
/* Clipboard js end */





// $('#service-select').select2();
// $('#service-select-2').select2({
//     minimumResultsForSearch: -1
// });