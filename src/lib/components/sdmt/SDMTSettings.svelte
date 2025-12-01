<script lang="ts">
	import {
		sdmtStore,
		SYMBOL_SELECTION_MODE_NAMES,
		type SymbolSize,
		type SDMTTestMode,
		type SDMTTheme,
		type SDMTColorScheme,
		type SymbolSelectionMode,
		type SDMTInputMode,
		type SDMTVoiceLanguage
	} from '$lib/stores/sdmt.svelte';
	import { ColorPicker, ToggleSwitch } from '$lib/components/ui';
	import { getSpeechRecognitionService } from '$lib/services/speech-recognition.service';

	// Derived state from store
	let symbolSize = $derived(sdmtStore.symbolSize);
	let testMode = $derived(sdmtStore.testMode);
	let theme = $derived(sdmtStore.theme);
	let colorScheme = $derived(sdmtStore.colorScheme);
	let customAccentColor = $derived(sdmtStore.customAccentColor);
	let symbolSelectionMode = $derived(sdmtStore.symbolSelectionMode);
	let inputMode = $derived(sdmtStore.inputMode);
	let voiceLanguage = $derived(sdmtStore.voiceLanguage);

	// Check if voice is supported
	const speechService = getSpeechRecognitionService();
	const isVoiceSupported = speechService.isSupported();

	// Symbol size options
	const symbolSizeOptions: { value: SymbolSize; label: string; description: string }[] = [
		{ value: 'small', label: 'Kicsi (48px)', description: 'Kompakt megjelenítés' },
		{ value: 'medium', label: 'Közepes (64px)', description: 'Alapértelmezett méret' },
		{ value: 'large', label: 'Nagy (80px)', description: 'Könnyebb olvashatóság' }
	];

	// Test mode options (symbol count)
	const testModeOptions: { value: SDMTTestMode; label: string; description: string }[] = [
		{
			value: 'classic',
			label: 'Klasszikus (9)',
			description: 'Standard SDMT 9 szimbólummal'
		},
		{
			value: 'mobile',
			label: 'Mobil (6)',
			description: 'Egyszerűsített, 6 szimbólum'
		}
	];

	// Symbol selection mode options
	const symbolSelectionModeOptions: {
		value: SymbolSelectionMode;
		label: string;
		description: string;
	}[] = [
		{
			value: 'original',
			label: 'Eredeti szimbólumok',
			description: 'A klasszikus SDMT teszt 9 szimbóluma'
		},
		{
			value: 'random-from-pool',
			label: 'Véletlenszerű (54-ből)',
			description: '9 véletlenszerű szimbólum az összes 54-ből'
		}
	];

	// Input mode options
	const inputModeOptions: { value: SDMTInputMode; label: string; description: string }[] = [
		{
			value: 'keyboard',
			label: 'Billentyűzet / Érintés',
			description: 'Számok megérintése vagy billentyűzet használata'
		},
		{
			value: 'voice',
			label: 'Hangvezérlés',
			description: 'Mondd ki a számot magyarul vagy angolul'
		}
	];

	// Voice language options
	const voiceLanguageOptions: { value: SDMTVoiceLanguage; label: string; flag: string }[] = [
		{ value: 'hu-HU', label: 'Magyar', flag: '🇭🇺' },
		{ value: 'en-US', label: 'English', flag: '🇬🇧' }
	];

	// Theme options
	const themeOptions: { value: SDMTTheme; label: string }[] = [
		{ value: 'light', label: 'Világos' },
		{ value: 'dark', label: 'Sötét' }
	];

	// Handlers
	function handleSymbolSizeChange(size: SymbolSize) {
		sdmtStore.setSymbolSize(size);
	}

	function handleTestModeChange(mode: SDMTTestMode) {
		sdmtStore.setTestMode(mode);
	}

	function handleSymbolSelectionModeChange(mode: SymbolSelectionMode) {
		sdmtStore.setSymbolSelectionMode(mode);
	}

	function handleThemeChange(newTheme: SDMTTheme) {
		sdmtStore.setTheme(newTheme);
	}

	function handleColorChange(color: string) {
		sdmtStore.setColorScheme('custom', color);
	}

	function handleInputModeChange(mode: SDMTInputMode) {
		sdmtStore.setInputMode(mode);
	}

	function handleVoiceLanguageChange(language: SDMTVoiceLanguage) {
		sdmtStore.setVoiceLanguage(language);
	}

	// Get current accent color for display
	let currentColor = $derived(colorScheme === 'custom' ? customAccentColor : getPresetColor(colorScheme));

	function getPresetColor(scheme: SDMTColorScheme): string {
		const colors: Record<SDMTColorScheme, string> = {
			blue: '#3b82f6',
			green: '#10b981',
			purple: '#8b5cf6',
			teal: '#14b8a6',
			custom: customAccentColor
		};
		return colors[scheme];
	}
</script>

<div class="sdmt-settings">
	<div class="settings-header">
		<h2 class="settings-title">SDMT Beállítások</h2>
		<p class="settings-subtitle">
			Személyre szabhatod a tesztet. Minden beállítás automatikusan mentődik.
		</p>
	</div>

	<!-- Symbol Selection Mode -->
	<section class="setting-section">
		<h3 class="section-title">Szimbólum mód</h3>
		<p class="section-description">Eredeti vagy véletlenszerű szimbólumok használata</p>
		<div class="option-cards">
			{#each symbolSelectionModeOptions as option (option.value)}
				<button
					type="button"
					class="option-card"
					class:selected={symbolSelectionMode === option.value}
					onclick={() => handleSymbolSelectionModeChange(option.value)}
				>
					<span class="option-label">{option.label}</span>
					<span class="option-description">{option.description}</span>
				</button>
			{/each}
		</div>
	</section>

	<!-- Test Mode (Symbol Count) -->
	<section class="setting-section">
		<h3 class="section-title">Szimbólumok száma</h3>
		<p class="section-description">Hány szimbólum jelenjen meg a tesztben</p>
		<div class="option-cards">
			{#each testModeOptions as option (option.value)}
				<button
					type="button"
					class="option-card"
					class:selected={testMode === option.value}
					onclick={() => handleTestModeChange(option.value)}
				>
					<span class="option-label">{option.label}</span>
					<span class="option-description">{option.description}</span>
				</button>
			{/each}
		</div>
	</section>

	<!-- Symbol Size -->
	<section class="setting-section">
		<h3 class="section-title">Szimbólum méret</h3>
		<p class="section-description">A szimbólumok megjelenítési mérete</p>
		<div class="option-cards three-cols">
			{#each symbolSizeOptions as option (option.value)}
				<button
					type="button"
					class="option-card compact"
					class:selected={symbolSize === option.value}
					onclick={() => handleSymbolSizeChange(option.value)}
				>
					<span class="option-label">{option.label}</span>
				</button>
			{/each}
		</div>
	</section>

	<!-- Input Mode -->
	<section class="setting-section">
		<h3 class="section-title">Beviteli mód</h3>
		<p class="section-description">Hogyan szeretnéd megadni a válaszokat</p>
		<div class="option-cards">
			{#each inputModeOptions as option (option.value)}
				<button
					type="button"
					class="option-card"
					class:selected={inputMode === option.value}
					class:disabled={option.value === 'voice' && !isVoiceSupported}
					onclick={() => handleInputModeChange(option.value)}
					disabled={option.value === 'voice' && !isVoiceSupported}
				>
					<span class="option-label">
						{option.value === 'keyboard' ? '⌨️' : '🎤'} {option.label}
					</span>
					<span class="option-description">
						{#if option.value === 'voice' && !isVoiceSupported}
							Nem támogatott ebben a böngészőben
						{:else}
							{option.description}
						{/if}
					</span>
				</button>
			{/each}
		</div>

		{#if inputMode === 'voice' && isVoiceSupported}
			<div class="sub-setting">
				<h4 class="sub-title">Beszéd nyelve</h4>
				<div class="language-buttons">
					{#each voiceLanguageOptions as option (option.value)}
						<button
							type="button"
							class="language-button"
							class:selected={voiceLanguage === option.value}
							onclick={() => handleVoiceLanguageChange(option.value)}
						>
							<span class="flag">{option.flag}</span>
							<span class="lang-label">{option.label}</span>
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</section>

	<!-- Theme -->
	<section class="setting-section">
		<h3 class="section-title">Téma</h3>
		<div class="theme-toggle">
			<ToggleSwitch
				checked={theme === 'dark'}
				onchange={(checked) => handleThemeChange(checked ? 'dark' : 'light')}
				label={theme === 'dark' ? 'Sötét mód' : 'Világos mód'}
				description="Válts a világos és sötét megjelenés között"
			/>
		</div>
	</section>

	<!-- Accent Color -->
	<section class="setting-section">
		<h3 class="section-title">Akcentus szín</h3>
		<p class="section-description">Válassz egyedi színt a gombokhoz és kiemelésekhez</p>
		<ColorPicker value={currentColor} onchange={handleColorChange} />
	</section>

	<!-- Info Box -->
	<div class="info-box">
		<div class="info-icon">💡</div>
		<div class="info-content">
			<h4 class="info-title">Tudtad?</h4>
			<p class="info-text">
				A véletlenszerű szimbólum mód segít megelőzni a memorizálást ismételt tesztelésnél.
				A hangvezérlés különösen hasznos mozgáskorlátozottak számára.
			</p>
		</div>
	</div>
</div>

<style>
	.sdmt-settings {
		width: 100%;
		max-width: 640px;
		margin: 0 auto;
		padding: 1.5rem;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 3px solid #32303e;
		border-radius: 16px;
		color: #e0e0f0;
	}

	.settings-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #32303e;
	}

	.settings-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
	}

	.settings-subtitle {
		margin: 0;
		font-size: 0.875rem;
		color: #a0a0b0;
	}

	.setting-section {
		margin-bottom: 1.75rem;
		padding-bottom: 1.75rem;
		border-bottom: 1px solid rgba(50, 48, 62, 0.5);
	}

	.setting-section:last-of-type {
		border-bottom: none;
	}

	.section-title {
		margin: 0 0 0.375rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: #fff;
	}

	.section-description {
		margin: 0 0 1rem 0;
		font-size: 0.8125rem;
		color: #808090;
	}

	.option-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.option-cards.three-cols {
		grid-template-columns: repeat(3, 1fr);
	}

	.option-card {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		padding: 1rem;
		background: #0f172a;
		border: 2px solid #32303e;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.15s ease;
		text-align: left;
		min-height: 44px;
	}

	.option-card:hover:not(.disabled) {
		border-color: #3b82f6;
		background: #1e293b;
	}

	.option-card.selected {
		border-color: #3b82f6;
		background: rgba(59, 130, 246, 0.15);
		box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.3);
	}

	.option-card.compact {
		padding: 0.75rem;
		align-items: center;
		text-align: center;
	}

	.option-card.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.option-label {
		font-size: 0.9375rem;
		font-weight: 600;
		color: #e0e0f0;
	}

	.option-description {
		font-size: 0.75rem;
		color: #808090;
		line-height: 1.4;
	}

	.sub-setting {
		margin-top: 1rem;
		padding: 1rem;
		background: #0f172a;
		border-radius: 8px;
	}

	.sub-title {
		margin: 0 0 0.75rem 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: #a0a0b0;
	}

	.language-buttons {
		display: flex;
		gap: 0.75rem;
	}

	.language-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: #1e293b;
		border: 2px solid #32303e;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.15s ease;
		min-height: 44px;
	}

	.language-button:hover {
		border-color: #3b82f6;
	}

	.language-button.selected {
		border-color: #3b82f6;
		background: rgba(59, 130, 246, 0.15);
	}

	.flag {
		font-size: 1.25rem;
	}

	.lang-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #e0e0f0;
	}

	.theme-toggle {
		padding: 0.5rem 0;
	}

	.info-box {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background: rgba(59, 130, 246, 0.1);
		border: 1px solid rgba(59, 130, 246, 0.3);
		border-radius: 10px;
		margin-top: 1.5rem;
	}

	.info-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.info-content {
		flex: 1;
	}

	.info-title {
		margin: 0 0 0.375rem 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: #3b82f6;
	}

	.info-text {
		margin: 0;
		font-size: 0.8125rem;
		color: #a0a0b0;
		line-height: 1.5;
	}

	/* Mobile optimizations */
	@media (max-width: 480px) {
		.sdmt-settings {
			padding: 1rem;
			border-radius: 12px;
		}

		.option-cards {
			grid-template-columns: 1fr;
		}

		.option-cards.three-cols {
			grid-template-columns: 1fr 1fr 1fr;
		}

		.language-buttons {
			flex-direction: column;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.option-card,
		.language-button {
			transition: none;
		}
	}
</style>
