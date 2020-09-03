Vue.component('phoneMask', {
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
                //true: value will be without mask
                //false: value will be with mask
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

Vue.component('errorMessage', {
    props: [
        'text'
    ],
    template: `
        <p style="color:red; margin-bottom: 0">{{ text }}</p>
    `,
})

var app = new Vue({
    el: '#app',
    data: {
        seen1: true,
        seen2: false,
        seen3: false,

        firstName: '',
        lastName: '',
        date: null,
        birthdate: '',
        repSubj: '',
        country: 0,
        phoneNumber: '',
        email: '',
        emailExists: true,
        company: '',
        position: '',
        about: '',
        photo: '',

        errorFirstNameText: '',
        errorFirstName: false,
        errorLastNameText: '',
        errorLastName: false,
        errorBirthdateText: '',
        errorBirthdate: false,
        errorRepSubjText: '',
        errorRepSubj: false,
        errorCountryText: '',
        errorCountry: false,
        errorPhoneText: '',
        errorPhone: false,
        errorEmailText: '',
        errorEmail: false,
        errorCompanyText: '',
        errorCompany: false,
        errorPositionText: '',
        errorPosition: false,
        errorAboutText: '',
        errorAbout: false,
        errorPhotoText: '',
        errorPhoto: false,

        countriesList: [],
        state: {
            disabledDates: {
                to: new Date(1920, 0, 1), // Disable all dates up to specific date
                from: new Date(2002, 11, 31), // Disable all dates after specific date
            }
        },
        openDate: new Date(2000, 0, 1),
        membersNumber: 0,
        shareConfig: '',
    },

    components: {
        vuejsDatepicker,
    },

    watch: {
        firstName: function (newName, oldName) {
            // this.checkField(this.firstName, "Firstname", this.errorFirstName, this.errorFirstNameText, 5, 10)
            this.checkFirstName(1, 100)
        },

        lastName: function (newName, oldName) {
            this.checkLastName(1, 255)
        },

        date: function (newDate, oldDate) {
            this.checkBirthdate()
            this.getDate()
        },

        repSubj: function (newRepSubj, oldRepSubj) {
            this.checkRepSubj(3, 20)
        },

        country: function (newCountry, oldCountry) {
            this.checkCountry()
        },

        phoneNumber: function (newPhone, oldPhone) {
            this.checkPhone()
        },

        email: function (newEmail, oldEmail) {
            this.checkEmail(1, 70)

        },

        company: function (newName, oldName) {
            this.checkCompany(70)
        },

        position: function (newPos, oldPos) {
            this.checkPosition(100)
        },

        about: function (newAbout, oldAbout) {
            this.checkAbout(21844)
        },

        photo: function (newPhoto, oldPhoto) {
            this.checkPhoto()
        },

    },

    created: function () {
        this.getCountriesList()
        this.getMembersNumber()
        this.getConfig()
        this.getCookies()

    },

    methods: {
        toForm1: function () {
            this.seen1 = true
            this.seen2 = false
            this.seen3 = false
        },

        toForm2: function () {
            this.seen1 = false
            this.seen2 = true
            this.seen3 = false
        },

        toForm3: function () {
            this.seen1 = false
            this.seen2 = false
            this.seen3 = true
        },

        getCountriesList() {
            axios.get('getCountries').then((response) => {
                this.countriesList = response.data
            })
        },

        getMember() {
            let formData = new FormData()
            formData.append('idUser', this.getCookie('idUser'))
            formData.append('emailUser', this.getCookie('email'))
            axios.post('getMember',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                if (response.data[0].company != null) {
                    this.company = response.data[0].company
                }
                if (response.data[0].position != null) {
                    this.position = response.data[0].position
                }
                if (response.data[0].about != null) {
                    this.about = response.data[0].about
                }
            })
        },

        getMembersNumber() {
            axios.post('getMembersNumber').then((response) => {
                this.membersNumber = response.data
            })
        },

        getConfig() {
            axios.post('getShareConfig').then((response) => {
                this.shareConfig = response.data
            })
        },

        getCookie (name) {
            let matches = document.cookie.match(new RegExp(
                '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)',
            ))
            return matches ? decodeURIComponent(matches[1]) : undefined
        },

        getCookies() {
            if ((this.getCookie('email') !== undefined) &&
                (this.getCookie('idUser') !== undefined)) {
                this.toForm2()
                this.getMember()
            }
            else {
               this.toForm1()
            }
        },

        updatePhone: function (phone) {
            this.phoneNumber = phone
        },

        formFirstSubmit() {
            this.checkFirstName(2, 100)
            this.checkLastName(2, 255)
            this.checkBirthdate()
            this.checkRepSubj(3, 20)
            this.checkCountry()
            this.checkPhone()
            this.checkEmail(1, 70)
            if (!this.checkErrors1()) {
                let formData = new FormData()
                formData.append('firstname', this.firstName.trim())
                formData.append('lastname', this.lastName.trim())
                formData.append('birthdate', this.birthdate.trim())
                formData.append('rep_subject', this.repSubj.trim())
                formData.append('country_id', this.country)
                formData.append('phone', this.phoneNumber.trim())
                formData.append('email', this.email.trim())
                axios.post('saveData',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                this.toForm2()
            }
        },

        formSecondSubmit() {
            this.checkCompany(70)
            this.checkPosition(100)
            this.checkAbout(21844)
            this.checkPhoto()
            if (!this.checkErrors2()) {
                let formData = new FormData()
                formData.append('company', this.company.trim())
                formData.append('position', this.position.trim())
                formData.append('about', this.about.trim())
                formData.append('photo', this.photo)


                axios.post('updateData',
                      formData,
                      {
                          headers: {
                              'Content-Type': 'multipart/form-data'
                          }
                      }
                )
                this.toForm3()
            }
        },

        newForm() {
            axios.get('newForm').then((response) => {
            })
            this.firstName = ''
            this.lastName = ''
            this.birthdate = ''
            this.repSubj = ''
            this.country = 0
            this.phoneNumber = ''
            this.email = ''
            this.company = ''
            this.position = ''
            this.about = ''
            this.photo = ''

            this.toForm1()
        },

        getDate() {
            let month, year, day
            if (this.date !== '') {
                let str = String(this.date)
                let result = str.match(/([a-zA-Z]){3}\s(\d){2}\s(\d){4}/)[0]
                month = result.match(/([a-zA-Z]){3}/)
                day = result.match(/([\d]){2}/)
                year = result.match(/([\d]){4}/)

                switch (month[0]) {
                    case 'Jan':
                        month = '01'
                        break

                    case 'Feb':
                        '02'
                        break
                        break

                    case 'Mar':
                        month = '03'
                        break
                        break

                    case 'Apr':
                        month = '04'
                        break
                        break

                    case 'May':
                        month = '05'
                        break
                        break

                    case 'Jun':
                        month = '06'
                        break
                        break

                    case 'Jul':
                        month = '07'
                        break
                        break

                    case 'Aug':
                        month = '08'
                        break
                        break

                    case 'Sep':
                        month = '09'
                        break
                        break

                    case 'Oct':
                        month = '10'
                        break
                        break

                    case 'Nov':
                        month = '11'
                        break
                        break

                    case 'Dec':
                        month = '12'
                        break
                }
                this.birthdate = year[0] + '-' + month + '-' + day[0]
            }
        },



        checkErrors1() {
            if (this.errorFirstName === true) {
                return true
            }
            if (this.errorLastName === true) {
                return true
            }
            if (this.errorBirthdate === true) {
                return true
            }
            if (this.errorRepSubj === true) {
                return true
            }
            if (this.errorCountry === true) {
                return true
            }
            if (this.errorPhone === true) {
                return true
            }
            if (this.errorEmail === true) {
                return true
            }
            return false
        },

        checkErrors2() {
            if (this.errorCompany === true) {
                return true
            }
            if (this.errorPosition === true) {
                return true
            }
            if (this.errorAbout === true) {
                return true
            }
            if (this.errorPhoto === true) {
                return true
            }
            return false
        },

        checkForSpaces(str){
            var re = /^\S{1,}.{0,}\S{1,}$/
            return re.test(str)
        },

        checkFirstName(min, max) {
            if (this.firstName.trim().length < min) {
                if (this.firstName.trim().length === 0) {
                    this.errorFirstName = true
                    this.errorFirstNameText = 'The "Firstname" field is required'
                } else {
                    this.errorFirstName = true
                    this.errorFirstNameText = 'The "Firstname" field must be at least ' + min + ' characters'
                }
            }
            if (this.firstName.trim().length >= min && this.firstName.trim().length <= max) {
                this.errorFirstName = false
                this.errorFirstNameText = ''
            }
            if (this.firstName.trim().length > max) {
                this.errorFirstName = true
                this.errorFirstNameText = 'Please enter no more than ' + max + ' characters.'
            }
        },

        checkLastName(min, max) {
            if (this.lastName.trim().length < min) {
                if (this.lastName.trim().length === 0) {
                    this.errorLastName = true
                    this.errorLastNameText = 'The "Lastname" field is required'
                } else {
                    this.errorLastName = true
                    this.errorLastNameText = 'The "Lastname" field must be at least ' + min + ' characters'
                }
            }
            if (this.lastName.trim().length >= min && this.lastName.trim().length <= max) {
                if (!this.checkForSpaces(this.lastName)){
                    this.errorLastName = true
                    this.errorLastNameText = 'Don\'t start or end "Lastname" field with space'
                } else {
                    this.errorLastName = false
                    this.errorLastNameText = ''
                }
            }
            if (this.lastName.trim().length > max) {
                this.errorLastName = true
                this.errorLastNameText = 'Please enter no more than ' + max + ' characters.'
            }
        },

        checkBirthdate() {
            if (this.date === null) {
                this.errorBirthdate = true
                this.errorBirthdateText = 'The "Birthdate" field is required'
            } else {
                this.errorBirthdate = false
                this.errorBirthdateText = ''
            }
        },

        checkRepSubj(min, max) {
            if (this.repSubj.trim().length < min) {
                if (this.repSubj.trim().length === 0) {
                    this.errorRepSubj = true
                    this.errorRepSubjText = 'The "Report subject" field is required'
                } else {
                    this.errorRepSubj = true
                    this.errorRepSubjText = 'The "Report subject" field must be at least ' + min + ' characters'
                }
            }
            if (this.repSubj.trim().length >= min && this.repSubj.trim().length <= max) {
                if (!this.checkForSpaces(this.repSubj)){
                    this.errorRepSubj = true
                    this.errorRepSubjText = 'Don\'t start or end "Report subject" field with space'
                } else {
                    this.errorRepSubj = false
                    this.errorRepSubjText = ''
                }
            }
            if (this.repSubj.trim().length > max) {
                this.errorRepSubj = true
                this.errorRepSubjText = 'Please enter no more than ' + max + ' characters.'
            }
        },

        checkCountry() {
            if (this.country === 0) {
                this.errorCountry = true
                this.errorCountryText = 'The "Country" field is required'
            } else {
                this.errorCountry = false
                this.errorCountryText = ''
            }
        },

        checkPhone() {
            if (this.phoneNumber.length === 0) {
                this.errorPhone = true
                this.errorPhoneText = 'The "Phone number" field is required'
            } else {
                if (!this.validPhone(this.phoneNumber)) {
                    this.errorPhone = true
                    this.errorPhoneText = 'Enter full phone number'
                } else {
                    this.errorPhone = false
                    this.errorPhoneText = ''
                }
            }

        },

        validPhone: function (phone) {
            var re = /\+[0-9,\-, ,(,)]+$/
            return re.test(phone)
        },

        checkEmail(min, max) {
            if (this.email.length === 0) {
                this.errorEmail = true
                this.errorEmailText = 'The "Email" field is required'
            }
            if (this.email.length >= min && this.email.length <= max) {
                if (!this.validEmail(this.email)) {
                    this.errorEmail = true
                    this.errorEmailText = 'Please input correct email'
                } else {
                    this.checkEmailExist()
                    if (this.emailExists !== true) {
                        this.errorEmail = true
                        this.errorEmailText = 'This email is already exist'
                    } else {
                        this.errorEmail = false
                        this.errorEmailText = ''
                    }
                }
            }
            if (this.email.length > max) {
                this.errorEmail = true
                this.errorEmailText = 'Please enter no more than ' + max + ' characters.'
            }

        },

        checkEmailExist:function() {
            let formData = new FormData()
            formData.append('email', this.email)
            axios.post('checkEmail',
              formData,
              {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              }
            ).then((response) => {
                this.emailExists = response.data
                if (response.data == false){
                    this.errorEmail = true
                    this.errorEmailText = 'This email is already exist'
                } else {
                    this.errorEmail = false
                    this.errorEmailText = ''
                }
            })
        },

        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email)
        },


        handleFileUpload() {
            this.photo = this.$refs.file.files[0]
        },

        checkCompany(max) {

            if (this.company.length > 0 && this.company.length <= max) {
                this.errorCompany = false
            }
            if (this.company.length > max) {
                this.errorCompany = true
                this.errorCompanyText = 'Please enter no more than ' + max + ' characters'
            }
        },


        checkPosition(max) {
            if (this.position.length > 0 && this.position.length <= max) {
                this.errorPosition = false
            }
            if (this.position.length > max) {
                this.errorPosition = true
                this.errorPositionText = 'Please enter no more than ' + max + ' characters'
            }
        },

        checkAbout(max) {

            if (this.about.length > 0 && this.about.length <= max) {
                this.errorAbout = false
            }
            if (this.about.length > max) {
                this.errorAbout = true
                this.errorAboutText = 'Please enter no more than ' + max + ' characters'
            }
        },

        checkPhoto() {
            if (this.photo !== '') {
                let photoType = String(this.$refs.file.files[0].type)
                let photoSize = String(this.$refs.file.files[0].size)
                if ((photoType === 'image/jpeg') || (photoType === 'image/jpg') || (photoType === 'image/png') || (photoType === 'image/gif')) {
                    if (photoSize > 5 * 1024 * 1024) {
                        this.errorPhoto = true
                        this.errorPhotoText = 'File must be less then 5 Mb'
                    } else {
                        this.errorPhoto = false
                        this.errorPhotoText = ''
                    }
                } else {
                    this.errorPhoto = true
                    this.errorPhotoText = 'Only .png, .jpg, .jpeg, .gif files allowed'
                }
            }
        },
    }
})