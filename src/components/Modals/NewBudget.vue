<template>
	<b-modal
		id="AddNewBudget"
		title="Add New Budget"
		:lazy="true"
		@hidden="resetComponent()"
		ref="AddNewBudget"
	>
		<b-form-input v-model="name" type="text" placeholder="Budget Name" class="budget-name"></b-form-input>
		<div slot="modal-footer">
			<b-button variant="secondary" @click="$refs.AddNewBudget.hide()">Close</b-button>&nbsp;
			<b-button variant="primary" @click="addBudget()">Add</b-button>
		</div>
	</b-modal>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";

	@Component({
		name: "ModalNewBudget"
	})
	export default class Tabs extends Vue {
		private name = "";

		constructor() {
			super();
		}

		/**
		 * Reset component back to it's original state
		 */
		private resetComponent() {
			this.name = "";
		}

		/**
		 * Add the Budget to our state
		 */
		private addBudget() {
			if (this.name.trim() === "") {
				return;
			}

			this.$store.commit("Budgets/addBudget", { name: this.name });

			// @ts-ignore
			this.$refs.AddNewBudget.hide();
		}
	}
</script>