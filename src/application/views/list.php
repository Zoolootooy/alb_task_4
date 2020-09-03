<?php require('partials/header.php'); ?>
<script type="module" src="public/vue/list.js"></script>

<div class="container">
    <div class="row">
        <div class="col-12" id="app">
            <div class="table-responsive">
                <table class="table table-striped table-bordered shadow-sm">
                    <thead>
                    <tr class="thead-dark text-center">
                        <th>№</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Report subject</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="(member, index) in membersList">
                            <td class="align-middle">{{index+1}}</td>
	                        <td class="td-photo" v-if="member.photo != null">
		                        <div class="box">
			                        <img class="profile-img rounded-circle" v-bind:src="'public/images/'+member.photo">
		                        </div>
	                        </td>
	                        <td class="td-photo" v-else>
		                        <div class="box">
			                        <img class="img rounded-circle" src="public/images/default.jpg">
		                        </div>

	                        </td>


                            <td class="align-middle mw-30">{{member.firstname}} {{member.lastname}}</td>
                            <td class="align-middle mw-30">{{member.rep_subject}}</td>
                            <td class="align-middle mw-20"><a v-bind:href="'mailto:'+member.email">{{member.email}}</a></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<?php require('partials/footer.php'); ?>
