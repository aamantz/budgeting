<template>
	<div></div>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";

	@Component({
		props: ["budget_id"]
	})
	export default class BudgetList extends Vue {
		@Prop(String) private budget_id!: string;

		constructor() {
			super();
		}

		get budget() {
			return this.$store.getters["Budgets/getBudget"](this.budget_id);
		}
	}
</script>

