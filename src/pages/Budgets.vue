<template>
	<div class="container-fluid">
		<budget-tabs :budget_id="budget_id"/>
		<budget-list :budget_id="budget_id"/>
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
		private budget_id: string;

		constructor() {
			super();

			this.budget_id = "";
		}

		created() {
			console.log(this);
			this.budget_id = this.$route.params.budget_id;
		}
	}
</script>
 
<style>
</style>
