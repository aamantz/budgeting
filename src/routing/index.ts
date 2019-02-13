import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: () =>
				import(/* webpackChunkName: "Home" */ '../pages/Home.vue')
		},
		{
			path: '/budgets/:budget_id?',
			name: 'budgets',
			component: () =>
				import(/* webpackChunkName: "Budgets" */ '../pages/Budgets.vue')
		}
	]
});
