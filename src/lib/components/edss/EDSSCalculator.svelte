<script lang="ts">
	import { edssStore } from '$lib/stores/edss.svelte';
	import EDSSAssessmentForm from './EDSSAssessmentForm.svelte';
	import EDSSResults from './EDSSResults.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		edssStore.initialize();
	});
</script>

<div class="edss-calculator">
	<div class="card max-w-6xl mx-auto">
		<h1 class="text-3xl font-bold text-center mb-6 text-neuratos-blue-700 dark:text-neuratos-blue-300">
			EDSS - Kibővített Rokkantsági Állapot Skála
		</h1>

		<div class="alert-info mb-6">
			<h3 class="font-semibold text-lg mb-2">ℹ️ Az EDSS-ről</h3>
			<p class="text-sm">
				Az EDSS (Expanded Disability Status Scale) a sclerosis multiplex által okozott fogyatékosság
				mértékét értékelő standardizált skála, 0.0-tól (normális) 10.0-ig (halál SM miatt).
				Az értékelés 7 funkcionális rendszer (piramidális, cerebelláris, agytörzsi, szenzoros,
				hólyag-bél, vizuális, cerebrális) és a járóképesség alapján történik.
			</p>
		</div>

		{#if edssStore.currentMode === 'assessment'}
			<EDSSAssessmentForm />
		{:else if edssStore.currentMode === 'results'}
			<EDSSResults />
		{/if}
	</div>
</div>

<style>
	.edss-calculator {
		@apply min-h-screen bg-gradient-to-br from-neuratos-blue-50 to-white p-4;
	}

	.alert-info {
		@apply bg-neuratos-blue-100 border-l-4 border-neuratos-blue-500 p-4 rounded-r-lg;
	}
</style>
