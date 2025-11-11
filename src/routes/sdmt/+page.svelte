<script lang="ts">
	import { sdmtStore } from '$lib/stores/sdmt.svelte';
	import SDMTSettings from '$lib/components/sdmt/SDMTSettings.svelte';
	import SDMTKey from '$lib/components/sdmt/SDMTKey.svelte';
	import SDMTTest from '$lib/components/sdmt/SDMTTest.svelte';
	import SDMTResults from '$lib/components/sdmt/SDMTResults.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let currentMode = $derived(sdmtStore.currentMode);
	let showSettings = $state(false);

	onMount(() => {
		sdmtStore.initialize();
	});

	function handleStartPractice() {
		showSettings = false;
		sdmtStore.startPractice();
	}

	function handleStartTest() {
		showSettings = false;
		sdmtStore.startTest();
	}

	function handleBackToMenu() {
		showSettings = false;
		sdmtStore.reset();
	}
</script>

<svelte:head>
	<title>SDMT - Symbol Digit Modalities Test - Neuratos MS</title>
	<meta
		name="description"
		content="Symbol Digit Modalities Test - Kognitív feldolgozási sebesség értékelése"
	/>
</svelte:head>

<div class="page-container">
	<div class="page-header">
		<button onclick={() => goto('/')} class="back-button">
			← Vissza a főoldalra
		</button>
	</div>

	<div class="sdmt-container">
		{#if currentMode === 'idle'}
			<div class="card max-w-4xl mx-auto">
				<h1 class="text-3xl font-bold text-center mb-6 text-neuratos-blue-700 dark:text-neuratos-blue-300">
					SDMT - Symbol Digit Modalities Test
				</h1>

				<div class="alert-info mb-6">
					<h3 class="font-semibold text-lg mb-2">ℹ️ Az SDMT-ről</h3>
					<p class="text-sm leading-relaxed">
						Az SDMT (Symbol Digit Modalities Test) a kognitív feldolgozási sebességet és a
						vizuális munkamemóriát értékeli. A teszt során szimbólumokat kell számokkal párosítani
						egy referencia kulcs alapján. Az eredmények BICAMS normák szerint kerülnek
						értékelésre.
					</p>
				</div>

				<!-- Symbol Key Preview -->
				<div class="mb-8">
					<h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
						Referencia Kulcs Előnézet
					</h3>
					<SDMTKey />
				</div>

				<!-- Settings Toggle -->
				<div class="mb-6">
					<button
						onclick={() => (showSettings = !showSettings)}
						class="btn btn-secondary w-full"
					>
						{#if showSettings}
							⚙️ Beállítások elrejtése
						{:else}
							⚙️ Beállítások megjelenítése
						{/if}
					</button>
				</div>

				{#if showSettings}
					<div class="settings-section mb-8">
						<SDMTSettings />
					</div>
				{/if}

				<!-- Action Buttons -->
				<div class="action-buttons">
					<div class="action-card practice-card">
						<h3 class="action-title">🎓 Gyakorlás</h3>
						<p class="action-description">
							10 gyakorló feladat nincs időkorláttal. Ideális a teszt megismeréséhez.
						</p>
						<button onclick={handleStartPractice} class="btn btn-secondary btn-large">
							Gyakorlás indítása
						</button>
					</div>

					<div class="action-card test-card">
						<h3 class="action-title">🧪 Teszt</h3>
						<p class="action-description">
							90 másodperc alatt válaszolj a lehető legtöbb kérdésre. Az eredmény BICAMS z-score
							alapján kerül értékelésre.
						</p>
						<button onclick={handleStartTest} class="btn btn-primary btn-large">
							Teszt indítása
						</button>
					</div>
				</div>

				<!-- Mobile Hint -->
				<div class="mobile-hint mt-6">
					<p class="text-sm text-center text-gray-600 dark:text-gray-400">
						📱 Mobilon használod? Próbáld ki a
						<a href="/sdmt-mobile" class="text-neuratos-blue-600 dark:text-neuratos-blue-400 hover:underline font-semibold">
							mobil-optimalizált verziót
						</a>
						nagyobb szimbólumokkal!
					</p>
				</div>
			</div>
		{:else if currentMode === 'practice' || currentMode === 'test'}
			<div class="test-wrapper">
				<!-- Sticky Key at top -->
				<div class="sticky-key">
					<SDMTKey />
				</div>

				<!-- Test Component -->
				<div class="test-content">
					<SDMTTest />
				</div>
			</div>
		{:else if currentMode === 'results'}
			<div class="results-wrapper">
				<SDMTResults />
				<div class="results-actions">
					<button onclick={handleBackToMenu} class="btn btn-secondary">
						🔙 Vissza a menübe
					</button>
					<button onclick={() => goto('/')} class="btn btn-outline">
						🏠 Főoldal
					</button>
				</div>
			</div>
		{/if}
	</div>
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

	.sdmt-container {
		@apply max-w-6xl mx-auto;
	}

	.alert-info {
		@apply bg-neuratos-blue-100 dark:bg-neuratos-blue-900;
		@apply border-l-4 border-neuratos-blue-500;
		@apply p-4 rounded-r-lg;
	}

	.settings-section {
		@apply bg-gray-50 dark:bg-gray-900;
		@apply rounded-lg p-6;
		@apply border border-gray-200 dark:border-gray-700;
	}

	.action-buttons {
		@apply grid grid-cols-1 md:grid-cols-2 gap-6;
	}

	.action-card {
		@apply bg-gradient-to-br;
		@apply rounded-xl p-6;
		@apply border-2;
		@apply shadow-lg;
	}

	.practice-card {
		@apply from-green-50 to-green-100 dark:from-green-900 dark:to-green-950;
		@apply border-green-300 dark:border-green-700;
	}

	.test-card {
		@apply from-neuratos-blue-50 to-neuratos-blue-100 dark:from-neuratos-blue-900 dark:to-neuratos-blue-950;
		@apply border-neuratos-blue-300 dark:border-neuratos-blue-700;
	}

	.action-title {
		@apply text-2xl font-bold mb-3;
		@apply text-gray-800 dark:text-gray-100;
	}

	.action-description {
		@apply text-gray-700 dark:text-gray-300 mb-4;
		@apply leading-relaxed;
	}

	.btn-large {
		@apply w-full py-4 text-lg;
	}

	.mobile-hint {
		@apply bg-purple-50 dark:bg-purple-900;
		@apply rounded-lg p-4;
		@apply border border-purple-200 dark:border-purple-700;
	}

	/* Test Layout */
	.test-wrapper {
		@apply max-w-6xl mx-auto;
	}

	.sticky-key {
		@apply sticky top-4 z-10 mb-6;
		@apply bg-white dark:bg-gray-800;
		@apply rounded-lg p-4 shadow-lg;
		@apply border border-gray-200 dark:border-gray-700;
	}

	.test-content {
		@apply mb-6;
	}

	/* Results */
	.results-wrapper {
		@apply max-w-4xl mx-auto;
	}

	.results-actions {
		@apply flex gap-4 mt-8 justify-center;
	}

	.btn-outline {
		@apply px-6 py-3 rounded-lg;
		@apply bg-transparent;
		@apply border-2 border-neuratos-blue-600 dark:border-neuratos-blue-400;
		@apply text-neuratos-blue-600 dark:text-neuratos-blue-400;
		@apply font-semibold;
		@apply hover:bg-neuratos-blue-50 dark:hover:bg-neuratos-blue-900;
		@apply transition-all duration-200;
		@apply focus:outline-none focus:ring-2 focus:ring-neuratos-blue-500;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.sticky-key {
			@apply top-2 p-2;
		}

		.results-actions {
			@apply flex-col;
		}
	}
</style>
