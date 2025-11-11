<script lang="ts">
	import { sdmtStore, SYMBOL_SET_NAMES, type SymbolSize, type SDMTTestMode, type SDMTTheme, type SDMTColorScheme, type SDMTSymbolSet } from '$lib/stores/sdmt.svelte';

	let symbolSize = $derived(sdmtStore.symbolSize);
	let symbolSet = $derived(sdmtStore.symbolSet);
	let testMode = $derived(sdmtStore.testMode);
	let theme = $derived(sdmtStore.theme);
	let colorScheme = $derived(sdmtStore.colorScheme);

	// Symbol size options
	const symbolSizeOptions: { value: SymbolSize; label: string; description: string }[] = [
		{ value: 'small', label: 'Kicsi (48px)', description: 'Kompakt megjelenítés, több hely a képernyőn' },
		{ value: 'medium', label: 'Közepes (64px)', description: 'Alapértelmezett, kiegyensúlyozott méret' },
		{ value: 'large', label: 'Nagy (80px)', description: 'Nagyobb szimbólumok, könnyebb olvashatóság' }
	];

	// Test mode options
	const testModeOptions: { value: SDMTTestMode; label: string; description: string }[] = [
		{
			value: 'classic',
			label: 'Klasszikus (9 szimbólum)',
			description: 'Standard SDMT 9 szimbólummal, progresszív nehézséggel'
		},
		{
			value: 'mobile',
			label: 'Mobil (6 szimbólum)',
			description: 'Egyszerűsített verzió mobileszközökhöz, 6 szimbólummal'
		},
		{
			value: 'random',
			label: 'Véletlenszerű (9 szimbólum)',
			description: 'Véletlenszerűen választott 9 szimbólum a 54-es készletből'
		}
	];

	// Theme options
	const themeOptions: { value: SDMTTheme; label: string; icon: string }[] = [
		{ value: 'light', label: 'Világos', icon: '☀️' },
		{ value: 'dark', label: 'Sötét', icon: '🌙' }
	];

	// Color scheme options
	const colorSchemeOptions: { value: SDMTColorScheme; label: string; preview: string }[] = [
		{ value: 'blue', label: 'Kék', preview: 'bg-neuratos-blue-500' },
		{ value: 'green', label: 'Zöld', preview: 'bg-green-500' },
		{ value: 'purple', label: 'Lila', preview: 'bg-purple-500' },
		{ value: 'teal', label: 'Türkiz', preview: 'bg-teal-500' }
	];

	// Symbol set options
	const symbolSetOptions: { value: SDMTSymbolSet; label: string }[] = Object.entries(
		SYMBOL_SET_NAMES
	).map(([value, label]) => ({
		value: value as SDMTSymbolSet,
		label
	}));

	function handleSymbolSizeChange(size: SymbolSize) {
		sdmtStore.setSymbolSize(size);
	}

	function handleSymbolSetChange(set: SDMTSymbolSet) {
		sdmtStore.setSymbolSet(set);
	}

	function handleTestModeChange(mode: SDMTTestMode) {
		sdmtStore.setTestMode(mode);
	}

	function handleThemeChange(newTheme: SDMTTheme) {
		sdmtStore.setTheme(newTheme);
	}

	function handleColorSchemeChange(scheme: SDMTColorScheme) {
		sdmtStore.setColorScheme(scheme);
	}
</script>

<div class="sdmt-settings-container" class:dark={theme === 'dark'}>
	<div class="settings-header mb-6">
		<h2 class="text-2xl font-bold text-neuratos-blue-700 dark:text-neuratos-blue-300 mb-2">
			⚙️ SDMT Beállítások
		</h2>
		<p class="text-sm text-gray-600 dark:text-gray-400">
			Személyre szabhatod a tesztet igényeid szerint. Minden beállítás automatikusan elmentődik.
		</p>
	</div>

	<!-- Symbol Size Setting -->
	<div class="setting-section mb-6">
		<h3 class="setting-title">📏 Szimbólum mérete</h3>
		<p class="setting-description">A szimbólumok megjelenítési mérete</p>
		<div class="option-grid">
			{#each symbolSizeOptions as option (option.value)}
				<button
					type="button"
					class="option-card"
					class:option-card-selected={symbolSize === option.value}
					onclick={() => handleSymbolSizeChange(option.value)}
				>
					<div class="option-label">{option.label}</div>
					<div class="option-description">{option.description}</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Test Mode Setting -->
	<div class="setting-section mb-6">
		<h3 class="setting-title">🎯 Teszt mód</h3>
		<p class="setting-description">Válaszd ki a tesztelési módot</p>
		<div class="option-grid">
			{#each testModeOptions as option (option.value)}
				<button
					type="button"
					class="option-card"
					class:option-card-selected={testMode === option.value}
					onclick={() => handleTestModeChange(option.value)}
				>
					<div class="option-label">{option.label}</div>
					<div class="option-description">{option.description}</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Symbol Set Setting -->
	<div class="setting-section mb-6">
		<h3 class="setting-title">🔣 Szimbólum készlet</h3>
		<p class="setting-description">Válassz szimbólum stílust</p>
		<div class="select-wrapper">
			<select
				value={symbolSet}
				onchange={(e) => handleSymbolSetChange(e.currentTarget.value as SDMTSymbolSet)}
				class="select w-full"
			>
				{#each symbolSetOptions as option (option.value)}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- Theme Setting -->
	<div class="setting-section mb-6">
		<h3 class="setting-title">🎨 Téma</h3>
		<p class="setting-description">Világos vagy sötét megjelenés</p>
		<div class="theme-toggle">
			{#each themeOptions as option (option.value)}
				<button
					type="button"
					class="theme-button"
					class:theme-button-selected={theme === option.value}
					onclick={() => handleThemeChange(option.value)}
				>
					<span class="text-2xl">{option.icon}</span>
					<span class="ml-2">{option.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Color Scheme Setting -->
	<div class="setting-section mb-6">
		<h3 class="setting-title">🌈 Szín séma</h3>
		<p class="setting-description">Akcentus szín kiválasztása</p>
		<div class="color-scheme-grid">
			{#each colorSchemeOptions as option (option.value)}
				<button
					type="button"
					class="color-scheme-button"
					class:color-scheme-selected={colorScheme === option.value}
					onclick={() => handleColorSchemeChange(option.value)}
				>
					<div class="color-preview {option.preview}"></div>
					<span class="color-label">{option.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Info Box -->
	<div class="info-box">
		<h4 class="info-title">💡 Tudtad?</h4>
		<p class="info-text">
			Minden beállításod automatikusan mentésre kerül a böngésződben. Legközelebb ugyanazokkal a
			beállításokkal folytathatsz.
		</p>
	</div>
</div>

<style>
	.sdmt-settings-container {
		@apply w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg;
	}

	.settings-header {
		@apply border-b border-gray-200 dark:border-gray-700 pb-4;
	}

	.setting-section {
		@apply border-b border-gray-200 dark:border-gray-700 pb-6;
	}

	.setting-title {
		@apply text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1;
	}

	.setting-description {
		@apply text-sm text-gray-600 dark:text-gray-400 mb-4;
	}

	.option-grid {
		@apply grid grid-cols-1 sm:grid-cols-3 gap-3;
	}

	.option-card {
		@apply w-full p-4 border-2 rounded-lg transition-all duration-200;
		@apply border-gray-200 dark:border-gray-700;
		@apply hover:border-neuratos-blue-400 hover:shadow-md;
		@apply bg-white dark:bg-gray-900;
		@apply text-left;
	}

	.option-card-selected {
		@apply border-neuratos-blue-500 bg-neuratos-blue-50 dark:bg-neuratos-blue-900;
		@apply shadow-md;
	}

	.option-label {
		@apply font-semibold text-gray-800 dark:text-gray-200 mb-1;
	}

	.option-description {
		@apply text-xs text-gray-600 dark:text-gray-400;
	}

	.select-wrapper {
		@apply mt-2;
	}

	.theme-toggle {
		@apply flex gap-3;
	}

	.theme-button {
		@apply flex-1 flex items-center justify-center;
		@apply p-4 border-2 rounded-lg transition-all duration-200;
		@apply border-gray-200 dark:border-gray-700;
		@apply hover:border-neuratos-blue-400 hover:shadow-md;
		@apply bg-white dark:bg-gray-900;
	}

	.theme-button-selected {
		@apply border-neuratos-blue-500 bg-neuratos-blue-50 dark:bg-neuratos-blue-900;
		@apply shadow-md;
	}

	.color-scheme-grid {
		@apply grid grid-cols-2 sm:grid-cols-4 gap-3;
	}

	.color-scheme-button {
		@apply flex flex-col items-center justify-center;
		@apply p-4 border-2 rounded-lg transition-all duration-200;
		@apply border-gray-200 dark:border-gray-700;
		@apply hover:border-gray-400 hover:shadow-md;
		@apply bg-white dark:bg-gray-900;
	}

	.color-scheme-selected {
		@apply border-4 border-gray-800 dark:border-gray-200 shadow-lg;
	}

	.color-preview {
		@apply w-12 h-12 rounded-full mb-2 shadow-md;
	}

	.color-label {
		@apply text-sm font-semibold text-gray-800 dark:text-gray-200;
	}

	.info-box {
		@apply p-4 bg-neuratos-blue-50 dark:bg-neuratos-blue-900 border border-neuratos-blue-200 dark:border-neuratos-blue-700 rounded-lg;
	}

	.info-title {
		@apply text-sm font-semibold text-neuratos-blue-700 dark:text-neuratos-blue-300 mb-2;
	}

	.info-text {
		@apply text-sm text-gray-600 dark:text-gray-400;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.sdmt-settings-container {
			@apply p-4;
		}

		.option-grid {
			@apply grid-cols-1;
		}

		.theme-toggle {
			@apply flex-col;
		}

		.color-scheme-grid {
			@apply grid-cols-2;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.option-card,
		.theme-button,
		.color-scheme-button {
			transition: none;
		}
	}
</style>
