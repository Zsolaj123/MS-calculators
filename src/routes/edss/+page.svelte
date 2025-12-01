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
		min-height: 100vh;
		background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
	}

	.page-header {
		max-width: 72rem;
		margin: 0 auto;
		padding: 1rem 1.5rem;
	}

	.back-button {
		padding: 0.625rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #a0a0b0;
		background: #1a1a2e;
		border: 2px solid #32303e;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.15s ease;
		min-height: 40px;
	}

	.back-button:hover {
		border-color: #3b82f6;
		color: #3b82f6;
	}

	.back-button:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
	}
</style>
