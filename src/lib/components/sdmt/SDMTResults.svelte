<script lang="ts">
	import { sdmtStore } from '$lib/stores/sdmt.svelte';
	import { ZScoreDetails } from '$lib/components/ui';

	let score = $derived(sdmtStore.score);
	let responses = $derived(sdmtStore.responses);
	let demographics = $derived(sdmtStore.demographics);
	let bicamsResult = $derived(sdmtStore.bicamsResult);
	let theme = $derived(sdmtStore.theme);
	let colorScheme = $derived(sdmtStore.colorScheme);
	let testMode = $derived(sdmtStore.testMode);

	// Calculate accuracy percentage
	const accuracy = $derived.by(() => {
		if (responses.length === 0) return 0;
		return Math.round((score / responses.length) * 100);
	});

	// Hungarian performance level translations
	const performanceLevelLabels: Record<string, { label: string; description: string; color: string }> = {
		normal: {
			label: 'Normális',
			description: 'Teljesítményed az elvártnak megfelelő vagy felette van.',
			color: 'text-green-600 dark:text-green-400'
		},
		borderline: {
			label: 'Határérték',
			description: 'Teljesítményed a normális tartomány alsó határán van.',
			color: 'text-yellow-600 dark:text-yellow-400'
		},
		impaired: {
			label: 'Enyhe károsodás',
			description: 'Teljesítményed enyhe kognitív károsodásra utal.',
			color: 'text-orange-600 dark:text-orange-400'
		},
		'severely-impaired': {
			label: 'Súlyos károsodás',
			description: 'Teljesítményed jelentős kognitív károsodásra utal.',
			color: 'text-red-600 dark:text-red-400'
		}
	};

	// Get test mode label
	const testModeLabel = $derived.by(() => {
		const labels = {
			classic: 'Klasszikus (9 szimbólum)',
			mobile: 'Mobil (6 szimbólum)',
			random: 'Véletlenszerű (9 szimbólum)'
		};
		return labels[testMode];
	});

	// Z-score color based on performance
	const zScoreColor = $derived.by(() => {
		if (!bicamsResult) return 'text-gray-600';
		if (bicamsResult.zScore >= -1) return 'text-green-600 dark:text-green-400';
		if (bicamsResult.zScore >= -1.5) return 'text-yellow-600 dark:text-yellow-400';
		return 'text-red-600 dark:text-red-400';
	});

	// Color scheme classes
	const accentColorClass = $derived.by(() => {
		const colorClasses = {
			blue: 'bg-neuratos-blue-500',
			green: 'bg-green-500',
			purple: 'bg-purple-500',
			teal: 'bg-teal-500'
		};
		return colorClasses[colorScheme];
	});

	function handleRestart() {
		sdmtStore.initialize();
	}

	function handleExport() {
		const data = {
			timestamp: new Date().toISOString(),
			score,
			accuracy,
			responses: responses.length,
			testMode,
			demographics,
			bicamsResult
		};

		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `sdmt-results-${Date.now()}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<div class="sdmt-results-container" class:dark={theme === 'dark'}>
	<div class="results-header mb-8">
		<h2 class="text-3xl font-bold text-center mb-2 text-neuratos-blue-700 dark:text-neuratos-blue-300">
			🎉 Teszt Befejezve!
		</h2>
		<p class="text-center text-gray-600 dark:text-gray-400">
			Gratulálunk a teszt elvégzéséhez. Itt vannak az eredményeid:
		</p>
	</div>

	<!-- Raw Score Card -->
	<div class="results-card mb-6">
		<div class="card-header {accentColorClass}">
			<h3 class="text-white text-xl font-bold">📊 Alapadatok</h3>
		</div>
		<div class="card-content">
			<div class="score-grid">
				<div class="score-item">
					<div class="score-label">Helyes válaszok</div>
					<div class="score-value text-neuratos-blue-600 dark:text-neuratos-blue-400">
						{score}
					</div>
				</div>
				<div class="score-item">
					<div class="score-label">Összes válasz</div>
					<div class="score-value text-gray-600 dark:text-gray-400">
						{responses.length}
					</div>
				</div>
				<div class="score-item">
					<div class="score-label">Pontosság</div>
					<div class="score-value text-green-600 dark:text-green-400">
						{accuracy}%
					</div>
				</div>
				<div class="score-item">
					<div class="score-label">Teszt mód</div>
					<div class="score-value-small text-gray-600 dark:text-gray-400">
						{testModeLabel}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- BICAMS Z-Score Card (if available) -->
	{#if bicamsResult && demographics}
		<div class="results-card mb-6">
			<div class="card-header bg-gradient-to-r from-purple-500 to-indigo-500">
				<h3 class="text-white text-xl font-bold">🧠 BICAMS Normalizált Értékelés</h3>
			</div>
			<div class="card-content">
				<!-- Z-Score Display -->
				<div class="z-score-display mb-6">
					<div class="z-score-label mb-2">Z-Score</div>
					<div class="z-score-value {zScoreColor}">
						{bicamsResult.zScore.toFixed(2)}
					</div>
					<div class="z-score-interpretation mt-2">
						{#if bicamsResult.isImpaired}
							<span class="text-red-600 dark:text-red-400 font-semibold">
								⚠️ Kognitív károsodás jelei
							</span>
						{:else}
							<span class="text-green-600 dark:text-green-400 font-semibold">
								✓ Normális tartományban
							</span>
						{/if}
					</div>
				</div>

				<!-- Performance Level -->
				{#if performanceLevelLabels[bicamsResult.performanceLevel]}
					<div class="performance-level-card">
						<div class="performance-level-header">
							<span class="font-semibold {performanceLevelLabels[bicamsResult.performanceLevel].color}">
								{performanceLevelLabels[bicamsResult.performanceLevel].label}
							</span>
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
							{performanceLevelLabels[bicamsResult.performanceLevel].description}
						</p>
					</div>
				{/if}

				<!-- BICAMS Details -->
				<div class="bicams-details mt-6">
					<h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
						📈 BICAMS Részletek
					</h4>
					<div class="details-grid">
						<div class="detail-item">
							<span class="detail-label">Nyers pontszám:</span>
							<span class="detail-value">{score}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">Skálázott pontszám:</span>
							<span class="detail-value">{bicamsResult.scaledScore}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">Várható pontszám:</span>
							<span class="detail-value">{bicamsResult.expectedScore.toFixed(2)}</span>
						</div>
					</div>
				</div>

				<!-- Demographics Used -->
				<div class="demographics-summary mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<h4 class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">
						Normalizáláshoz használt adatok
					</h4>
					<div class="text-sm text-gray-600 dark:text-gray-400">
						Életkor: <strong>{demographics.age}</strong> év,
						Nem: <strong>{demographics.sex === 1 ? 'Férfi' : 'Nő'}</strong>,
						Végzettség: <strong>{demographics.education}</strong> év
					</div>
				</div>

				<!-- Reference Note -->
				<div class="reference-note mt-4">
					<p class="text-xs text-gray-500 dark:text-gray-400">
						📚 Referencia: Costers et al. (2017), belga BICAMS validációs tanulmány
					</p>
				</div>

				<!-- Expandable Calculation Details -->
				<div class="calculation-details mt-4">
					<ZScoreDetails
						result={bicamsResult}
						{demographics}
						rawScore={score}
						language="hu"
					/>
				</div>
			</div>
		</div>
	{:else}
		<div class="results-card mb-6">
			<div class="card-content">
				<div class="info-message">
					<p class="text-sm text-gray-600 dark:text-gray-400">
						ℹ️ BICAMS normalizált értékeléshez demográfiai adatok szükségesek.
						A következő alkalommal add meg az adataidat a teszt elején!
					</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Action Buttons -->
	<div class="action-buttons">
		<button onclick={handleRestart} class="btn btn-primary flex-1">
			🔄 Új teszt
		</button>
		<button onclick={handleExport} class="btn btn-secondary flex-1">
			💾 Eredmény exportálása
		</button>
	</div>
</div>

<style>
	.sdmt-results-container {
		@apply w-full max-w-3xl mx-auto p-6;
	}

	.results-card {
		@apply bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden;
	}

	.card-header {
		@apply px-6 py-4;
	}

	.card-content {
		@apply px-6 py-6;
	}

	.score-grid {
		@apply grid grid-cols-2 sm:grid-cols-4 gap-4;
	}

	.score-item {
		@apply flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg;
	}

	.score-label {
		@apply text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2;
	}

	.score-value {
		@apply text-4xl font-bold tabular-nums;
	}

	.score-value-small {
		@apply text-lg font-semibold text-center;
	}

	.z-score-display {
		@apply text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl;
	}

	.z-score-label {
		@apply text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-semibold;
	}

	.z-score-value {
		@apply text-6xl font-bold tabular-nums;
	}

	.z-score-interpretation {
		@apply text-sm;
	}

	.performance-level-card {
		@apply p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-neuratos-blue-500;
	}

	.performance-level-header {
		@apply text-lg;
	}

	.bicams-details {
		@apply border-t border-gray-200 dark:border-gray-700 pt-4;
	}

	.details-grid {
		@apply grid gap-2;
	}

	.detail-item {
		@apply flex justify-between text-sm;
	}

	.detail-label {
		@apply text-gray-600 dark:text-gray-400;
	}

	.detail-value {
		@apply font-semibold text-gray-800 dark:text-gray-200;
	}

	.demographics-summary {
		@apply border border-gray-200 dark:border-gray-700;
	}

	.reference-note {
		@apply text-center italic;
	}

	.info-message {
		@apply p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg;
	}

	.action-buttons {
		@apply flex gap-4 mt-8;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.sdmt-results-container {
			@apply p-4;
		}

		.score-value {
			@apply text-3xl;
		}

		.z-score-value {
			@apply text-5xl;
		}

		.action-buttons {
			@apply flex-col;
		}
	}
</style>
