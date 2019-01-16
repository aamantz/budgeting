<template>
	<div id="app" class="container-fluid">
		<Header></Header>
		<router-view />
	</div>
</template>

<script>
import Header from '@/components/Global/Header.vue';

export default {
	name: 'App',
	components: {
		Header
	}
}
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
