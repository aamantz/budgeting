<template>
	<div>
		<b-nav tabs>
			<b-nav-item
				v-for="( budget, index ) in budgets"
				:key="index"
				:to="`/budgets/${budget.id}`"
				:active="budget.id == budget_id"
			>{{ budget.name }}</b-nav-item>
			<b-nav-item v-b-modal.AddNewBudget>Add New Budget</b-nav-item>
		</b-nav>
		<modal-new-budget/>
	</div>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";

	@Component({
		props: ["budget_id"],
		components: {
			ModalNewBudget: () => import("../Modals/NewBudget.vue")
		}
	})
	export default class BudgetTabs extends Vue {
		@Prop(String) private budget_id!: string;

		constructor() {
			super();
		}

		get budgets() {
			return this.$store.getters["Budgets/getBudgetNames"];
		}
	}
</script>
