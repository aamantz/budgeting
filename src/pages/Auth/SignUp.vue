<template>
	<div class="container">
		<b-alert variant="danger" :show="error != '' ? true : false">{{ error }}</b-alert>
		<b-form @submit.prevent="doSignUp()" class="w-50 m-auto">
			<b-card no-body>
				<h4 slot="header">Sign Up</h4>
				<b-card-body>
					<b-form-group id="email_address" label="Email Address:" label-for="email_address">
						<b-form-input
							id="email_address"
							type="email"
							v-model="form.email_address"
							required
							placeholder="Enter email address"
						/>
					</b-form-group>

					<b-form-group id="password" label="Password:" label-for="password">
						<b-form-input
							id="password"
							type="password"
							v-model="form.password"
							required
							placeholder="Enter password"
						/>
					</b-form-group>

					<b-form-group id="first_name" label="First Name:" label-for="first_name">
						<b-form-input
							id="first_name"
							type="text"
							v-model="form.first_name"
							required
							placeholder="Enter first name"
						/>
					</b-form-group>

					<b-form-group id="last_name" label="Last Name:" label-for="last_name">
						<b-form-input
							id="last_name"
							type="text"
							v-model="form.last_name"
							required
							placeholder="Enter last name"
						/>
					</b-form-group>
				</b-card-body>
				<b-card-footer>
					<b-button type="submit" variant="primary" class="float-right">Sign Up</b-button>
					<b-button type="button" :to="{ name: 'login' }" variant="secondary">Back to Login</b-button>
				</b-card-footer>
			</b-card>
		</b-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { ISignUpFields } from "../../common/Auth.d";

@Component({
	name: "SignUp"
})
export default class SignUp extends Vue {
	@Action("doSignUp", { namespace: "Auth" }) private signup: any;
	private form: ISignUpFields;
	private error: string;

	constructor() {
		super();

		this.error = "";
		this.form = {
			password: "",
			email_address: "",
			first_name: "",
			last_name: ""
		};
	}

	private async doSignUp() {
		this.error = "";

		try {
			const trySignUp = await this.signup(this.form);
		} catch (e) {
			this.error = e;
		}
	}
}
</script>
