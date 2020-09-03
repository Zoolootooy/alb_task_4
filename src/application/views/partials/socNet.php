<div v-if="seen3" class="row">
	<div class="col-8 offset-2 text-center">
		<div id="icons">
			<div class="row mb-5">
				<div class="col-12">
					<a v-bind:href="'https://www.facebook.com/sharer/sharer.php?u='+shareConfig.link"
					   onclick="window.open(this.href, '', 'menubar=no,toolbar=no,resisable=yes,' +
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

					<button id="btnNextFirst"
					        class="btn btn-primary btn-lg btn-block shadow-sm "
					        v-on:click="newForm">
						Fill form again
					</button>
					</form>
				</div>
			</div>

		</div>
	</div>


</div>