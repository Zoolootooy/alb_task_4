function onFirstForm () {
  $('#second').hide()
}

function onSecondForm () {
  $('#first').hide()
}

function funcBeforeFirst () {
}

function funcSuccessFirst (data) {
  if (data == 'true') {
    $('#first').hide(500)
    $('#second').show(500)
  }
  else {
    alert(
      'Some error with saving your data. Please check the entering data and try again.')
  }
}

function funcBeforeSecond () {
}

function funcSuccessSecond (data) {
  if (data == 'true') {
    $('#second').hide(500)
    $('#icons').show(500)
  }
  else {
    alert(
      'Some error with updating your data. Please check the entering data and try again.')
  }
}

$.validator.addMethod('filesize', function (value, element, param) {
  return this.optional(element) || (element.files[0].size <= param)
}, 'File size must be less than {0}')

$.validator.addMethod('regexp', function (value, element, params) {
  var expression = new RegExp(params)
  return this.optional(element) || expression.test(value)
}, 'Enter full phone number')

$(function () {
  $.validator.setDefaults({
    highlight: function (element) {
      $(element).closest('.form-control').addClass('is-invalid')
    },
    unhighlight: function (element) {
      $(element).closest('.form-control').removeClass('is-invalid')
    },
  })

  $('#first').validate({
    rules: {
      firstname: {
        required: true,
        maxlength: 100,
      },
      lastname: {
        required: true,
        maxlength: 255,
      },
      birthdate: {
        required: true,
      },
      rep_subj: {
        required: true,
        maxlength: 255,
      },
      country_id: {
        required: true,
      },
      phone: {
        required: true,
        regexp: /\+[0-9,\-, ,(,)]+$/,
      },
      email: {
        required: true,
        email: true,
        maxlength: 70,
        remote: {
          url: '/checkEmail',
          type: 'post',
        },
      },
    },
    // highlight: function (element) {
    //   $(element).closest('.form-control').addClass('is-invalid')
    // },
    // unhighlight: function (element) {
    //   $(element).closest('.form-control').removeClass('is-invalid')
    // },
    messages: {
      email: {
        email: 'Please enter a <em>valid</em> email address',
        remote: 'This email is already registered.',
        maxlength: 'Please enter no more than 70 characters.',
      },
      firstname: {
        maxlength: 'Please enter no more than 100 characters.',
      },
      lastname: {
        maxlength: 'Please enter no more than 255 characters.',
      },
    },
    submitHandler: function () {
      $.ajax({
        url: '/saveData',
        type: 'POST',
        data: ({
          firstname: $('#firstname').val(),
          lastname: $('#lastname').val(),
          birthdate: $('#birthdate').val(),
          rep_subj: $('#rep_subj').val(),
          country_id: $('#country_id').val(),
          phone: $('#phone').val(),
          email: $('#email').val(),
        }),
        enctype: 'multipart/form-data',
        datatype: 'html',
        beforeSend: funcBeforeFirst,
        success: funcSuccessFirst,
      })

    },
  })

  $('#second').validate({
    rules: {
      photo: {
        extension: 'png|jpe?g|gif',
        filesize: 5242880,
      },
      company: {
        maxlength: 70,
      },
      position: {
        maxlength: 100,
      },
      about: {
        maxlength: 21844,
      },
    },
    messages: {
      photo: {
        extension: 'Only .png, .jpg, .jpeg, .gif files allowed.',
        filesize: 'File must be less then 5 Mb.',
      },
      company: {
        maxlength: 'Please enter no more than 70 characters.',
      },
      position: {
        maxlength: 'Please enter no more than 100 characters.',
      },
      about: {
        maxlength: 'Please enter no more than 21844 characters.',
      },
    },
    submitHandler: function (form) {

      $.ajax({
        url: '/showIcons',
        type: 'POST',
        data: new FormData(form),
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        datatype: 'html',
        beforeSend: funcBeforeSecond,
        success: funcSuccessSecond,
      })
    },
  })

})

function getCookie (name) {
  let matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
    '=([^;]*)',
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

$(document).ready(function () {

  $('#birthdate').datepicker()
  $('#birthdate').datepicker({
    minDate: 0,
  })

  $('#birthdate').datepicker({
    autoclose: true,
  }).change(function () {
    $(this).valid()  // triggers the validation test
  })

  $('#btnNextSecond').bind('click', function () {
    $.ajax({
      url: '/getMembersNumber',
      type: 'POST',
      datatype: 'html',
      success: function (data) {
        $('#btnList').text('All members (' + data + ')')
      },
    })
  })

  if ((getCookie('email') !== undefined) &&
    (getCookie('idUser') !== undefined)) {
    onSecondForm()
  }
  else {
    onFirstForm()
  }

  $('#icons').hide()
})


