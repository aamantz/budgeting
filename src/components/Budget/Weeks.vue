<template>
	<div :class="classes">
		<div v-for="(item, index) in budgetWeek" :key="index" class="row mb-3">
			<div class="col-md-3">
				<b-form-input type="text" v-model="budgetWeek[index].name" placeholder="Name"/>
			</div>
			<div class="col-md-6">
				
			</div>
			<div class="col-md-2">
				Total
			</div>
			<div class="col-md-1">
				<a href="#" @click.prevent="deleteItem(index)">
					<i class="fas fa-trash-alt" style="cursor: pointer;"></i>
				</a>
			</div>
		</div>
		<button type="button" @click="addItem()" class="btn btn-secondary">Add Week</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Budget, IBudgetItem, IBudgetWeek } from "@/common/Budget";

@Component({
	name: "Items"
})
export default class BudgetList extends Vue {
	@Prop({ default: "col-sm-12 col-md-6" }) private classes: any;
	@Prop(Object) private budget!: Budget;
	private budgetWeek: IBudgetWeek[];

	constructor() {
		super();

		this.budgetWeek = [
			{
				name: "",
				items: []
			}
		];
	}

	@Watch("budgetWeek", { deep: true })
	private watchBudgetItem(newValue: IBudgetItem[], oldValue: IBudgetItem[]) {
		const budget = this.budget;

		budget.weeks = this.budgetWeek;

		this.$emit("update:budget", budget);
	}

	private created() {
		if ("weeks" in this.budget) {
			this.budgetWeek = this.budget.weeks;
		} else {
			this.budgetWeek = [];
		}
	}

	private addItem() {
		const item: IBudgetWeek = {
			name: "",
			items: []
		};

		this.budgetWeek.push(item);
	}

	private formatAmount(value: string) {
		return parseFloat(value).toFixed(2);
	}

	private deleteItem(index: number) {
		// @ts-ignore
		this.budgetItem = this.budgetItem.filter(
			(budget: IBudgetItem, i: number) => index !== i
		);
	}
}
</script>

