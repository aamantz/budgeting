<template>
	<div class="container">
		<b-alert variant="danger" :show="error != '' ? true : false">{{ error }}</b-alert>
		<b-form @submit.prevent="doLogin()">
			<b-form-group id="emailAddress" label="Username:" label-for="emailAddress">
				<b-form-input
					id="emailAddress"
					type="text"
					v-model="form.username"
					required
					placeholder="Enter username"
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
	username: string;
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
			username: "",
			password: ""
		};
	}

	private async doLogin() {
		this.error = "";

		try {
			const tryLogin = await this.login(this.form);
		} catch (e) {
			this.error = e;
		}
	}
}
</script>