<script lang="ts">
	import { sdmtStore } from '$lib/stores/sdmt.svelte';
	import SDMTTestMobile from '$lib/components/sdmt/SDMTTestMobile.svelte';
	import SDMTResults from '$lib/components/sdmt/SDMTResults.svelte';
	import { onMount } from 'svelte';

	let currentMode = $derived(sdmtStore.currentMode);
	let showInstructions = $state(true);
	let colorScheme = $derived(sdmtStore.colorScheme);
	let symbolSet = $derived(sdmtStore.symbolSet);

	// Demographics
	let age = $state('');
	let education = $state('');
	let gender = $state<'male' | 'female' | ''>('');

	onMount(() => {
		sdmtStore.initialize();
		// Mobile version uses the current symbol set (6 or 9 symbols based on user preference)
	});

	function startPractice() {
		if (age && education && gender) {
			sdmtStore.setDemographics({
				age: parseInt(age),
				yearsOfEducation: parseInt(education),
				gender: gender as 'male' | 'female'
			});
		}
		showInstructions = false;
		sdmtStore.startPractice();
	}

	function startTest() {
		if (age && education && gender) {
			sdmtStore.setDemographics({
				age: parseInt(age),
				yearsOfEducation: parseInt(education),
				gender: gender as 'male' | 'female'
			});
		}
		showInstructions = false;
		sdmtStore.startTest();
	}

	function backToMenu() {
		showInstructions = true;
		sdmtStore.reset();
	}

	// Color scheme options
	const colorSchemeOptions = [
		{ value: 'blue', label: 'Kék', color: 'bg-blue-500' },
		{ value: 'green', label: 'Zöld', color: 'bg-green-500' },
		{ value: 'purple', label: 'Lila', color: 'bg-purple-500' },
		{ value: 'teal', label: 'Türkiz', color: 'bg-teal-500' }
	] as const;

	// Symbol set options
	const symbolSetOptions = [
		{ value: 'classic', label: 'Klasszikus' },
		{ value: 'geometric', label: 'Geometriai' },
		{ value: 'lines', label: 'Vonalak' },
		{ value: 'arrows', label: 'Nyilak' },
		{ value: 'unicode', label: 'Unicode' },
		{ value: 'unicode-extended', label: 'Unicode Kibővített' }
	] as const;

	function changeColorScheme(scheme: 'blue' | 'green' | 'purple' | 'teal') {
		sdmtStore.setColorScheme(scheme);
	}

	function changeSymbolSet(set: 'classic' | 'geometric' | 'lines' | 'arrows' | 'unicode' | 'unicode-extended') {
		sdmtStore.setSymbolSet(set);
		sdmtStore.generateKey(); // Regenerate key with new symbols
	}

	function randomizeSymbols() {
		sdmtStore.generateKey(); // This already randomizes the mapping
	}
</script>

<svelte:head>
	<title>SDMT - Symbol Digit Modalities Test - Neuratos MS</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
	<meta name="theme-color" content="#2563eb" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="description" content="Symbol Digit Modalities Test - Kognitív feldolgozási sebesség értékelése" />
</svelte:head>

{#if showInstructions}
	<div class="instructions-container">
		<div class="instructions-card">
			<h1 class="title">SDMT Teszt</h1>
			<p class="subtitle">Symbol Digit Modalities Test</p>

			<div class="info-section">
				<h2 class="info-title">🎯 A teszt célja</h2>
				<p class="info-text">
					Az SDMT a feldolgozási sebességet és a vizuális munkamemóriát méri.
					A képernyő tetején 9 szimbólum látható számokkal. A középen megjelenő
					szimbólumhoz kell kiválasztani a megfelelő számot az alsó billentyűzeten.
				</p>
			</div>

			<div class="info-section">
				<h2 class="info-title">📋 Utasítások</h2>
				<ul class="info-list">
					<li>Nézd meg a felső kulcsot - minden szimbólumhoz tartozik egy szám (1-9)</li>
					<li>A középen megjelenik egy nagyméretű szimbólum</li>
					<li>Válaszd ki a megfelelő számot az alsó billentyűzeten</li>
					<li>Dolgozz gyorsan, de pontosan!</li>
				</ul>
			</div>

			<!-- Demographics Section -->
			<div class="demographics-section">
				<h2 class="info-title">👤 Demográfiai adatok (Z-score számításhoz)</h2>
				<p class="info-text text-xs mb-3">
					Opcionális: Add meg az adatokat a BICAMS z-score számításához
				</p>

				<div class="demo-group">
					<label class="demo-label" for="age-input">Életkor:</label>
					<input
						id="age-input"
						type="number"
						bind:value={age}
						placeholder="pl. 35"
						class="demo-input"
						min="18"
						max="100"
					/>
				</div>

				<div class="demo-group">
					<label class="demo-label" for="education-input">Iskolai végzettség (évek):</label>
					<input
						id="education-input"
						type="number"
						bind:value={education}
						placeholder="pl. 16"
						class="demo-input"
						min="0"
						max="25"
					/>
				</div>

				<div class="demo-group">
					<label class="demo-label" id="gender-label">Nem:</label>
					<div class="gender-options" role="group" aria-labelledby="gender-label">
						<button
							onclick={() => (gender = 'male')}
							class="gender-button {gender === 'male' ? 'active' : ''}"
							type="button"
							aria-pressed={gender === 'male'}
						>
							Férfi
						</button>
						<button
							onclick={() => (gender = 'female')}
							class="gender-button {gender === 'female' ? 'active' : ''}"
							type="button"
							aria-pressed={gender === 'female'}
						>
							Nő
						</button>
					</div>
				</div>
			</div>

			<!-- Settings Section -->
			<div class="settings-section">
				<h2 class="info-title">⚙️ Beállítások</h2>

				<div class="setting-group">
					<label class="setting-label" id="color-scheme-label">Színséma:</label>
					<div class="color-options" role="group" aria-labelledby="color-scheme-label">
						{#each colorSchemeOptions as option (option.value)}
							<button
								onclick={() => changeColorScheme(option.value)}
								class="color-option {option.value === colorScheme ? 'active' : ''}"
								type="button"
								aria-pressed={option.value === colorScheme}
							>
								<div class="color-circle {option.color}"></div>
								<span>{option.label}</span>
							</button>
						{/each}
					</div>
				</div>

				<div class="setting-group">
					<label class="setting-label" id="symbol-set-label">Szimbólumkészlet:</label>
					<div class="symbol-set-options" role="group" aria-labelledby="symbol-set-label">
						{#each symbolSetOptions as option (option.value)}
							<button
								onclick={() => changeSymbolSet(option.value)}
								class="symbol-set-option {option.value === symbolSet ? 'active' : ''}"
								type="button"
								aria-pressed={option.value === symbolSet}
							>
								{option.label}
							</button>
						{/each}
					</div>
				</div>

				<div class="setting-group">
					<button onclick={randomizeSymbols} class="randomize-button">
						🔀 Szimbólumok keverése
					</button>
				</div>
			</div>

			<div class="practice-section">
				<h2 class="info-title">🎓 Gyakorlás</h2>
				<p class="info-text">
					Először gyakorolj 10 feladattal, hogy megismerkedj a teszttel.
					Nincs időkorlát, és látni fogod, hogy helyesen válaszoltál-e.
				</p>
				<button onclick={startPractice} class="btn btn-secondary btn-large">
					Gyakorlás indítása
				</button>
			</div>

			<div class="test-section">
				<h2 class="info-title">🧪 Teszt</h2>
				<p class="info-text">
					<strong>90 másodperc</strong> alatt válaszolj a lehető legtöbb feladatra.
					A teszt nem áll meg hibás válasz esetén.
				</p>
				<button onclick={startTest} class="btn btn-primary btn-large">
					Teszt indítása
				</button>
			</div>
		</div>
	</div>
{:else if currentMode === 'practice' || currentMode === 'test'}
	<SDMTTestMobile />
{:else if currentMode === 'results'}
	<div class="results-wrapper">
		<SDMTResults />
		<button onclick={backToMenu} class="btn btn-secondary back-button">
			🔙 Vissza a menübe
		</button>
	</div>
{/if}

<style>
	:global(body) {
		@apply m-0 p-0;
		@apply overflow-hidden;
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
	}

	.instructions-container {
		@apply w-full h-screen overflow-y-auto;
		@apply bg-gradient-to-b from-neuratos-blue-50 to-white;
		@apply dark:from-gray-900 dark:to-gray-800;
		@apply p-4;
	}

	.instructions-card {
		@apply max-w-2xl mx-auto;
		@apply bg-white dark:bg-gray-800;
		@apply rounded-2xl shadow-xl;
		@apply p-6;
		@apply my-6;
	}

	.title {
		@apply text-3xl font-bold text-center;
		@apply text-neuratos-blue-700 dark:text-neuratos-blue-300;
		@apply mb-2;
	}

	.subtitle {
		@apply text-center text-sm;
		@apply text-gray-600 dark:text-gray-400;
		@apply mb-8;
	}

	.info-section {
		@apply mb-6;
		@apply pb-6;
		@apply border-b border-gray-200 dark:border-gray-700;
	}

	.info-section:last-of-type {
		@apply border-b-0;
	}

	.info-title {
		@apply text-xl font-semibold;
		@apply text-gray-800 dark:text-gray-200;
		@apply mb-3;
	}

	.info-text {
		@apply text-gray-700 dark:text-gray-300;
		@apply leading-relaxed;
		@apply mb-4;
	}

	.info-list {
		@apply list-disc list-inside;
		@apply text-gray-700 dark:text-gray-300;
		@apply space-y-2;
		@apply ml-2;
	}

	.demographics-section {
		@apply mb-6;
		@apply pb-6;
		@apply border-b border-gray-200 dark:border-gray-700;
		@apply bg-blue-50 dark:bg-blue-950;
		@apply rounded-lg p-4;
	}

	.demo-group {
		@apply mb-3;
	}

	.demo-group:last-child {
		@apply mb-0;
	}

	.demo-label {
		@apply block text-sm font-semibold mb-1;
		@apply text-gray-700 dark:text-gray-300;
	}

	.demo-input {
		@apply w-full px-3 py-2 rounded-lg;
		@apply bg-white dark:bg-gray-800;
		@apply border-2 border-gray-300 dark:border-gray-600;
		@apply text-gray-900 dark:text-gray-100;
		@apply focus:border-blue-500 focus:outline-none;
	}

	.gender-options {
		@apply grid grid-cols-2 gap-2;
	}

	.gender-button {
		@apply py-2 px-4 rounded-lg;
		@apply bg-white dark:bg-gray-800;
		@apply border-2 border-gray-300 dark:border-gray-600;
		@apply font-medium;
		@apply transition-all duration-150;
	}

	.gender-button.active {
		@apply border-blue-500 bg-blue-100 dark:bg-blue-900;
	}

	.settings-section {
		@apply mb-6;
		@apply pb-6;
		@apply border-b border-gray-200 dark:border-gray-700;
		@apply bg-gray-50 dark:bg-gray-900;
		@apply rounded-lg p-4;
	}

	.setting-group {
		@apply mb-4;
	}

	.setting-group:last-child {
		@apply mb-0;
	}

	.setting-label {
		@apply block text-sm font-semibold mb-2;
		@apply text-gray-700 dark:text-gray-300;
	}

	.color-options {
		@apply grid grid-cols-2 gap-2;
	}

	.color-option {
		@apply flex items-center gap-2 p-2;
		@apply bg-white dark:bg-gray-800;
		@apply rounded-lg border-2 border-gray-200 dark:border-gray-700;
		@apply transition-all duration-150;
		@apply text-sm;
	}

	.color-option.active {
		@apply border-blue-500 bg-blue-50 dark:bg-blue-900;
	}

	.color-circle {
		@apply w-6 h-6 rounded-full shadow-sm;
	}

	.symbol-set-options {
		@apply grid grid-cols-2 gap-2;
	}

	.symbol-set-option {
		@apply p-2 rounded-lg;
		@apply bg-white dark:bg-gray-800;
		@apply border-2 border-gray-200 dark:border-gray-700;
		@apply text-sm font-medium;
		@apply transition-all duration-150;
	}

	.symbol-set-option.active {
		@apply border-blue-500 bg-blue-50 dark:bg-blue-900;
	}

	.randomize-button {
		@apply w-full py-3 px-4 rounded-lg;
		@apply bg-neuratos-blue-600 hover:bg-neuratos-blue-700;
		@apply text-white font-bold;
		@apply shadow-md;
	}

	.practice-section,
	.test-section {
		@apply mb-6;
		@apply pb-6;
		@apply border-b border-gray-200 dark:border-gray-700;
	}

	.test-section {
		@apply border-b-0;
	}

	.btn {
		@apply px-6 py-3 rounded-lg font-semibold;
		@apply transition-all duration-150;
		@apply focus:outline-none focus:ring-4 focus:ring-offset-2;
		@apply active:scale-95;
		@apply shadow-md hover:shadow-lg;
	}

	.btn-large {
		@apply w-full py-4 text-lg;
	}

	.btn-primary {
		@apply bg-neuratos-blue-600 hover:bg-neuratos-blue-700;
		@apply text-white;
		@apply focus:ring-neuratos-blue-300;
	}

	.btn-secondary {
		@apply bg-gray-200 hover:bg-gray-300;
		@apply dark:bg-gray-700 dark:hover:bg-gray-600;
		@apply text-gray-800 dark:text-gray-200;
		@apply focus:ring-gray-300 dark:focus:ring-gray-600;
	}

	.results-wrapper {
		@apply w-full h-screen overflow-y-auto;
		@apply bg-gradient-to-b from-neuratos-blue-50 to-white;
		@apply dark:from-gray-900 dark:to-gray-800;
		@apply p-4;
	}

	.back-button {
		@apply max-w-md mx-auto block;
		@apply mt-6 mb-8;
	}

	/* Prevent pull-to-refresh on mobile */
	@supports (overscroll-behavior: contain) {
		.instructions-container,
		.results-wrapper {
			overscroll-behavior: contain;
		}
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.instructions-card {
			@apply p-4 rounded-xl;
		}

		.title {
			@apply text-2xl;
		}

		.info-title {
			@apply text-lg;
		}
	}

	/* Safe area insets for notched devices */
	@supports (padding: env(safe-area-inset-top)) {
		.instructions-container,
		.results-wrapper {
			padding-top: max(1rem, env(safe-area-inset-top));
			padding-bottom: max(1rem, env(safe-area-inset-bottom));
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.btn {
			transition: none;
		}
	}
</style>
