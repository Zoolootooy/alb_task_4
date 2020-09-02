$(function () {
    var self = this
    var maskList = $.masksSort($.masksLoad('public/json/phone-codes.json'), ['#'], /[0-9]|#/, 'mask')
    var maskOpts = {
        inputmask: {
            definitions: {
                '#': {
                    validator: '[0-9]',
                    cardinality: 1
                }
            },
            showMaskOnHover: false,

            //autoUnmask
            //true: value will be without mask;
            //false: value will be with mask;
            autoUnmask: false,
            clearMaskOnLostFocus: false
        },
        match: /[0-9]/,
        replace: '#',
        list: maskList,
        listKey: 'mask',
        onMaskChange: function (maskObj, determined) {

            if (determined) {
                self.$emit('update-phone', $('#phone').val())
                var hint = maskObj.name_en
                if (maskObj.desc_en && maskObj.desc_en != '') {
                    hint += ' (' + maskObj.desc_en + ')'
                }
                $('#descr').html(hint)
            } else {
                $('#descr').html('Mask of input')
            }
        }
    }

    $('#phone_mask').change(function () {
        $('#phone').inputmask('remove')
        $('#phone').inputmasks(maskOpts)
    })

    $('#phone').inputmasks(maskOpts)

    $('#phone').on('input ', function (e) {
        self.$emit('update-phone', $('#phone').val())
    })
})

