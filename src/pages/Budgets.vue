<template>
	<div class="container-fluid">
		<budget-tabs :budgetId="budgetId"/>
		<form @submit.prevent="saveBudget()">
			<div class="row mt-3 mb-3">
				<budget-list v-if="!loading" :budget.sync="budget"/>
				<budget-weeks v-if="!loading" :budget.sync="budget"/>
			</div>
			<button type="submit" class="btn btn-primary">Save Budget</button>
		</form>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

// Components
import BudgetTabs from "../components/Budget/tabs.vue";
import BudgetList from "../components/Budget/List.vue";
import BudgetWeeks from '../components/Budget/Weeks.vue';
import { Budget } from '@/common/Budget';

@Component({
	components: {
		BudgetTabs,
		BudgetList,
		BudgetWeeks
	}
})
export default class Budgets extends Vue {
	@Action("getBudgets", { namespace: "Budgets" }) private getBudgets: any;
	@Action( 'saveBudget', { namespace: 'Budgets' } ) private updateBudget: any;
	@Getter( 'getBudget', { namespace: 'Budgets' } ) private getBudget: any;
	private loading: boolean;

	constructor() {
		super();

		this.loading = true;
	}

	get budgetId() {
		return this.$route.params.budget_id;
	}

	get budget() {
		console.log( this.getBudget(this.budgetId) );
		return this.getBudget(this.budgetId);
	}

	set budget( newValue: Budget ) {
		// By having this here, we don't get a js error
	}

	private async saveBudget() {
		console.log( this.budget );
		await this.updateBudget( this.budget );
	}

	private async created() {
		try {
			await this.getBudgets();
			this.loading = false;
		} catch (e) {
			// Yo
		}
	}
}
</script>
 
<style>
</style>
