<template>
	<div class="container">
		<b-alert variant="danger" :show="error != '' ? true : false">{{ error }}</b-alert>
		<b-form @submit.prevent="doLogin()">
			<b-form-group id="emailAddress" label="Email Address:" label-for="emailAddress">
				<b-form-input
					id="emailAddress"
					type="text"
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

			<b-button type="submit" variant="primary">Submit</b-button>
		</b-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

interface ILoginFields {
	email_address: string;
	password: string;
}

@Component({
	name: "Login"
})
export default class Login extends Vue {
	@Action("doLogin", { namespace: "Auth" }) private login: any;
	private error: string;
	private form: ILoginFields;

	constructor() {
		super();

		this.error = "";
		this.form = {
			email_address: "",
			password: ""
		};
	}

	private async doLogin() {
		this.error = "";

		try {
			const tryLogin = await this.login(this.form);
			window.isLoggedIn = true;

			this.$router.push({
				name: "home"
			});
		} catch (e) {
			this.error = e;
		}
	}
}
</script>