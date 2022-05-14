<script lang="ts">
	export let name: String
	import Disk from './components/Disk.svelte'
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<Disk color="blue" scale={0.2} stackPos={3}></Disk>
</main>

<style lang="scss">
	h1 {
		color: black;
	}
</style>

