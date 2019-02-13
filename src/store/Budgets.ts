import uuid from 'uuid/v4';

interface StateObject {
	budgets: Budget[];
}

interface Budget {
	id: string;
	name: string;
	items: object[];
	weeks: object[];
}

const state: StateObject = {
	budgets: []
};

const getters = {
	getBudgetNames: (s: StateObject) =>
		s.budgets.map((budget: Budget) => {
			return {
				id: budget.id,
				name: budget.name
			};
		}),
	getBudget: (s: StateObject) => (id: string) =>
		s.budgets.find(budget => budget.id === id)
};

const mutations = {
	addBudget: (s: StateObject, payload: { name: string }) => {
		const { name } = payload;

		const budget: Budget = {
			id: uuid(),
			name,
			items: [],
			weeks: []
		};

		s.budgets.push(budget);
	}
};

const actions = {};

export { state, getters, mutations, actions };
