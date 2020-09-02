(function () {

    /* Локализация datepicker */
    $.datepicker.regional['en'] = {
        weekHeader: 'Не',
        dateFormat: 'yy-mm-dd',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        maxDate: new Date(2002, 12 - 1, 31),
        minDate: new Date(1920, 1 - 1, 1),
        changeYear: true,
        yearRange: "1920:2002",
        changeMonth: true,
    }
    $.datepicker.setDefaults($.datepicker.regional['en'])
})()
