<template>
	<div id="app">
		<Header/>
		<router-view :key="$route.fullPath" />
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";

	// Components
	import Header from "./components/Global/Header.vue";

	@Component({
		components: {
			Header
		}
	})
	export default class App extends Vue {
		constructor() {
			super();
		}
	}
</script>


<style lang="scss">
</style>
