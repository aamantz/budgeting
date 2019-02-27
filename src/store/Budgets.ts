import axios from "axios";
import { Budget } from '@/common/Budget';

interface StateObject {
	budgets: Budget[];
}

const state: StateObject = {
	budgets: []
};

const getters = {
	getBudgetNames: (s: StateObject) =>
		s.budgets.map((budget: Budget) => {
			return {
				id: budget._id,
				name: budget.name
			};
		}),
	getBudget: (s: StateObject) => (id: string) =>
		s.budgets.find(budget => budget._id === id)
};

const mutations = {
	addBudget: (s: StateObject, payload: { name: string }) => {
		return new Promise(async (resolve, reject) => {
			const { name } = payload;

			try {
				const addBudget = await axios.post("/api/budgets", {
					name
				});

				s.budgets = addBudget.data.budgets;
			} catch (e) {
				reject(e.response.data);
			}
		});
	},
	setBudgets(s: StateObject, payload: any) {
		s.budgets = payload;
	}
};

const actions = {
	async getBudgets({ commit }: any) {
		return new Promise(async (resolve, reject) => {
			try {
				const allBudgets = await axios.get("/api/budgets");

				commit("setBudgets", allBudgets.data);
				resolve();
			} catch (e) {
				reject(e.response.data);
			}
		});
	}
};

export { state, getters, mutations, actions };
