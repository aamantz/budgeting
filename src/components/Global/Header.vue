<template>
	<div class="mb-5">
		<b-navbar toggleable="lg" type="light" variant="light">
			<b-navbar-brand>Budgeting</b-navbar-brand>
			<b-navbar-toggle target="nav_text_collapse" v-if="isLoggedIn == true"></b-navbar-toggle>
			<b-collapse is-nav id="nav_text_collapse" v-if="isLoggedIn == true">
				<b-navbar-nav>
					<b-nav-item to="/">Dashboard</b-nav-item>
					<b-nav-item to="/budgets">Budgets</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
			<b-navbar-nav>
				<b-nav-item-dropdown right v-if="isLoggedIn == true">
					<template slot="button-content">Welcome Back, {{ User.first_name }} {{ User.last_name }}</template>
					<b-dropdown-item href="#">Profile</b-dropdown-item>
					<b-dropdown-item href="#">Signout</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class Header extends Vue {
	@Getter("getUser", { namespace: "Auth" }) private User: any;
	private isLoggedIn: boolean;

	constructor() {
		super();

		this.isLoggedIn = window.isLoggedIn;
	}
}
</script>