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
		<div class="col-12 form-group mb-4">
			<label for="firstname">First name</label>
			<input id="firstname"
			       class="form-control shadow-sm"
			       type="text"
			       name="firstname"
			       placeholder="First name"
			       v-model="firstName">

			<div class="row">
				<div class="col-12">
					<error-message v-bind:text="errorFirstNameText"
					               v-if="errorFirstName">
					</error-message>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 form-group mb-4">
			<label for="lastname">Last name</label>
			<input id="lastname"
			       class="form-control shadow-sm"
			       type="text"
			       name="lastname"
			       placeholder="Lastname"
			       value=""

			       v-model="lastName">

			<div class="row">
				<div class="col-12">
					<error-message v-bind:text="errorLastNameText"
					               v-if="errorLastName">
					</error-message>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 form-group mb-4">
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
			<div class="row">
				<div class="col-12">
					<error-message v-bind:text="errorBirthdateText"
					               v-if="errorBirthdate">
					</error-message>
				</div>
			</div>
		</div>


	</div>

	<div class="row">
		<div class="col-12 form-group mb-4">
			<label for="rep_subj">Report subject</label>
			<input id="rep_subj"
			       class="form-control shadow-sm"
			       type="text"
			       name="rep_subj"
			       placeholder="Report subject"
			       v-model="repSubj">

			<div class="row">
				<div class="col-12">
					<error-message v-bind:text="errorRepSubjText"
					               v-if="errorRepSubj">
					</error-message>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 form-group mb-4">
			<label for="country_id">Choose county</label>
			<select id="country_id"
			        class="form-control shadow-sm"
			        name="country_id"
			        v-model="country">
				<option v-bind:value="0" disabled>Choose country</option>
				<option v-for="country in countriesList"
				        v-bind:value="country.id">{{ country.name}}
				</option>
			</select>

			<div class="row">
				<div class="col-12">
					<error-message v-bind:text="errorCountryText"
					               v-if="errorCountry">
					</error-message>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 form-group mb-4">
			<label for="phone">Phone number</label>
			<phone-mask @update-phone="updatePhone"></phone-mask>

			<div class="row">
				<div class="col-12">
					<error-message v-bind:text="errorPhoneText"
					               v-if="errorPhone">
					</error-message>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 form-group mb-4">
			<label for="email">Email</label>
			<input id="email"
			       class="form-control shadow-sm"
			       type="email"
			       name="email"
			       placeholder="Email"
			       value=""
			       v-model="email">

			<div class="row">
				<div class="col-12">
					<error-message v-bind:text="errorEmailText"
					               v-if="errorEmail">
					</error-message>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 col-md-4 offset-md-8 col-lg-2 offset-lg-10  text-right">
			<button
					class="btn btn-primary btn-lg btn-block shadow-sm"
					v-on:click="formFirstSubmit"
					type="button">
				Next
			</button>
		</div>
	</div>
</form>