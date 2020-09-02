Vue.component('phone-mask', {
    template: `
  <div>
  <input id="phone"
           class="form-control shadow-sm"
           type="text" name="phone"
           placeholder="Phone number">
    <input type="checkbox" hidden id="phone_mask" checked>
    <label id="descr" for="phone_mask" hidden></label>
  </div>
  `,
    mounted: function () {
        var self = this
        // $(this.$el).datepicker({
        //   dateFormat: this.dateFormat,
        //   onSelect: function(date) {
        //     self.$emit('update-date', date);
        //   }
        // });

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
    },

})

var app = new Vue({
    el: '#app',
    data: {
        phone: null,

        seen1: false,
        seen2: false,
        seen3: false,

        errorPhoneText: '',
        errorPhone: false,
    },
    watch: {
        phone: function (newName, oldName) {
            this.validate()
        },
    },
    methods: {
        updatePhone: function (phone) {
            this.phone = phone
        },

        validate: function () {
            if (!this.validPhone(this.phone)) {
                this.errorPhone = true
                this.errorPhoneText = 'Enter full phone number'
            } else {
                this.errorPhone = false
                this.errorPhoneText = ''
            }
        },

        validPhone: function (phone) {
            var re = /\+[0-9,\-, ,(,)]+$/;
            return re.test(phone);
        },
    }
})
//Vue.use(VueTheMask)
//
Vue.component('errorMessage', {
    props: [
        'text'
    ],
    template: `
      <p style="color:red">{{ text }}</p>
    `,
})
//
// var app = new Vue({
//     el: '#app',
//     data: {
//         seen1: false,
//         seen2: false,
//         seen3: false,
//
//         firstName: '',
//         lastName: '',
//         date: '',
//         birthdate: '',
//         repSubj: '',
//         country: 0,
//         phoneNumber: '',
//         email: '',
//         emailExists: true,
//         company: '',
//         position: '',
//         about: '',
//         photo: '',
//
//         errorFirstNameText: '',
//         errorFirstName: false,
//         errorLastNameText: '',
//         errorLastName: false,
//         errorBirthdateText: '',
//         errorBirthdate: false,
//         errorRepSubjText: '',
//         errorRepSubj: false,
//         errorCountryText: '',
//         errorCountry: false,
//         errorPhoneText: '',
//         errorPhone: false,
//         errorEmailText: '',
//         errorEmail: false,
//         errorCompanyText: '',
//         errorCompany: false,
//         errorPositionText: '',
//         errorPosition: false,
//         errorAboutText: '',
//         errorAbout: false,
//         errorPhotoText: '',
//         errorPhoto: false,
//
//         countriesList: [],
//         state: {
//             disabledDates: {
//                 to: new Date(1920, 0, 1), // Disable all dates up to specific date
//                 from: new Date(2002, 11, 31), // Disable all dates after specific date
//             }
//         },
//         openDate: new Date(2000, 0, 1),
//         membersNumber: 0,
//         shareConfig: '',
//     },
//
//     components: {
//         vuejsDatepicker,
//     },
//
//     watch: {
//         firstName: function (newName, oldName) {
//             // this.checkField(this.firstName, "Firstname", this.errorFirstName, this.errorFirstNameText, 5, 10)
//             this.checkFirstName(1, 100)
//         },
//
//         lastName: function (newName, oldName) {
//             this.checkLastName(1, 255)
//         },
//
//         date: function (newDate, oldDate) {
//             this.checkBirthdate()
//             this.getDate()
//         },
//
//         repSubj: function (newRepSubj, oldRepSubj) {
//             this.checkRepSubj(3, 20)
//         },
//
//         country: function (newCountry, oldCountry) {
//             this.checkCountry()
//         },
//
//         phoneNumber: function (newPhone, oldPhone) {
//             this.checkPhone(10, 20)
//         },
//
//         email: function (newEmail, oldEmail) {
//             this.checkEmail(1, 70)
//
//         },
//
//         company: function (newName, oldName) {
//             this.checkCompany(70)
//         },
//
//         position: function (newPos, oldPos) {
//             this.checkPosition(100)
//         },
//
//         about: function (newAbout, oldAbout) {
//             this.checkAbout(21844)
//         },
//
//         photo: function (newPhoto, oldPhoto) {
//             this.checkPhoto()
//         },
//
//     },
//
//     created: function () {
//         this.getCountriesList()
//         this.getMembersNumber()
//         this.getConfig()
//     },
//
//     methods: {
//         toForm1: function () {
//             this.seen1 = true
//             this.seen2 = false
//             this.seen3 = false
//         },
//
//         toForm2: function () {
//             this.seen1 = false
//             this.seen2 = true
//             this.seen3 = false
//         },
//
//         toForm3: function () {
//             this.seen1 = false
//             this.seen2 = false
//             this.seen3 = true
//         },
//
//         getCountriesList() {
//             axios.get('getCountries').then((response) => {
//                 this.countriesList = response.data
//             })
//         },
//
//         getMembersNumber() {
//             axios.post('getMembersNumber').then((response) => {
//                 this.membersNumber = response.data
//             })
//         },
//
//         getConfig() {
//             axios.post('getShareConfig').then((response) => {
//                 this.shareConfig = response.data
//             })
//         },
//
//         formFirstSubmit() {
//             this.checkFirstName(1, 100)
//             this.checkLastName(1, 255)
//             this.checkBirthdate()
//             this.checkRepSubj(3, 20)
//             this.checkCountry()
//             this.checkPhone(10, 15)
//             this.checkEmail(1, 70)
//             if (!this.checkErrors1()) {
//                 alert("all done")
//                 let formData = new FormData();
//                 formData.append('firstname', this.firstName)
//                 formData.append('lastname', this.lastName)
//                 formData.append('birthdate', this.birthdate)
//                 formData.append('rep_subj', this.repSubj)
//                 formData.append('country_id', this.country)
//                 formData.append('phone', this.phoneNumber)
//                 formData.append('email', this.email)
//
//                 axios.post('/saveData',
//                     formData,
//                     {
//                         headers: {
//                             'Content-Type': 'multipart/form-data'
//                         }
//                     }
//                 ).then(function () {
//                     console.log('SUCCESS!!')
//                 }).catch(function () {
//                     console.log('FAILURE!!')
//                 })
//                 this.toForm2()
//             }
//         },
//
//         formSecondSubmit() {
//             this.checkCompany(70)
//             this.checkPosition(100)
//             this.checkAbout(21844)
//             this.checkPhoto()
//             if (!this.checkErrors2()) {
//                 alert("all done")
//                 let formData = new FormData();
//                 formData.append('company', this.company)
//                 formData.append('position', this.position)
//                 formData.append('about', this.about)
//                 formData.append('photo', this.photo)
//
//
//                 axios.post('/updateData',
//                     formData,
//                     {
//                         headers: {
//                             'Content-Type': 'multipart/form-data'
//                         }
//                     }
//                 ).then(function () {
//                     console.log('SUCCESS!!')
//                 }).catch(function () {
//                     console.log('FAILURE!!')
//                 })
//                 this.toForm3()
//             }
//         },
//
//
//         getDate() {
//             let month, year, day;
//             if (this.date !== '') {
//                 let str = String(this.date)
//                 let result = str.match(/([a-zA-Z]){3}\s(\d){2}\s(\d){4}/)[0]
//                 month = result.match(/([a-zA-Z]){3}/)
//                 day = result.match(/([\d]){2}/)
//                 year = result.match(/([\d]){4}/)
//
//                 switch (month[0]) {
//                     case 'Jan':
//                         month = '01'
//                         break
//
//                     case 'Feb':
//                         '02'
//                         break
//                         break
//
//                     case 'Mar':
//                         month = '03'
//                         break
//                         break
//
//                     case 'Apr':
//                         month = '04'
//                         break
//                         break
//
//                     case 'May':
//                         month = '05'
//                         break
//                         break
//
//                     case 'Jun':
//                         month = '06'
//                         break
//                         break
//
//                     case 'Jul':
//                         month = '07'
//                         break
//                         break
//
//                     case 'Aug':
//                         month = '08'
//                         break
//                         break
//
//                     case 'Sep':
//                         month = '09'
//                         break
//                         break
//
//                     case 'Oct':
//                         month = '10'
//                         break
//                         break
//
//                     case 'Nov':
//                         month = '11'
//                         break
//                         break
//
//                     case 'Dec':
//                         month = '12'
//                         break
//                 }
//                 this.birthdate = year[0] + '-' + month + '-' + day[0]
//             }
//         },
//
//         checkBirthdate() {
//             if (this.date === "") {
//                 this.errorBirthdate = true
//                 this.errorBirthdateText = 'The "Birthdate" field is required'
//             } else {
//                 this.errorBirthdate = false
//                 this.errorBirthdateText = ''
//             }
//         },
//
//         checkErrors1() {
//             if (this.errorFirstName === true) {
//                 return true
//             }
//             if (this.errorLastName === true) {
//                 return true
//             }
//             if (this.errorBirthdate === true) {
//                 return true
//             }
//             if (this.errorRepSubj === true) {
//                 return true
//             }
//             if (this.errorCountry === true) {
//                 return true
//             }
//             if (this.errorPhone === true) {
//                 return true
//             }
//             if (this.errorEmail === true) {
//                 return true
//             }
//             return false
//         },
//
//         checkErrors2() {
//             if (this.errorFirstName === true) {
//                 if (this.errorCompany === true) {
//                     return true
//                 }
//                 if (this.errorPhone === true) {
//                     return true
//                 }
//                 if (this.errorEmail === true) {
//                     return true
//                 }
//                 if (this.errorPhoto === true) {
//                     return true
//                 }
//                 return false
//             }
//         },
//
//         checkFirstName(min, max) {
//             if (this.firstName.length < min) {
//                 if (this.firstName.length === 0) {
//                     this.errorFirstName = true
//                     this.errorFirstNameText = 'The "Firstname" field is required'
//                 } else {
//                     this.errorFirstName = true
//                     this.errorFirstNameText = 'The "Firstname" field must be at least ' + min + ' characters'
//                 }
//             }
//             if (this.firstName.length >= min && this.firstName.length <= max) {
//                 this.errorFirstName = false
//             }
//             if (this.firstName.length > max) {
//                 this.errorFirstName = true
//                 this.errorFirstNameText = 'Please enter no more than ' + max + ' characters.'
//             }
//         },
//
//         checkLastName(min, max) {
//             if (this.lastName.length < min) {
//                 if (this.lastName.length === 0) {
//                     this.errorLastName = true
//                     this.errorLastNameText = 'The "Lastname" field is required'
//                 } else {
//                     this.errorLastName = true
//                     this.errorLastNameText = 'The "Lastname" field must be at least ' + min + ' characters'
//                 }
//             }
//             if (this.lastName.length >= min && this.lastName.length <= max) {
//                 this.errorLastName = false
//                 this.errorLastNameText = ''
//             }
//             if (this.lastName.length > max) {
//                 this.errorLastName = true
//                 this.errorLastNameText = 'Please enter no more than ' + max + ' characters.'
//             }
//
//         },
//
//         checkRepSubj(min, max) {
//             if (this.repSubj.length < min) {
//                 if (this.repSubj.length === 0) {
//                     this.errorRepSubj = true
//                     this.errorRepSubjText = 'The "Report subject" field is required'
//                 } else {
//                     this.errorRepSubj = true
//                     this.errorRepSubjText = 'The "Report subject" field must be at least ' + min + ' characters'
//                 }
//             }
//             if (this.repSubj.length >= min && this.repSubj.length <= max) {
//                 this.errorRepSubj = false
//                 this.errorRepSubjText = ''
//             }
//             if (this.repSubj.length > max) {
//                 this.errorRepSubj = true
//                 this.errorRepSubjText = 'Please enter no more than ' + max + ' characters.'
//             }
//         },
//
//         checkCountry() {
//             if (this.country === 0) {
//                 this.errorCountry = true
//                 this.errorCountryText = 'The "Country" field is required'
//             } else {
//                 this.errorCountry = false
//                 this.errorCountryText = ''
//             }
//         },
//
//         checkPhone(min, max) {
//             if (this.phoneNumber.length < min) {
//                 if (this.phoneNumber.length === 0) {
//                     this.errorPhone = true
//                     this.errorPhoneText = 'The "Phone number" field is required'
//                 } else {
//                     this.errorPhone = true
//                     this.errorPhoneText = 'The "Phone number" field must be at least ' + min + ' characters'
//                 }
//             }
//             if (this.phoneNumber.length >= min && this.phoneNumber.length <= max) {
//                 this.errorPhone = false
//                 this.errorPhoneText = ''
//             }
//             if (this.phoneNumber.length > max) {
//                 this.errorPhone = true
//                 this.errorPhoneText = 'Please enter no more than ' + max + ' characters.'
//             }
//         },
//
//         checkEmail(min, max) {
//             if (this.email.length === 0) {
//                 this.errorEmail = true
//                 this.errorEmailText = 'The "Email" field is required'
//             }
//             if (this.email.length >= min && this.email.length <= max) {
//                 if (!this.validEmail(this.email)) {
//                     this.errorEmail = true
//                     this.errorEmailText = 'Please input correct email'
//                 } else {
//                     this.checkEmailExist()
//                     if (this.emailExists !== true) {
//                         this.errorEmail = true
//                         this.errorEmailText = 'This email is already exist'
//                     } else {
//                         this.errorEmail = false
//                         this.errorEmailText = ''
//                     }
//                 }
//             }
//             if (this.email.length > max) {
//                 this.errorEmail = true
//                 this.errorEmailText = 'Please enter no more than ' + max + ' characters.'
//             }
//
//         },
//
//         checkEmailExist: function () {
//             console.log('111')
//             let formData = new FormData()
//             formData.append('email', this.email)
//             axios.post('checkEmail',
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             ).then((response) => {
//                 this.emailExists = response.data
//                 if (response.data == false) {
//                     this.errorEmail = true
//                     this.errorEmailText = 'This email is already exist'
//                 } else {
//                     this.errorEmail = false
//                     this.errorEmailText = ''
//                 }
//             })
//         },
//
//         validEmail: function (email) {
//             var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//             return re.test(email);
//         },
//
//
//         handleFileUpload() {
//             this.photo = this.$refs.file.files[0];
//         },
//
//         checkCompany(max) {
//
//             if (this.company.length > 0 && this.company.length <= max) {
//                 this.errorCompany = false
//             }
//             if (this.company.length > max) {
//                 this.errorCompany = true
//                 this.errorCompanyText = 'Please enter no more than ' + max + ' characters.'
//             }
//         },
//
//
//         checkPosition(max) {
//             if (this.position.length > 0 && this.position.length <= max) {
//                 this.errorPosition = false
//             }
//             if (this.position.length > max) {
//                 this.errorPosition = true
//                 this.errorPositionText = 'Please enter no more than ' + max + ' characters.'
//             }
//         },
//
//         checkAbout(max) {
//
//             if (this.about.length > 0 && this.about.length <= max) {
//                 this.errorAbout = false
//             }
//             if (this.about.length > max) {
//                 this.errorAbout = true
//                 this.errorAboutText = 'Please enter no more than ' + max + ' characters.'
//             }
//         },
//
//         checkPhoto() {
//             if (this.photo !== '') {
//                 let photoType = String(this.$refs.file.files[0].type)
//                 if ((photoType === 'image/jpeg') || (photoType === 'image/jpg') || (photoType === 'image/png') || (photoType === 'image/gif')) {
//                     this.errorPhoto = false
//                     this.errorPhotoText = ''
//                 } else {
//                     this.errorPhoto = true
//                     this.errorPhotoText = 'Only .png, .jpg, .jpeg, .gif files allowed'
//                 }
//             }
//
//         },
//     }
// })
//
//
