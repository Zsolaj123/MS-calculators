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
	/* Galaxy Dark Theme for MSFC */
	.msfc-container {
		min-height: 100vh;
		padding: 1.5rem;
		background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
	}

	.header {
		max-width: 56rem;
		margin: 0 auto 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.header {
			flex-direction: row;
		}
	}

	.title {
		font-size: 2rem;
		font-weight: 700;
		color: #fff;
		text-align: center;
	}

	@media (min-width: 640px) {
		.title {
			text-align: left;
		}
	}

	.subtitle {
		font-size: 0.875rem;
		color: #808090;
		text-align: center;
	}

	@media (min-width: 640px) {
		.subtitle {
			text-align: left;
		}
	}

	.about-section,
	.age-section,
	.mode-section,
	.test-selection,
	.active-test-section,
	.results-section,
	.no-results {
		max-width: 56rem;
		margin: 0 auto 1.5rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 2px solid #32303e;
		border-radius: 12px;
	}

	.section-title {
		font-size: 1.375rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 1rem;
	}

	.about-text {
		font-size: 0.9375rem;
		color: #a0a0b0;
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.components-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: #e0e0f0;
		margin-bottom: 0.5rem;
	}

	.components-list {
		list-style-type: disc;
		list-style-position: inside;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		color: #a0a0b0;
		font-size: 0.9375rem;
	}

	.age-label,
	.manual-label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #a0a0b0;
	}

	.age-input-group,
	.manual-input-group {
		display: flex;
		gap: 0.75rem;
	}

	.age-input,
	.manual-input {
		flex: 1;
		padding: 0.75rem 1rem;
		font-size: 0.9375rem;
		background: #0f172a;
		color: #e0e0f0;
		border: 2px solid #32303e;
		border-radius: 8px;
		min-height: 44px;
	}

	.age-input:focus,
	.manual-input:focus {
		outline: none;
		border-color: #3b82f6;
	}

	.mode-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.mode-section {
			flex-direction: row;
		}
	}

	.mode-label {
		color: #a0a0b0;
	}

	.mode-label strong {
		color: #3b82f6;
	}

	.test-buttons {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.test-buttons {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.test-button {
		padding: 1rem;
		font-size: 0.9375rem;
		font-weight: 500;
		background: #0f172a;
		color: #a0a0b0;
		border: 2px solid #32303e;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 48px;
	}

	.test-button:hover {
		border-color: #3b82f6;
		color: #e0e0f0;
	}

	.test-button.active {
		border-color: #3b82f6;
		background: rgba(59, 130, 246, 0.15);
		color: #3b82f6;
	}

	.test-button.completed {
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.1);
	}

	.checkmark {
		color: #10b981;
		font-weight: 700;
	}

	.test-instruction {
		font-size: 0.9375rem;
		color: #808090;
		margin-bottom: 1.5rem;
	}

	.timer-display {
		text-align: center;
	}

	.time-value {
		font-size: 4rem;
		font-family: monospace;
		font-weight: 700;
		color: #3b82f6;
		margin-bottom: 1.5rem;
	}

	.timer-controls {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.manual-entry {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.results-group {
		margin-bottom: 1.5rem;
	}

	.results-subtitle {
		font-size: 1.125rem;
		font-weight: 600;
		color: #e0e0f0;
		margin-bottom: 0.75rem;
	}

	.results-grid {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.result-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.875rem 1rem;
		background: #0f172a;
		border-radius: 8px;
	}

	.result-item.composite {
		background: rgba(59, 130, 246, 0.15);
		border: 2px solid rgba(59, 130, 246, 0.5);
	}

	.result-label {
		font-weight: 500;
		color: #a0a0b0;
	}

	.result-value {
		font-weight: 700;
		font-size: 1.125rem;
		color: #e0e0f0;
	}

	.interpretation-section {
		margin-top: 1.5rem;
		padding: 1rem;
		background: rgba(59, 130, 246, 0.1);
		border: 1px solid rgba(59, 130, 246, 0.3);
		border-radius: 8px;
	}

	.interpretation-text {
		font-size: 0.9375rem;
		color: #a0a0b0;
		line-height: 1.6;
	}

	.no-results {
		text-align: center;
		color: #808090;
	}

	/* Buttons */
	.btn {
		padding: 0.75rem 1.5rem;
		font-size: 0.9375rem;
		font-weight: 600;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.15s ease;
		min-height: 44px;
		border: none;
	}

	.btn-primary {
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		color: #fff;
	}

	.btn-primary:hover {
		box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
	}

	.btn-secondary {
		background: #0f172a;
		color: #a0a0b0;
		border: 2px solid #32303e;
	}

	.btn-secondary:hover {
		border-color: #3b82f6;
		color: #e0e0f0;
	}

	.btn-danger {
		background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
		color: #fff;
	}

	.btn-danger:hover {
		box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);
	}

	.btn-outline {
		background: transparent;
		color: #3b82f6;
		border: 2px solid #3b82f6;
	}

	.btn-outline:hover {
		background: rgba(59, 130, 246, 0.1);
	}

	.btn-large {
		padding: 1rem 2rem;
		font-size: 1.125rem;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.msfc-container {
			padding: 1rem;
		}

		.title {
			font-size: 1.5rem;
		}

		.time-value {
			font-size: 3rem;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.test-button,
		.btn {
			transition: none;
		}
	}
</style>
