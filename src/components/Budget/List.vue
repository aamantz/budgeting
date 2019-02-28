<template>
	<div :class="classes">
		<div class="form-row mb-2">
			<div class="col-4 font-weight-bold">Name</div>
			<div class="col-2 font-weight-bold">Amount</div>
			<div class="col-3 font-weight-bold">Date</div>
			<div class="col-2"></div>
			<div class="col-1"></div>
		</div>
		<div v-for="(item, index) in budgetItem" :key="index" class="form-row mb-3">
			<div class="col-4">
				<b-form-input size="sm" type="text" v-model="budgetItem[index].name" placeholder="Name"/>
			</div>
			<div class="col-2">
				<b-form-input
					size="sm"
					type="number"
					step="0.01"
					:formatter="formatAmount"
					lazy-formatter
					v-model="budgetItem[index].amount"
					placeholder="Amount"
				/>
			</div>
			<div class="col-3">
				<b-form-input size="sm" type="date" v-model="budgetItem[index].date" placeholder="Date"/>
			</div>
			<div class="col-2">
				<b-form-checkbox
					size="sm"
					:id="`checkbox${index}`"
					v-model="budgetItem[index].paid"
					:value="true"
					:unchecked-value="false"
				>Paid?</b-form-checkbox>
			</div>
			<div class="col-1">
				<a href="#" @click.prevent="deleteItem(index)">
					<i class="fas fa-trash-alt" style="cursor: pointer;"></i>
				</a>
			</div>
		</div>
		<button type="button" @click="addItem()" class="btn btn-secondary">Add Item</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Budget, IBudgetItem } from "@/common/Budget";

@Component({
	name: "Items"
})
export default class BudgetList extends Vue {
	@Prop({ default: "col-sm-12 col-md-6" }) private classes: any;
	@Prop(Object) private budget!: Budget;
	private budgetItem: IBudgetItem[];

	constructor() {
		super();

		this.budgetItem = [
			{
				name: "",
				amount: 0.0,
				date: "",
				paid: false
			}
		];
	}

	@Watch("budgetItem", { deep: true })
	private watchBudgetItem(newValue: IBudgetItem[], oldValue: IBudgetItem[]) {
		const budget = this.budget;

		budget.items = this.budgetItem;

		this.$emit("update:budget", budget);
	}

	private created() {
		if ("items" in this.budget) {
			this.budgetItem = this.budget.items;
		} else {
			this.budgetItem = [];
		}
	}

	private addItem() {
		const item: IBudgetItem = {
			name: "",
			amount: 0.0,
			date: "",
			paid: false
		};

		this.budgetItem.push(item);
	}

	private formatAmount(value: string) {
		return parseFloat(value).toFixed(2);
	}

	private deleteItem(index: number) {
		// @ts-ignore
		this.budgetItem = this.budgetItem.filter(
			(budget: IBudgetItem, i) => index !== i
		);
	}
}
</script>

