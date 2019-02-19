<template>
	<div class="container-fluid">
		<budget-tabs :budgetId="budgetId"/>
		<budget-list :budgetId="budgetId"/>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";

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
		private budgetId: string;

		constructor() {
			super();

			this.budgetId = "";
		}

		private created() {
			this.budgetId = this.$route.params.budget_id;
		}
	}
</script>
 
<style>
</style>
