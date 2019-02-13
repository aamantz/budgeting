import Vue from 'vue';
import Vuex from 'vuex';

import * as Misc from './Misc';
import * as Budgets from './Budgets';

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
		}
	}
});
