<template>
	<div>
		<div class="row">
			<div class="col-sm-12 col-md-3">
				<b-form-input 
					v-model="label"
					type="text"
					placeholder="New Budget"></b-form-input>
			</div>
			<div class="col-sm-12 col-md-3">
				<b-button @click="setNewBudget( label );label = ''">Add Budet</b-button>
			</div>
		</div>
		<div class="row">
			<b-nav>
				<b-nav-item v-for="( budget, index ) in getBudgets" :key="index" @click="$emit('update:id', budget.id)">
					{{ budget.label }}
				</b-nav-item>
			</b-nav>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'TabsBudget',
	props: [ 'budget_id' ],
	data() {
		return {
			label: ''
		}
	},
	computed: {
		...mapGetters( 'Budget', [
			'getBudgets'
		] )
	},
	methods: {
		...mapActions( {
			'setNewBudget': 'Budget/setNewBudget'
		} )
	},
}
</script>
