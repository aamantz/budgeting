<template>
	<div>
		<budget-tabs :id.sync="budget_id" />
		<h1>{{ selectedBudget.label }}</h1>
		<div class="row">
			<div class="col-sm-12 col-md-6">
				<h3>Items to Budget</h3>
				<div class="row" v-for="( item, index ) in selectedBudget.items" :key="index">
					<div class="col-sm-12 col-md-4">
						{{ item.label }}
					</div>
					<div class="col-sm-12 col-md-4">
						${{ item.amount }}
					</div>
					<div class="col-sm-12 col-md-3">
						{{ item.due_date }}
					</div>
					<div class="col-sm-12 col-md-1">
						<font-awesome-icon icon="times" @click="removeItem( { id: selectedBudget.id, item_id: item.id } )" />
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12 col-md-4">
						<b-form-input 
							v-model="new_item.label"
							type="text"
							placeholder="Payment Title"></b-form-input>
					</div>
					<div class="col-sm-12 col-md-2">
						<b-form-input 
							v-model="new_item.amount"
							type="number"
							placeholder="Amount"></b-form-input>
					</div>
					<div class="col-sm-12 col-md-3">
						<b-form-input 
							v-model="new_item.due_date"
							type="date"
							placeholder="Payment Due Date"></b-form-input>
					</div>
					<div class="col-sm-12 col-md-3">
						<b-button @click="addPayment()">Add Payment</b-button>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-6">
				<h3>Weeks to Budget</h3>
				<div class="row" v-for="( budget, index ) in budgets" :key="index">
					<div class="col-sm-12 col-md-2">
						Week {{ index + 1 }}
					</div>
					<div class="col-sm-12 col-md-2">
						<b-form-input 
							v-model="budget.pay_amount"
							type="number"
							placeholder="Pay Amount"></b-form-input>
					</div>
					<div class="col-sm-12 col-md-4">
						<v-select :options="selectedBudget.items" title="budget" :multiple="true" v-model="budget.budget_items">
							<template slot="option" slot-scope="option">
								{{ option.label }} - ${{ option.amount }}
							</template>
							<template slot="selected-option" slot-scope="option">
								{{ option.label }}
							</template>
						</v-select>
					</div>
					<div class="col-sm-12 col-md-2">
						{{ calculateLeftover( budget.pay_amount, budget.budget_items ) }}
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<b-button @click="addWeek()">Add Week</b-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Components
import BudgetTabs from '@/components/Budget/Budgets_Tab.vue';

// Services
import uuid from 'uuid/v4';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Budget',
	components: {
		BudgetTabs
	},
	data () {
		return {
			new_item: {
				id: false,
				label: false,
				amount: false,
				due_date: false
			},
			budget_id: '',
			budgets: [],
			selectedBudget: {}
		}
	},
	computed: {
		...mapGetters( 'Budget', [
			'getBudgets'
		] )
	},
	watch: {
		budget_id() {
			this.selectedBudget = this.getBudgets.find( ( item ) => item.id == this.budget_id );
		}
	},
	methods: {
		...mapActions( {
			'setItems': 'Budget/setItems',
			'removeItem': 'Budget/removeItem'
		} ),
		addPayment () {
			this.new_item.id = uuid();
			//this.items.push( this.new_item );
			this.setItems( { id: this.budget_id, item: this.new_item } );

			this.new_item = {
				id: '',
				label: '',
				amount: '',
				due_date: ''
			}
		},
		addWeek() {
			this.budgets.push( {
				id: uuid(),
				pay_amount: '0.00',
				budget_items: []
			} );
		},
		calculateLeftover( pay_amount, budget_items ) {
			if( budget_items.length == 0 ) return pay_amount;

			return budget_items.reduce( ( total, item ) => {
				return total - Number( item.amount )
			}, pay_amount );
		}
	}
}
</script>
