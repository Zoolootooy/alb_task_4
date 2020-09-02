<?php require('partials/header.php'); ?>
<script type="module" src="public/vue/abba.js"></script>

<div class="container">
  <div class="row">
    <div class="col-12 mb-5" id="app">


      <phone-mask @update-phone="updatePhone"></phone-mask>
      <div class="col-12 mb-3">
        <error-message v-bind:text="errorPhoneText"
                       v-if="errorPhone">
        </error-message>
      </div>

      <button class="btn btn-primary btn-lg btn-block shadow-sm mt-3"
              v-on:click="validate"
              type="button">
        Next
      </button>

      <form v-if="seen1" id="first" name="first" method="post"
            enctype="multipart/form-data">

        <div class="row">
          <div class="col-8 offset-2">
            <h4 class="text-center mb-5 mt-3 ">To participate in the conference,
              please fill out the
              form</h4>
          </div>
        </div>

        <div class="row">
          <div class="col-12  form-group ">
            <label for="firstname">First name</label>
            <input id="firstname"
                   class="form-control shadow-sm"
                   type="text"
                   name="firstname"
                   placeholder="First name"
                   value="" v-model="firstName">
          </div>

          <div class="col-12 mb-3">
            <error-message v-bind:text="errorFirstNameText"
                           v-if="errorFirstName">
            </error-message>
          </div>
        </div>

        <div class="row">
          <div class="col-12 form-group">
            <label for="lastname">Last name</label>
            <input id="lastname"
                   class="form-control shadow-sm"
                   type="text"
                   name="lastname"
                   placeholder="Lastname"
                   value=""

                   v-model="lastName">
          </div>

          <div class="col-12 mb-3">
            <error-message v-bind:text="errorLastNameText"
                           v-if="errorLastName">
            </error-message>
          </div>
        </div>

        <div class="row">
          <div class="col-12 form-group">
            <label for="lastname">Birth date</label>
            <vuejs-datepicker
                v-model="date"
                v-bind:open-date="openDate"
                v-bind:bootstrap-styling="true"
                calendar-class="form-group"
                format="yyyy-MM-dd"
                :disabled-dates="state.disabledDates"
            >
            </vuejs-datepicker>
          </div>

          <div class="col-12 mb-3">
            <error-message v-bind:text="errorBirthdateText"
                           v-if="errorBirthdate">
            </error-message>
          </div>
        </div>

        <div class="row">
          <div class="col-12 form-group">
            <label for="rep_subj">Report subject</label>
            <input id="rep_subj"
                   class="form-control shadow-sm"
                   type="text"
                   name="rep_subj"
                   placeholder="Report subject"
                   v-model="repSubj">
          </div>

          <div class="col-12 mb-3">
            <error-message v-bind:text="errorRepSubjText"
                           v-if="errorRepSubj">
            </error-message>
          </div>
        </div>

        <div class="row">
          <div class="col-12 form-group">
            <label for="country_id">Choose county</label>
            <select id="country_id"
                    class="form-control shadow-sm"
                    name="country_id"
                    v-model="country">
              <option v-bind:value="0"></option>
              <option v-for="country in countriesList"
                      v-bind:value="country.id">{{ country.name}}
              </option>
            </select>
          </div>

          <div class="col-12 mb-3">
            <error-message v-bind:text="errorCountryText"
                           v-if="errorCountry">
            </error-message>
          </div>
        </div>

        <div class="row">
          <div class="col-12 form-group">
            <label for="phone">Phone number</label>
            <input id="phone"
                   class="form-control shadow-sm"
                   type="text" name="phone"
                   placeholder="Phone number"

                   v-model="phoneNumber">
            <input type="checkbox" hidden id="phone_mask" checked>
            <label id="descr" for="phone_mask" hidden></label>

            <div class="col-12 mb-3">
              <error-message v-bind:text="errorPhoneText"
                             v-if="errorPhone">
              </error-message>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 form-group">
            <label for="email">Email</label>
            <input id="email"
                   class="form-control shadow-sm"
                   type="email"
                   name="email"
                   placeholder="Email"
                   value=""
                   v-model="email">
          </div>

          <div class="col-12 mb-3">
            <error-message v-bind:text="errorEmailText"
                           v-if="errorEmail">
            </error-message>
          </div>
        </div>

        <div class="row">
          <div
              class="col-12 col-md-4 offset-md-8 col-lg-2 offset-lg-10  text-right">
            <button
                class="btn btn-primary btn-lg btn-block shadow-sm"
                v-on:click="formFirstSubmit"
                type="button">
              Next
            </button>
          </div>
        </div>
      </form>

      <form v-if="seen2" id="second" name="second" method="post"
            enctype="multipart/form-data">
        <div class="row">
          <div class="col-12 ">
            <h4 class="text-center mb-5">Tell us about you.</h4>
          </div>
        </div>

        <div class="row">
          <div class="col-12  form-group">
            <label for="company">Company</label>
            <input id="company"
                   class="form-control shadow-sm"
                   type="text"
                   name="company"
                   placeholder="Company"
                   value=""
                   v-model="company">
          </div>

          <div class="col-12 mb-3">
            <error-message v-bind:text="errorCompanyText"
                           v-if="errorCompany">
            </error-message>
          </div>
        </div>

        <div class="row">
          <div class="col-12  form-group">
            <label for="position">Position</label>
            <input id="position"
                   class="form-control shadow-sm"
                   type="text"
                   name="position"
                   placeholder="Position"
                   value=""
                   v-model="position">
          </div>

          <div class="col-12 mb-3">
            <error-message v-bind:text="errorPositionText"
                           v-if="errorPosition">
            </error-message>
          </div>
        </div>

        <div class="row">
          <div class="col-12  form-group">
            <label for="about">About</label>
            <textarea id="about"
                      class="form-control shadow-sm"
                      name="about"
                      maxlength="21845"
                      rows="6"
                      placeholder="About Me"
                      v-model="about"></textarea>
          </div>

          <div class="col-12 mb-3">
            <error-message v-bind:text="errorAboutText"
                           v-if="errorAbout">
            </error-message>
          </div>
        </div>

        <div class="row">
          <div class="col-12 form-group">
            <div class="row">
              <div class="col-12">
                <label for="exampleFormControlFile1">Photo</label>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <input id="photo"
                       type="file"
                       ref="file"
                       name="photo"
                       v-on:change="handleFileUpload()"/>
              </div>
            </div>

            <div class="row">
              <div class="col-12 mb-3">
                <error-message v-bind:text="errorPhotoText"
                               v-if="errorPhoto">
                </error-message>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-4  col-lg-2  text-right">
            <button
                class="btn btn-primary btn-lg btn-block shadow-sm"
                type="button"
                v-on:click="formSecondSubmit">
              Back
            </button>
          </div>

          <div
              class="col-12 col-md-4 offset-md-4 col-lg-2 offset-lg-8 text-right">
            <button
                class="btn btn-primary btn-lg btn-block shadow-sm"
                type="submit"
                v-on:click="formSecondSubmit">
              Next
            </button>
          </div>
        </div>
      </form>

      <div v-if="seen3" class="row">
        <div class="col-8 offset-2 text-center">
          <div id="icons">
            <div class="row mb-5">
              <div class="col-12">
                <a v-bind:href="'https://www.facebook.com/sharer/sharer.php?u='+shareConfig.link"
                   onclick="window.open(this.href, '', 'menubar=no,toolbar=no, resisable=yes,' +
																							'scrollbars=yes,height=500,width=800');return false;"
                   class="fa fa-facebook mr-3"></a>
                <a v-bind:href="'https://twitter.com/share?url='+shareConfig.link+'&text='+shareConfig.text"
                   onclick="window.open(this.href, '', 'menubar=no,toolbar=no,resisable=yes,' +
																							'scrollbars=yes,height=500,width=800');return false;"
                   class="fa fa-twitter ml-3"></a>

              </div>
            </div>

            <div class="row">
              <div class="col-4 offset-4">
                <form action="/members_list" target="_blank" method="LINK">
                  <button id="btnList"
                          class="btn btn-primary btn-lg btn-block shadow-sm mb-3">
                    All members {{ membersNumber }}
                  </button>
                </form>

                <form action="/newForm" method="LINK">
                  <input id="btnNextFirst"
                         class="btn btn-primary btn-lg btn-block shadow-sm "
                         value="Fill form again"
                         type="submit">
                </form>
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
  </div>
</div>

<?php
require('partials/footer.php'); ?>


