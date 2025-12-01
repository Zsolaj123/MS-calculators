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
	<div class="edss-card">
		<div class="card-header">
			<h1 class="card-title">
				🎯 EDSS - Kibővített Rokkantsági Állapot Skála
			</h1>
			<p class="card-subtitle">Expanded Disability Status Scale</p>
		</div>

		<div class="alert-info">
			<div class="alert-icon">ℹ️</div>
			<div class="alert-content">
				<h3 class="alert-title">Az EDSS-ről</h3>
				<p class="alert-text">
					Az EDSS (Expanded Disability Status Scale) a sclerosis multiplex által okozott fogyatékosság
					mértékét értékelő standardizált skála, 0.0-tól (normális) 10.0-ig (halál SM miatt).
					Az értékelés 7 funkcionális rendszer (piramidális, cerebelláris, agytörzsi, szenzoros,
					hólyag-bél, vizuális, cerebrális) és a járóképesség alapján történik.
				</p>
			</div>
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
		min-height: 100vh;
		padding: 1.5rem;
		background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
	}

	.edss-card {
		max-width: 72rem;
		margin: 0 auto;
		padding: 2rem;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 3px solid #32303e;
		border-radius: 16px;
	}

	.card-header {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #32303e;
	}

	.card-title {
		font-size: 1.875rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 0.5rem;
	}

	.card-subtitle {
		font-size: 0.875rem;
		color: #808090;
	}

	.alert-info {
		display: flex;
		gap: 1rem;
		padding: 1.25rem;
		background: rgba(59, 130, 246, 0.1);
		border: 2px solid rgba(59, 130, 246, 0.3);
		border-radius: 12px;
		margin-bottom: 2rem;
	}

	.alert-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.alert-content {
		flex: 1;
	}

	.alert-title {
		font-size: 1rem;
		font-weight: 600;
		color: #3b82f6;
		margin-bottom: 0.5rem;
	}

	.alert-text {
		font-size: 0.875rem;
		color: #a0a0b0;
		line-height: 1.6;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.edss-calculator {
			padding: 1rem;
		}

		.edss-card {
			padding: 1rem;
			border-radius: 12px;
		}

		.card-title {
			font-size: 1.5rem;
		}

		.alert-info {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
