<script lang="ts">
	import { sdmtStore } from '$lib/stores/sdmt.svelte';
	import SDMTDemographics from './SDMTDemographics.svelte';
	import SDMTTest from './SDMTTest.svelte';
	import SDMTKey from './SDMTKey.svelte';
	import SDMTResults from './SDMTResults.svelte';
	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		sdmtStore.initialize();
	});

	onDestroy(() => {
		sdmtStore.cleanup();
	});
</script>

<div class="sdmt-calculator">
	<div class="card max-w-4xl mx-auto">
		<h1 class="text-3xl font-bold text-center mb-6 text-neuratos-blue-700">
			SDMT - Szimbólum-Digit Módosított Teszt
		</h1>

		{#if sdmtStore.currentMode === 'demographics'}
			<SDMTDemographics />
		{:else if sdmtStore.currentMode === 'practice' || sdmtStore.currentMode === 'test'}
			<div class="space-y-6">
				<!-- Symbol-Digit Key (Sticky at top) -->
				<div class="sticky top-0 z-10 bg-white border-b-2 border-neuratos-blue-200 pb-4">
					<SDMTKey />
				</div>

				<!-- Test Area -->
				<SDMTTest />
			</div>
		{:else if sdmtStore.currentMode === 'results'}
			<SDMTResults />
		{/if}
	</div>
</div>

<style>
	.sdmt-calculator {
		@apply min-h-screen bg-gradient-to-br from-neuratos-blue-50 to-white p-4;
	}
</style>
