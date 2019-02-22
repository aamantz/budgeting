import Vue from 'vue';
import Vuex from 'vuex';

import * as Misc from './Misc';
import * as Budgets from './Budgets';
import * as Auth from './Auth';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		Misc: {
			namespaced: true,
			...Misc
		},
		Budgets: {
			namespaced: true,
			...Budgets
		},
		Auth: {
			namespaced: true,
			...Auth
		}
	}
});
