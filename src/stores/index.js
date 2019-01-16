import Vue from "vue";
import Vuex from "vuex";
import persist from "vuex-persistedstate";
import BudgetStore from './Budget';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		persist({
			storage: {
				getItem: key => window.localStorage.getItem(key),
				setItem: (key, value) => window.localStorage.setItem(key, value),
				removeItem: key => window.localStorage.removeItem(key)
			}
		})
	],
	modules: {
		Budget: {
			...BudgetStore,
			namespaced: true
		}
	}
});