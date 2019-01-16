import uuid from 'uuid/v4';

export default {
	state: {
		budgets: [],
	},
	getters: {
		getBudgets: ( state ) => state.budgets,
		getBudget: ( state ) => state.budget
	},
	mutations: {
		setItems: ( state, payload ) => {
			const findIndex = state.budgets.findIndex( ( item, index ) => item.id == payload.id );

			return state.budgets[findIndex].items.push( payload.item )
		},
		removeItem: ( state, {id, item_id} ) => {
			const findBudgetIndex = state.budgets.findIndex( ( item, index ) => item.id == id );
			const remove = state.budgets[findBudgetIndex].items.filter( ( item, index ) => item.id != item_id );

			var new_state = state;
			new_state.budgets[findBudgetIndex].items = remove;
			return new_state;
		},
		setBudget: ( state, payload ) => state.budget.push( payload ),
		setNewBudget: ( state, payload ) => state.budgets.push( payload )
	},
	actions: {
		removeItem: ( { commit }, payload ) => {
			commit( 'removeItem', payload );
		},
		/**
		 * Set Budget Items only if there isn't a false or empty value.
		 */
		setItems: ( { commit }, { item, id } ) => {
			let isEmpty = false;
			Object.keys( item ).map( i => {
				if( typeof item[i] == 'String' ) {
					var it = item[i].trim();
				} else {
					var it = item[i];
				}

				if( it == false || it == 'false' || it == '' ) {
					isEmpty = true;
				}

				return i;
			} );

			if( isEmpty ) return;


			commit( 'setItems', {
				id: id,
				item: item 
			} );
		},
		setNewBudget: ( { commit }, label ) => {
			if( label.trim() == '' ) return;

			commit( 'setNewBudget', {
				id: uuid(),
				label: label.trim(),
				budget: [],
				items: []
			} )
		},
		/**
		 * Set Weeks for weekly budget
		 */
		setWeeklyBudget: ( { commit }, week ) => {
	
		}
	},
}