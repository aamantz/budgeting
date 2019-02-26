<template>
	<div class="container-fluid">
		<budget-tabs :budgetId="budgetId"/>
		<budget-list :budgetId="budgetId"/>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import { Action } from 'vuex-class';

	// Components
	import BudgetTabs from "../components/Budget/tabs.vue";
	import BudgetList from "../components/Budget/List.vue";

	@Component({
		components: {
			BudgetTabs,
			BudgetList
		}
	})
	export default class Budgets extends Vue {
		@Action( 'getBudgets', { namespace: 'Budgets' } ) private getBudgets: any;

		private budgetId: string;

		constructor() {
			super();

			this.budgetId = "";
		}

		private async created() {
			this.budgetId = this.$route.params.budget_id;

			await this.getBudgets();
		}
	}
</script>
 
<style>
</style>
