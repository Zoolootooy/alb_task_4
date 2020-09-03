<form v-if="seen2" id="second" name="second" method="post"
      enctype="multipart/form-data">
	<div class="row">
		<div class="col-12 ">
			<h4 class="text-center mb-5">Tell us about you, {{firstName}}
				{{lastName}}</h4>
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
		<div class="row">
			<div class="col-12 mb-3">
				<error-message v-bind:text="errorCompanyText"
				               v-if="errorCompany">
				</error-message>
			</div>
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

		<div class="row">
			<div class="col-12 mb-3">
				<error-message v-bind:text="errorPositionText"
				               v-if="errorPosition">
				</error-message>
			</div>
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

		<div class="row">
			<div class="col-12 mb-3">
				<error-message v-bind:text="errorAboutText"
				               v-if="errorAbout">
				</error-message>
			</div>
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
		<div class="col-12 col-md-4 offset-md-8 col-lg-2 offset-lg-10 text-right">
			<button
					class="btn btn-primary btn-lg btn-block shadow-sm"
					type="button"
					v-on:click="formSecondSubmit">
				Next
			</button>
		</div>
	</div>
</form>