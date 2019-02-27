<template>
	<div>
		<div v-for="(item, index) in budgetItem" :key="index" class="row">
			<div class="col-">
				<b-form-input type="text" v-model="budgetItem[index].name" placeholder="Name"/>
			</div>
			<div class="col-">
				<b-form-input type="number" step="0.01" :formatter="formatAmount" lazy-formatter v-model="budgetItem[index].amount" placeholder="Amount"/>
			</div>
			<div class="col-">
				<b-form-input type="date" v-model="budgetItem[index].date" placeholder="Date"/>
			</div>
			<div class="col-">
				<b-form-checkbox
					id="checkbox1"
					v-model="budgetItem[index].paid"
					:value="true"
					:unchecked-value="false"
				>Paid?</b-form-checkbox>
			</div>
		</div>
		<button @click="addItem()" class="btn btn-primary">Add Item</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Budget, IBudgetItem } from "@/common/Budget";

@Component({
	name: "Items"
})
export default class BudgetList extends Vue {
	@Prop(Object) private budget!: Budget;
	private budgetItem: IBudgetItem[];

	constructor() {
		super();

		this.budgetItem = [
			{
				name: "",
				amount: 0.00,
				date: "",
				paid: false
			}
		];
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
			amount: 0.00,
			date: "",
			paid: false
		};

		this.budgetItem.push(item);
	}

	private formatAmount( value: string ) {
		return parseFloat( value ).toFixed(2);
	}
}
</script>

