import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: () =>
				import(/* webpackChunkName: "Home" */ "../pages/Home.vue"),
			meta: {
				auth: true
			}
		},
		{
			path: "/budgets/:budget_id?",
			name: "budgets",
			component: () =>
				import(/* webpackChunkName: "Budgets" */ "../pages/Budgets.vue"),
			meta: {
				auth: true
			}
		},
		{
			name: "login",
			path: "/login",
			component: () =>
				import(/* webpackChunkName: "Login" */ "../pages/Auth/Login.vue")
		},
		{
			name: "signup",
			path: "/signup",
			component: () =>
				import(/* webpackChunkName: "SignUp" */ "../pages/Auth/SignUp.vue")
		}
	]
});
