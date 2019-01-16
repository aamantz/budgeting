<template>
	<div class="mb-5">
		<b-navbar toggleable type="light" variant="light">
			<b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
			<b-navbar-brand>Budgeting</b-navbar-brand>
			<b-collapse is-nav id="nav_text_collapse">
				<b-navbar-nav>
					<b-nav-item to="/">Dashboard</b-nav-item>
					<b-nav-item to="/budget">Budget</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
export default {
	
}
</script>
