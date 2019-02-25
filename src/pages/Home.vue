<template>
	<div>Home</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Home extends Vue {
	constructor() {
		super();
	}

	private async created() {
		try {
			const api = await axios.post("/api/");
		} catch (e) {
			// nothing
		}
	}
}
</script>
 
<style>
</style>
