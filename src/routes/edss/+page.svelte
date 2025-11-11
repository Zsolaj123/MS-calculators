<script lang="ts">
	import EDSSCalculator from '$lib/components/edss/EDSSCalculator.svelte';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>EDSS Calculator - Neuratos MS</title>
	<meta
		name="description"
		content="Kibővített Rokkantsági Állapot Skála (EDSS) - Multiple Sclerosis fogyatékosság értékelő eszköz"
	/>
</svelte:head>

<div class="page-container">
	<div class="page-header">
		<button onclick={() => goto('/')} class="back-button">
			← Vissza a főoldalra
		</button>
	</div>

	<EDSSCalculator />
</div>

<style>
	.page-container {
		@apply min-h-screen;
		@apply bg-gradient-to-br from-neuratos-blue-50 to-white;
		@apply dark:from-gray-900 dark:to-gray-800;
		@apply p-4;
	}

	.page-header {
		@apply max-w-6xl mx-auto mb-4;
	}

	.back-button {
		@apply px-4 py-2 rounded-lg;
		@apply bg-white dark:bg-gray-800;
		@apply text-gray-700 dark:text-gray-300;
		@apply border border-gray-300 dark:border-gray-600;
		@apply font-medium text-sm;
		@apply transition-all duration-200;
		@apply hover:bg-gray-50 dark:hover:bg-gray-700;
		@apply hover:shadow-md;
		@apply focus:outline-none focus:ring-2 focus:ring-neuratos-blue-500;
	}
</style>
