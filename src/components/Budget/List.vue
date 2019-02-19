<template>
	<div></div>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";

	@Component
	export default class BudgetList extends Vue {
		@Prop(String) private budgetId!: string;

		constructor() {
			super();
		}

		get budget() {
			return this.$store.getters["Budgets/getBudget"](this.budgetId);
		}
	}
</script>

