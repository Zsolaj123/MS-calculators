<script lang="ts">
	import { msfcStore } from '$lib/stores/msfc.svelte';
	import LanguageSwitcher from '$lib/components/common/LanguageSwitcher.svelte';
	import { t, tArray } from '$lib/utils/i18n';
	import { msfc } from '$lib/data/i18n/msfc';
	import { onMount, onDestroy } from 'svelte';
	import type { MSFCTestType } from '$lib/data/msfc-reference';

	let selectedTest = $state<MSFCTestType | null>(null);
	let manualInput = $state<Record<string, string>>({});
	let age = $state<string>('');

	const currentTest = $derived(msfcStore.currentTest);
	const isManualMode = $derived(msfcStore.isManualMode);
	const testResults = $derived(msfcStore.testResults);
	const completedTests = $derived(msfcStore.completedTests);
	const timers = $derived(msfcStore.timers);

	const tests: MSFCTestType[] = ['hpt_dominant', 'hpt_non_dominant', 't25fw', 'pasat3'];

	onMount(() => {
		msfcStore.initialize();
	});

	onDestroy(() => {
		msfcStore.stopAllTimers();
	});

	function handleStartTimer() {
		if (selectedTest) {
			msfcStore.startTimer(selectedTest);
		}
	}

	function handleStopTimer() {
		if (selectedTest) {
			msfcStore.stopTimer(selectedTest);
		}
	}

	function handleToggleMode() {
		msfcStore.setManualMode(!isManualMode);
	}

	function handleManualSubmit(testType: MSFCTestType) {
		const value = manualInput[testType];
		if (value) {
			msfcStore.setManualResult(testType, value);
			manualInput[testType] = '';
		}
	}

	function handleSetAge() {
		const ageNum = parseInt(age);
		if (!isNaN(ageNum) && ageNum > 0) {
			msfcStore.setAge(ageNum);
		}
	}

	function getElapsedTime(testType: MSFCTestType): string {
		return msfcStore.formatTime(msfcStore.getElapsedTime(testType));
	}

	function formatZScore(value: number | undefined): string {
		if (value === undefined) return '-';
		return value.toFixed(2);
	}

	function getZScoreColor(value: number | undefined): string {
		if (value === undefined) return 'text-gray-500';
		if (value >= 0) return 'text-green-600 dark:text-green-400';
		if (value >= -1) return 'text-yellow-600 dark:text-yellow-400';
		return 'text-red-600 dark:text-red-400';
	}
</script>

<svelte:head>
	<title>{t(msfc.pageTitle)}</title>
	<meta name="description" content={t(msfc.pageDescription)} />
</svelte:head>

<div class="msfc-container">
	<!-- Header -->
	<div class="header">
		<div>
			<h1 class="title">{t(msfc.testTitle)}</h1>
			<p class="subtitle">{t(msfc.testSubtitle)}</p>
		</div>
		<LanguageSwitcher />
	</div>

	<!-- About Section -->
	<div class="about-section">
		<h2 class="section-title">{t(msfc.aboutMSFC)}</h2>
		<p class="about-text">{t(msfc.aboutText)}</p>

		<h3 class="components-title">{t(msfc.componentsTitle)}</h3>
		<ul class="components-list">
			{#each tArray(msfc.components) as component, idx (idx)}
				<li>{component}</li>
			{/each}
		</ul>
	</div>

	<!-- Age Input -->
	<div class="age-section">
		<label for="age-input" class="age-label">
			{t(msfc.ageAdjusted)}:
		</label>
		<div class="age-input-group">
			<input
				id="age-input"
				type="number"
				bind:value={age}
				placeholder="35"
				class="age-input"
				min="18"
				max="100"
			/>
			<button onclick={handleSetAge} class="btn btn-secondary">
				Set Age
			</button>
		</div>
	</div>

	<!-- Mode Toggle -->
	<div class="mode-section">
		<button onclick={handleToggleMode} class="btn btn-outline">
			{t(msfc.toggleMode)}
		</button>
		<p class="mode-label">
			{t(msfc.testMode)} <strong>{isManualMode ? t(msfc.manualEntryMode) : t(msfc.timerMode)}</strong>
		</p>
	</div>

	<!-- Test Selection -->
	<div class="test-selection">
		<h2 class="section-title">{t(msfc.selectTest)}</h2>
		<div class="test-buttons">
			{#each tests as test (test)}
				<button
					onclick={() => (selectedTest = test)}
					class="test-button {selectedTest === test ? 'active' : ''} {completedTests.has(test) ? 'completed' : ''}"
				>
					{t(msfc.testNames[test])}
					{#if completedTests.has(test)}
						<span class="checkmark">✓</span>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	<!-- Timer / Manual Entry Section -->
	{#if selectedTest}
		<div class="active-test-section">
			<h2 class="section-title">{t(msfc.currentTest)} {t(msfc.testNames[selectedTest])}</h2>
			<p class="test-instruction">{t(msfc.instructions[selectedTest])}</p>

			{#if !isManualMode}
				<!-- Timer Mode -->
				<div class="timer-display">
					<div class="time-value">{getElapsedTime(selectedTest)}</div>
					<div class="timer-controls">
						{#if !timers[selectedTest]?.isRunning}
							<button onclick={handleStartTimer} class="btn btn-primary btn-large">
								{t(msfc.startTimer)}
							</button>
						{:else}
							<button onclick={handleStopTimer} class="btn btn-danger btn-large">
								{t(msfc.stopTimer)}
							</button>
						{/if}
						<button onclick={() => msfcStore.resetTest(selectedTest)} class="btn btn-secondary">
							{t(msfc.resetTimer)}
						</button>
					</div>
				</div>
			{:else}
				<!-- Manual Entry Mode -->
				<div class="manual-entry">
					<label for="manual-input" class="manual-label">
						{#if selectedTest === 'pasat3'}
							{t(msfc.enterScore)} ({t(msfc.correctAnswers)})
						{:else}
							{t(msfc.enterTimeSeconds)}
						{/if}
					</label>
					<div class="manual-input-group">
						<input
							id="manual-input"
							type="number"
							bind:value={manualInput[selectedTest]}
							placeholder={selectedTest === 'pasat3' ? '0-60' : '0.0'}
							class="manual-input"
							step={selectedTest === 'pasat3' ? '1' : '0.1'}
						/>
						<button
							onclick={() => handleManualSubmit(selectedTest)}
							class="btn btn-primary"
						>
							{t(msfc.submitManual)}
						</button>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Results Section -->
	{#if msfcStore.hasMinimumForComposite()}
		<div class="results-section">
			<h2 class="section-title">{t(msfc.results)}</h2>

			<!-- Raw Scores -->
			<div class="results-group">
				<h3 class="results-subtitle">{t(msfc.rawScores)}</h3>
				<div class="results-grid">
					{#if testResults.hpt_dominant}
						<div class="result-item">
							<span class="result-label">{t(msfc.dominantHand)}</span>
							<span class="result-value">{testResults.hpt_dominant.toFixed(1)}s</span>
						</div>
					{/if}
					{#if testResults.hpt_non_dominant}
						<div class="result-item">
							<span class="result-label">{t(msfc.nonDominantHand)}</span>
							<span class="result-value">{testResults.hpt_non_dominant.toFixed(1)}s</span>
						</div>
					{/if}
					{#if testResults.hpt_average}
						<div class="result-item">
							<span class="result-label">{t(msfc.averageHand)}</span>
							<span class="result-value">{testResults.hpt_average.toFixed(1)}s</span>
						</div>
					{/if}
					{#if testResults.t25fw}
						<div class="result-item">
							<span class="result-label">{t(msfc.walkTime)}</span>
							<span class="result-value">{testResults.t25fw.toFixed(1)}s</span>
						</div>
					{/if}
					{#if testResults.pasat3}
						<div class="result-item">
							<span class="result-label">{t(msfc.cognitiveScore)}</span>
							<span class="result-value">{testResults.pasat3}/60</span>
						</div>
					{/if}
				</div>
			</div>

			<!-- Z-Scores -->
			<div class="results-group">
				<h3 class="results-subtitle">{t(msfc.zScores)}</h3>
				<div class="results-grid">
					{#if testResults.z_arm !== undefined}
						<div class="result-item">
							<span class="result-label">{t(msfc.armFunction)}</span>
							<span class="result-value {getZScoreColor(testResults.z_arm)}">
								{formatZScore(testResults.z_arm)}
							</span>
						</div>
					{/if}
					{#if testResults.z_leg !== undefined}
						<div class="result-item">
							<span class="result-label">{t(msfc.legFunction)}</span>
							<span class="result-value {getZScoreColor(testResults.z_leg)}">
								{formatZScore(testResults.z_leg)}
							</span>
						</div>
					{/if}
					{#if testResults.z_cognitive !== undefined}
						<div class="result-item">
							<span class="result-label">{t(msfc.cognitiveFunction)}</span>
							<span class="result-value {getZScoreColor(testResults.z_cognitive)}">
								{formatZScore(testResults.z_cognitive)}
							</span>
						</div>
					{/if}
					{#if testResults.composite_z_score !== undefined}
						<div class="result-item composite">
							<span class="result-label">{t(msfc.compositeScore)}</span>
							<span class="result-value {getZScoreColor(testResults.composite_z_score)}">
								{formatZScore(testResults.composite_z_score)}
							</span>
						</div>
					{/if}
				</div>
			</div>

			<!-- Interpretation -->
			<div class="interpretation-section">
				<h3 class="results-subtitle">{t(msfc.interpretationTitle)}</h3>
				<p class="interpretation-text">{t(msfc.interpretationText)}</p>
			</div>
		</div>
	{:else}
		<div class="no-results">
			<p>{t(msfc.completeAllTests)}</p>
		</div>
	{/if}
</div>

<style>
	.msfc-container {
		@apply min-h-screen;
		@apply bg-gradient-to-b from-neuratos-blue-50 to-white;
		@apply dark:from-gray-900 dark:to-gray-800;
		@apply p-4 md:p-8;
	}

	.header {
		@apply max-w-4xl mx-auto mb-8;
		@apply flex flex-col sm:flex-row justify-between items-center gap-4;
	}

	.title {
		@apply text-4xl font-bold text-center sm:text-left;
		@apply text-neuratos-blue-700 dark:text-neuratos-blue-300;
	}

	.subtitle {
		@apply text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left;
	}

	.about-section,
	.age-section,
	.mode-section,
	.test-selection,
	.active-test-section,
	.results-section,
	.no-results {
		@apply max-w-4xl mx-auto mb-6;
		@apply bg-white dark:bg-gray-800;
		@apply rounded-xl shadow-lg p-6;
	}

	.section-title {
		@apply text-2xl font-bold mb-4;
		@apply text-gray-800 dark:text-gray-200;
	}

	.about-text {
		@apply text-gray-700 dark:text-gray-300 mb-4;
	}

	.components-title {
		@apply text-lg font-semibold mb-2;
		@apply text-gray-800 dark:text-gray-200;
	}

	.components-list {
		@apply list-disc list-inside space-y-2;
		@apply text-gray-700 dark:text-gray-300;
	}

	.age-label {
		@apply block mb-2 font-semibold;
		@apply text-gray-700 dark:text-gray-300;
	}

	.age-input-group {
		@apply flex gap-2;
	}

	.age-input {
		@apply flex-1 px-4 py-2 rounded-lg;
		@apply border-2 border-gray-300 dark:border-gray-600;
		@apply bg-white dark:bg-gray-700;
		@apply text-gray-900 dark:text-gray-100;
	}

	.mode-section {
		@apply flex flex-col sm:flex-row items-center gap-4;
	}

	.mode-label {
		@apply text-gray-700 dark:text-gray-300;
	}

	.test-buttons {
		@apply grid grid-cols-1 sm:grid-cols-2 gap-3;
	}

	.test-button {
		@apply px-4 py-3 rounded-lg;
		@apply border-2 border-gray-300 dark:border-gray-600;
		@apply bg-white dark:bg-gray-700;
		@apply text-gray-700 dark:text-gray-300;
		@apply font-medium;
		@apply transition-all duration-200;
		@apply hover:border-neuratos-blue-500;
		@apply flex items-center justify-between;
	}

	.test-button.active {
		@apply border-neuratos-blue-600 bg-neuratos-blue-50 dark:bg-neuratos-blue-900;
		@apply text-neuratos-blue-700 dark:text-neuratos-blue-300;
	}

	.test-button.completed {
		@apply bg-green-50 dark:bg-green-900;
		@apply border-green-500;
	}

	.checkmark {
		@apply text-green-600 dark:text-green-400 font-bold;
	}

	.test-instruction {
		@apply text-gray-600 dark:text-gray-400 mb-4;
	}

	.timer-display {
		@apply text-center;
	}

	.time-value {
		@apply text-6xl font-mono font-bold mb-6;
		@apply text-neuratos-blue-600 dark:text-neuratos-blue-400;
	}

	.timer-controls {
		@apply flex gap-3 justify-center flex-wrap;
	}

	.manual-entry {
		@apply space-y-3;
	}

	.manual-label {
		@apply block font-semibold text-gray-700 dark:text-gray-300;
	}

	.manual-input-group {
		@apply flex gap-2;
	}

	.manual-input {
		@apply flex-1 px-4 py-2 rounded-lg;
		@apply border-2 border-gray-300 dark:border-gray-600;
		@apply bg-white dark:bg-gray-700;
		@apply text-gray-900 dark:text-gray-100;
	}

	.results-group {
		@apply mb-6;
	}

	.results-subtitle {
		@apply text-xl font-semibold mb-3;
		@apply text-gray-800 dark:text-gray-200;
	}

	.results-grid {
		@apply space-y-2;
	}

	.result-item {
		@apply flex justify-between items-center;
		@apply p-3 rounded-lg;
		@apply bg-gray-50 dark:bg-gray-700;
	}

	.result-item.composite {
		@apply bg-neuratos-blue-50 dark:bg-neuratos-blue-900;
		@apply border-2 border-neuratos-blue-500;
	}

	.result-label {
		@apply font-medium text-gray-700 dark:text-gray-300;
	}

	.result-value {
		@apply font-bold text-lg;
	}

	.interpretation-section {
		@apply mt-6 p-4;
		@apply bg-blue-50 dark:bg-blue-900;
		@apply rounded-lg;
	}

	.interpretation-text {
		@apply text-gray-700 dark:text-gray-300;
	}

	.no-results {
		@apply text-center text-gray-600 dark:text-gray-400;
	}

	.btn {
		@apply px-4 py-2 rounded-lg font-semibold;
		@apply transition-all duration-200;
		@apply focus:outline-none focus:ring-2 focus:ring-offset-2;
	}

	.btn-primary {
		@apply bg-neuratos-blue-600 hover:bg-neuratos-blue-700;
		@apply text-white;
		@apply focus:ring-neuratos-blue-500;
	}

	.btn-secondary {
		@apply bg-gray-300 hover:bg-gray-400;
		@apply dark:bg-gray-600 dark:hover:bg-gray-500;
		@apply text-gray-900 dark:text-gray-100;
	}

	.btn-danger {
		@apply bg-red-600 hover:bg-red-700;
		@apply text-white;
		@apply focus:ring-red-500;
	}

	.btn-outline {
		@apply border-2 border-neuratos-blue-600;
		@apply text-neuratos-blue-600 dark:text-neuratos-blue-400;
		@apply hover:bg-neuratos-blue-50 dark:hover:bg-neuratos-blue-900;
	}

	.btn-large {
		@apply px-6 py-3 text-lg;
	}
</style>
