<script lang="ts">
	import { edssStore } from '$lib/stores/edss.svelte';

	let score = $derived(edssStore.score);
	let interpretation = $derived(edssStore.interpretation);
	let severityCategory = $derived(edssStore.severityCategory);
	let functionalSystems = $derived(edssStore.functionalSystems);
	let ambulation = $derived(edssStore.ambulation);

	// Get color classes based on severity
	const colorClasses = $derived.by(() => {
		if (!severityCategory) return 'bg-gray-100 text-gray-800';

		const colorMap: Record<string, string> = {
			green: 'bg-green-100 text-green-800 border-green-500',
			blue: 'bg-blue-100 text-blue-800 border-blue-500',
			yellow: 'bg-yellow-100 text-yellow-800 border-yellow-500',
			orange: 'bg-orange-100 text-orange-800 border-orange-500',
			red: 'bg-red-100 text-red-800 border-red-500',
			gray: 'bg-gray-100 text-gray-800 border-gray-500'
		};

		return colorMap[severityCategory.color] || 'bg-gray-100 text-gray-800';
	});

	// Get severity icon
	const severityIcon = $derived.by(() => {
		if (!severityCategory) return '📊';
		if (severityCategory.color === 'green') return '✅';
		if (severityCategory.color === 'blue') return 'ℹ️';
		if (severityCategory.color === 'yellow') return '⚠️';
		if (severityCategory.color === 'orange') return '🔶';
		if (severityCategory.color === 'red') return '🔴';
		return '⚫';
	});

	function handleNewAssessment() {
		edssStore.reset();
	}

	function handleExport() {
		const data = edssStore.exportData();
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `edss-results-${Date.now()}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}

	function handleBackToAssessment() {
		edssStore.goToAssessment();
	}
</script>

<div class="edss-results-container">
	<div class="results-header mb-8">
		<h2 class="text-3xl font-bold text-center mb-2 text-neuratos-blue-700 dark:text-neuratos-blue-300">
			📊 EDSS Eredmény
		</h2>
		<p class="text-center text-gray-600 dark:text-gray-400">
			A beteg jelenlegi fogyatékossági állapotának értékelése
		</p>
	</div>

	<!-- Score Display -->
	<div class="score-card mb-6">
		<div class="score-display">
			<div class="score-label">EDSS Pontszám</div>
			<div class="score-value">
				{score?.toFixed(1)}
			</div>
		</div>

		{#if severityCategory}
			<div class="severity-badge {colorClasses}">
				<span class="text-3xl mr-2">{severityIcon}</span>
				<div>
					<div class="font-bold text-lg">{severityCategory.label}</div>
					<div class="text-sm opacity-90">{severityCategory.description}</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Interpretation -->
	{#if interpretation}
		<div class="interpretation-card mb-6">
			<h3 class="text-xl font-semibold mb-3 text-neuratos-blue-700 dark:text-neuratos-blue-300">
				📋 Értelmezés
			</h3>
			<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
				{interpretation}
			</p>
		</div>
	{/if}

	<!-- Functional Systems Summary -->
	<div class="summary-card mb-6">
		<h3 class="text-xl font-semibold mb-4 text-neuratos-blue-700 dark:text-neuratos-blue-300">
			🔍 Funkcionális Rendszerek Összefoglalója
		</h3>
		<div class="systems-grid">
			<div class="system-item">
				<span class="system-label">💪 Piramidális:</span>
				<span class="system-value">{functionalSystems.pyramidal}</span>
			</div>
			<div class="system-item">
				<span class="system-label">⚖️ Cerebelláris:</span>
				<span class="system-value">{functionalSystems.cerebellar}</span>
			</div>
			<div class="system-item">
				<span class="system-label">🧠 Agytörzsi:</span>
				<span class="system-value">{functionalSystems.brainstem}</span>
			</div>
			<div class="system-item">
				<span class="system-label">👋 Szenzoros:</span>
				<span class="system-value">{functionalSystems.sensory}</span>
			</div>
			<div class="system-item">
				<span class="system-label">🚽 Hólyag-bél:</span>
				<span class="system-value">{functionalSystems.bowelBladder}</span>
			</div>
			<div class="system-item">
				<span class="system-label">👁️ Vizuális:</span>
				<span class="system-value">{functionalSystems.visual}</span>
			</div>
			<div class="system-item">
				<span class="system-label">🤔 Cerebrális:</span>
				<span class="system-value">{functionalSystems.cerebral}</span>
			</div>
			<div class="system-item ambulation-item">
				<span class="system-label">🚶 Járóképesség:</span>
				<span class="system-value">{ambulation}</span>
			</div>
		</div>
	</div>

	<!-- Reference Note -->
	<div class="reference-note mb-8">
		<p class="text-xs text-gray-500 dark:text-gray-400">
			📚 Referencia: Kurtzke JF. Rating neurologic impairment in multiple sclerosis: an expanded
			disability status scale (EDSS). Neurology. 1983;33(11):1444-52.
		</p>
	</div>

	<!-- Action Buttons -->
	<div class="action-buttons">
		<button onclick={handleBackToAssessment} class="btn btn-secondary flex-1">
			✏️ Értékelés módosítása
		</button>
		<button onclick={handleNewAssessment} class="btn btn-secondary flex-1">
			🔄 Új értékelés
		</button>
		<button onclick={handleExport} class="btn btn-primary flex-1">
			💾 Eredmény exportálása
		</button>
	</div>
</div>

<style>
	.edss-results-container {
		@apply w-full max-w-4xl mx-auto;
	}

	.score-card {
		@apply bg-gradient-to-br from-neuratos-blue-50 to-neuratos-blue-100 dark:from-gray-800 dark:to-gray-900;
		@apply rounded-xl p-8 shadow-lg border-2 border-neuratos-blue-300;
	}

	.score-display {
		@apply text-center mb-6;
	}

	.score-label {
		@apply text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2;
	}

	.score-value {
		@apply text-7xl font-bold text-neuratos-blue-700 dark:text-neuratos-blue-300 tabular-nums;
	}

	.severity-badge {
		@apply p-4 rounded-lg border-l-4 flex items-center;
	}

	.interpretation-card {
		@apply bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md;
		@apply border border-gray-200 dark:border-gray-700;
	}

	.summary-card {
		@apply bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md;
		@apply border border-gray-200 dark:border-gray-700;
	}

	.systems-grid {
		@apply grid grid-cols-2 gap-3;
	}

	.system-item {
		@apply flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg;
	}

	.system-item.ambulation-item {
		@apply col-span-2 bg-neuratos-blue-50 dark:bg-neuratos-blue-900 border border-neuratos-blue-200;
	}

	.system-label {
		@apply text-sm font-medium text-gray-700 dark:text-gray-300;
	}

	.system-value {
		@apply text-lg font-bold text-neuratos-blue-600 dark:text-neuratos-blue-400;
	}

	.reference-note {
		@apply text-center italic p-4 bg-gray-50 dark:bg-gray-900 rounded-lg;
	}

	.action-buttons {
		@apply flex gap-4;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.score-card {
			@apply p-6;
		}

		.score-value {
			@apply text-6xl;
		}

		.systems-grid {
			@apply grid-cols-1;
		}

		.system-item.ambulation-item {
			@apply col-span-1;
		}

		.action-buttons {
			@apply flex-col;
		}
	}
</style>
