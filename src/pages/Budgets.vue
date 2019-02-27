<template>
	<div class="container-fluid">
		<budget-tabs :budgetId="budgetId"/>
		<budget-list v-if="!loading" :budget="budget"/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

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
	@Action("getBudgets", { namespace: "Budgets" }) private getBudgets: any;
	private loading: boolean;

	constructor() {
		super();

		this.loading = true;
	}

	get budgetId() {
		return this.$route.params.budget_id;
	}

	get budget() {
		return this.$store.getters["Budgets/getBudget"](this.budgetId);
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
