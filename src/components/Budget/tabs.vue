<template>
	<div>
		<b-nav tabs>
			<b-nav-item
				v-for="( budget, index ) in budgets"
				:key="index"
				:to="`/budgets/${budget.id}`"
				:active="budget.id == budgetId"
			>{{ budget.name }}</b-nav-item>
			<b-nav-item v-b-modal.AddNewBudget>Add New Budget</b-nav-item>
		</b-nav>
		<modal-new-budget/>
	</div>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";

	@Component({
		components: {
			ModalNewBudget: () => import("../Modals/NewBudget.vue")
		}
	})
	export default class BudgetTabs extends Vue {
		@Prop(String) private budgetId!: string;

		constructor() {
			super();
		}

		get budgets() {
			return this.$store.getters["Budgets/getBudgetNames"];
		}
	}
</script>
