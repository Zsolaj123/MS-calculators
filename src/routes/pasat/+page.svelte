<script lang="ts">
	import { pasatStore } from '$lib/stores/pasat.svelte';
	import { t, tArray } from '$lib/utils/i18n';
	import { pasat } from '$lib/data/i18n/pasat';
	import LanguageSwitcher from '$lib/components/common/LanguageSwitcher.svelte';
	import type { PASATVersion, PASATResults } from '$lib/data/pasat-reference';

	// Component state
	let selectedVersion = $state<PASATVersion>('pasat3');
	let age = $state<string>('');
	let education = $state<string>('');
	let answerInput = $state<string>('');
	let testResults = $state<PASATResults | null>(null);
	let showConfig = $state<boolean>(true);
	let showInstructions = $state<boolean>(true);

	// Reactive derived state from store
	const isActive = $derived(pasatStore.isActive);
	const isPractice = $derived(pasatStore.isPractice);
	const currentTrial = $derived(pasatStore.currentTrial);
	const totalTrials = $derived(pasatStore.totalTrials);
	const currentDigit = $derived(pasatStore.currentDigit);
	const previousDigit = $derived(pasatStore.previousDigit);
	const progress = $derived(pasatStore.progress);
	const isMuted = $derived(pasatStore.isMuted);

	// Current score during test
	const currentScore = $derived(pasatStore.getCurrentScore());

	// Handlers
	function handleVersionChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedVersion = target.value as PASATVersion;
		pasatStore.setVersion(selectedVersion);
	}

	function handleAgeChange(event: Event) {
		const target = event.target as HTMLInputElement;
		age = target.value;
		const ageNum = parseInt(age);
		if (!isNaN(ageNum) && ageNum > 0) {
			pasatStore.setAge(ageNum);
		}
	}

	function handleEducationChange(event: Event) {
		const target = event.target as HTMLInputElement;
		education = target.value;
		const eduNum = parseInt(education);
		if (!isNaN(eduNum) && eduNum >= 0) {
			pasatStore.setEducation(eduNum);
		}
	}

	function handleStartPractice() {
		showConfig = false;
		showInstructions = false;
		testResults = null;
		pasatStore.startPractice();
	}

	function handleSkipPractice() {
		handleStartMainTest();
	}

	function handleStartMainTest() {
		showConfig = false;
		showInstructions = false;
		testResults = null;
		pasatStore.startMainTest();
	}

	function handleSubmitAnswer() {
		const answer = parseInt(answerInput);
		if (!isNaN(answer) && answer >= 2 && answer <= 18) {
			pasatStore.submitAnswer(answer);
			answerInput = '';
		}
	}

	function handleSkipTrial() {
		pasatStore.skipTrial();
		answerInput = '';
	}

	function handleEndTest() {
		pasatStore.endTest();
		testResults = pasatStore.calculateResults();
	}

	function handleReset() {
		pasatStore.initialize();
		testResults = null;
		answerInput = '';
		showConfig = true;
		showInstructions = true;
	}

	function toggleMute() {
		pasatStore.toggleMute();
	}

	// Keyboard support for answer input
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubmitAnswer();
		} else if (event.key === 'Escape') {
			handleSkipTrial();
		}
	}

	// Format z-score display
	function formatZScore(value: number | undefined): string {
		if (value === undefined) return 'N/A';
		return value.toFixed(2);
	}

	// Get z-score color
	function getZScoreColor(value: number | undefined): string {
		if (value === undefined) return 'text-gray-500';
		if (value >= -1.0) return 'text-green-600 dark:text-green-400';
		if (value >= -2.0) return 'text-yellow-600 dark:text-yellow-400';
		if (value >= -3.0) return 'text-orange-600 dark:text-orange-400';
		return 'text-red-600 dark:text-red-400';
	}

	// Get performance interpretation
	function getPerformanceInterpretation(zScore: number | undefined): string {
		if (zScore === undefined) return '';
		if (zScore >= -1.0) return t(pasat.performanceLevels.normal.label);
		if (zScore >= -2.0) return t(pasat.performanceLevels.borderline.label);
		if (zScore >= -3.0) return t(pasat.performanceLevels.impaired.label);
		return t(pasat.performanceLevels.severelyImpaired.label);
	}

	// Format time in milliseconds to seconds
	function formatTime(ms: number): string {
		return (ms / 1000).toFixed(2) + 's';
	}

	// Format duration to minutes:seconds
	function formatDuration(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>{t(pasat.pageTitle)}</title>
	<meta name="description" content={t(pasat.pageDescription)} />
</svelte:head>

<div class="page-container">
	<!-- Header with Language Switcher -->
	<div class="page-header">
		<div class="header-content">
			<h1 class="page-title">
				🔢 {t(pasat.testTitle)}
			</h1>
			<p class="page-subtitle">
				{t(pasat.testSubtitle)}
			</p>
		</div>
		<LanguageSwitcher />
	</div>

	<!-- About PASAT Section -->
	{#if showInstructions && !isActive}
		<div class="info-card info-blue">
			<h2 class="info-title">
				{t(pasat.whatIsPASAT)}
			</h2>
			<p class="info-text">
				{t(pasat.whatIsPASATText)}
			</p>

			<h3 class="info-subtitle">
				{t(pasat.purposeTitle)}
			</h3>
			<p class="info-text">
				{t(pasat.purposeText)}
			</p>
		</div>

		<div class="content-card">
			<h2 class="card-title">
				{t(pasat.instructionsTitle)}
			</h2>
			<ul class="instructions-list">
				{#each tArray(pasat.instructionsList) as instruction, idx (idx)}
					<li>{instruction}</li>
				{/each}
			</ul>

			<div class="hint-box hint-green">
				<p>
					{t(pasat.practiceInstructions)}
				</p>
			</div>

			<div class="hint-box hint-yellow">
				<p>
					{t(pasat.mainTestInstructions)}
				</p>
			</div>
		</div>
	{/if}

	<!-- Configuration Section -->
	{#if showConfig && !isActive}
		<div class="content-card">
			<h2 class="card-title">
				{t(pasat.configurationTitle)}
			</h2>

			<div class="config-grid">
				<!-- Version Selection -->
				<div class="form-group">
					<label for="version" class="form-label">
						{t(pasat.selectVersion)}
					</label>
					<select
						id="version"
						bind:value={selectedVersion}
						onchange={handleVersionChange}
						class="form-select"
					>
						<option value="pasat3">{t(pasat.versions.pasat3)}</option>
						<option value="pasat2">{t(pasat.versions.pasat2)}</option>
					</select>
				</div>

				<!-- Age Input -->
				<div class="form-group">
					<label for="age" class="form-label">
						{t(pasat.age)}
					</label>
					<input
						id="age"
						type="number"
						min="18"
						max="100"
						bind:value={age}
						oninput={handleAgeChange}
						placeholder="30"
						class="form-input"
					/>
				</div>

				<!-- Education Input -->
				<div class="form-group">
					<label for="education" class="form-label">
						{t(pasat.yearsOfEducation)}
					</label>
					<input
						id="education"
						type="number"
						min="0"
						max="30"
						bind:value={education}
						oninput={handleEducationChange}
						placeholder="12"
						class="form-input"
					/>
				</div>

				<!-- Audio Settings -->
				<div class="form-group">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<span class="form-label">
						{t(pasat.audioSettings)}
					</span>
					<button
						type="button"
						onclick={toggleMute}
						class="audio-toggle"
					>
						{isMuted ? t(pasat.unmuteAudio) : t(pasat.muteAudio)}
						{isMuted ? '🔇' : '🔊'}
					</button>
				</div>
			</div>

			<!-- Start Buttons -->
			<div class="action-buttons">
				<button
					type="button"
					onclick={handleStartPractice}
					class="action-btn success"
				>
					{t(pasat.startPractice)}
				</button>
				<button
					type="button"
					onclick={handleSkipPractice}
					class="action-btn primary"
				>
					{t(pasat.startTest)}
				</button>
			</div>
		</div>
	{/if}

	<!-- Test In Progress -->
	{#if isActive}
		<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
			<div class="mb-4">
				<div class="flex justify-between items-center mb-2">
					<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
						{isPractice ? t(pasat.practiceTitle) : t(pasat.testInProgress)}
					</h2>
					<button
						type="button"
						onclick={handleEndTest}
						class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
					>
						{t(pasat.endTest)}
					</button>
				</div>

				<!-- Progress Bar -->
				<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
					<div
						class="bg-blue-600 h-3 rounded-full transition-all duration-300"
						style="width: {progress}%"
					></div>
				</div>
				<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
					{t(pasat.trialsCompleted)} {currentTrial} / {totalTrials}
				</p>
			</div>

			<!-- Current Digits Display -->
			<div class="grid grid-cols-2 gap-4 mb-6">
				<div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
						{t(pasat.previousDigit)}
					</p>
					<p class="text-5xl font-bold text-gray-900 dark:text-white">
						{previousDigit !== null ? previousDigit : '-'}
					</p>
				</div>
				<div class="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-lg text-center">
					<p class="text-sm text-blue-600 dark:text-blue-400 mb-2">
						{t(pasat.currentDigit)}
					</p>
					<p class="text-5xl font-bold text-blue-900 dark:text-blue-100">
						{currentDigit !== null ? currentDigit : '-'}
					</p>
				</div>
			</div>

			<!-- Answer Input -->
			{#if previousDigit !== null}
				<div class="mb-6">
					<label for="answer" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						{t(pasat.enterYourAnswer)}
					</label>
					<div class="flex gap-2">
						<input
							id="answer"
							type="number"
							min="2"
							max="18"
							bind:value={answerInput}
							onkeypress={handleKeyPress}
							placeholder={t(pasat.answerPlaceholder)}
							autofocus
							class="flex-1 px-4 py-3 text-2xl border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						/>
						<button
							type="button"
							onclick={handleSubmitAnswer}
							disabled={!answerInput}
							class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{t(pasat.submitAnswer)}
						</button>
						<button
							type="button"
							onclick={handleSkipTrial}
							class="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
						>
							{t(pasat.skipTrial)}
						</button>
					</div>
					<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
						Press Enter to submit, Esc to skip
					</p>
				</div>
			{/if}

			<!-- Current Score -->
			<div class="grid grid-cols-4 gap-4 text-center">
				<div class="bg-green-50 dark:bg-green-900/20 p-4 rounded">
					<p class="text-sm text-green-700 dark:text-green-400">{t(pasat.correctAnswers)}</p>
					<p class="text-2xl font-bold text-green-900 dark:text-green-100">{currentScore.correct}</p>
				</div>
				<div class="bg-red-50 dark:bg-red-900/20 p-4 rounded">
					<p class="text-sm text-red-700 dark:text-red-400">{t(pasat.incorrectAnswers)}</p>
					<p class="text-2xl font-bold text-red-900 dark:text-red-100">{currentScore.incorrect}</p>
				</div>
				<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded">
					<p class="text-sm text-gray-700 dark:text-gray-400">{t(pasat.omissions)}</p>
					<p class="text-2xl font-bold text-gray-900 dark:text-white">{currentScore.omissions}</p>
				</div>
				<div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
					<p class="text-sm text-blue-700 dark:text-blue-400">{t(pasat.percentCorrect)}</p>
					<p class="text-2xl font-bold text-blue-900 dark:text-blue-100">
						{currentScore.percentCorrect.toFixed(1)}%
					</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Results Display -->
	{#if testResults}
		<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
			<h2 class="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
				{t(pasat.testComplete)}
			</h2>

			<!-- Raw Scores -->
			<div class="mb-6">
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
					{t(pasat.rawScores)}
				</h3>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded">
						<p class="text-sm text-gray-600 dark:text-gray-400">{t(pasat.totalTrials)}</p>
						<p class="text-2xl font-bold text-gray-900 dark:text-white">{testResults.totalTrials}</p>
					</div>
					<div class="bg-green-50 dark:bg-green-900/20 p-4 rounded">
						<p class="text-sm text-green-700 dark:text-green-400">{t(pasat.correctResponses)}</p>
						<p class="text-2xl font-bold text-green-900 dark:text-green-100">{testResults.correctResponses}</p>
					</div>
					<div class="bg-red-50 dark:bg-red-900/20 p-4 rounded">
						<p class="text-sm text-red-700 dark:text-red-400">{t(pasat.incorrectResponses)}</p>
						<p class="text-2xl font-bold text-red-900 dark:text-red-100">{testResults.incorrectResponses}</p>
					</div>
					<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded">
						<p class="text-sm text-gray-600 dark:text-gray-400">{t(pasat.omissionsCount)}</p>
						<p class="text-2xl font-bold text-gray-900 dark:text-white">{testResults.omissions}</p>
					</div>
				</div>

				<div class="mt-4 grid grid-cols-2 gap-4">
					<div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
						<p class="text-sm text-blue-700 dark:text-blue-400">{t(pasat.rawScore)}</p>
						<p class="text-3xl font-bold text-blue-900 dark:text-blue-100">{testResults.rawScore} / 60</p>
					</div>
					<div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
						<p class="text-sm text-blue-700 dark:text-blue-400">{t(pasat.percentageCorrect)}</p>
						<p class="text-3xl font-bold text-blue-900 dark:text-blue-100">
							{testResults.percentCorrect.toFixed(1)}%
						</p>
					</div>
				</div>
			</div>

			<!-- Z-Scores -->
			<div class="mb-6">
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
					{t(pasat.zScoresTitle)}
				</h3>
				<div class="space-y-3">
					<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
						<span class="text-gray-700 dark:text-gray-300">{t(pasat.standardZScore)}</span>
						<span class="text-xl font-bold {getZScoreColor(testResults.zScore)}">
							{formatZScore(testResults.zScore)}
						</span>
					</div>
					{#if testResults.zScoreAge !== undefined}
						<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
							<span class="text-gray-700 dark:text-gray-300">{t(pasat.ageAdjustedZScore)}</span>
							<span class="text-xl font-bold {getZScoreColor(testResults.zScoreAge)}">
								{formatZScore(testResults.zScoreAge)}
							</span>
						</div>
					{/if}
					{#if testResults.zScoreEducation !== undefined}
						<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
							<span class="text-gray-700 dark:text-gray-300">{t(pasat.educationAdjustedZScore)}</span>
							<span class="text-xl font-bold {getZScoreColor(testResults.zScoreEducation)}">
								{formatZScore(testResults.zScoreEducation)}
							</span>
						</div>
					{/if}
				</div>
			</div>

			<!-- Performance Interpretation -->
			<div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
				<h3 class="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
					{t(pasat.interpretationTitle)}
				</h3>
				<p class="text-lg text-blue-800 dark:text-blue-200">
					<span class="font-semibold">{t(pasat.performanceLevel)}</span>
					{getPerformanceInterpretation(testResults.zScore)}
				</p>
			</div>

			<!-- Timing Statistics -->
			{#if testResults.testDuration}
				<div class="mb-6">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
						{t(pasat.timingStatsTitle)}
					</h3>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
						<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded">
							<p class="text-sm text-gray-600 dark:text-gray-400">{t(pasat.testDuration)}</p>
							<p class="text-xl font-bold text-gray-900 dark:text-white">
								{formatDuration(testResults.testDuration)}
							</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Reset Button -->
			<div class="flex gap-4">
				<button
					type="button"
					onclick={handleReset}
					class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
				>
					{t(pasat.resetTest)}
				</button>
			</div>
		</div>
	{/if}

	<!-- Reference Information -->
	{#if !isActive}
		<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				{t(pasat.referenceTitle)}
			</h2>
			<div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
				<p>{t(pasat.referenceText)}</p>
				<p>{t(pasat.bicamsReference)}</p>
			</div>

			<div class="mt-4">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
					{t(pasat.clinicalUse)}
				</h3>
				<p class="text-sm text-gray-700 dark:text-gray-300">
					{t(pasat.clinicalUseText)}
				</p>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Galaxy Dark Theme for PASAT */
	.page-container {
		min-height: 100vh;
		padding: 2rem 1rem;
		background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
	}

	.page-header {
		max-width: 72rem;
		margin: 0 auto 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.header-content {
		flex: 1;
	}

	.page-title {
		font-size: 2rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 0.5rem;
	}

	.page-subtitle {
		font-size: 1rem;
		color: #808090;
	}

	/* Info Cards */
	.info-card {
		max-width: 72rem;
		margin: 0 auto 1.5rem;
		padding: 1.5rem;
		border-radius: 12px;
	}

	.info-card.info-blue {
		background: rgba(59, 130, 246, 0.1);
		border: 2px solid rgba(59, 130, 246, 0.3);
	}

	.info-title {
		font-size: 1.375rem;
		font-weight: 600;
		color: #3b82f6;
		margin-bottom: 0.75rem;
	}

	.info-subtitle {
		font-size: 1.125rem;
		font-weight: 600;
		color: #3b82f6;
		margin: 1rem 0 0.5rem;
	}

	.info-text {
		font-size: 0.9375rem;
		color: #a0a0b0;
		line-height: 1.6;
	}

	/* Content Cards */
	.content-card {
		max-width: 72rem;
		margin: 0 auto 1.5rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 2px solid #32303e;
		border-radius: 12px;
	}

	.card-title {
		font-size: 1.375rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 1.25rem;
	}

	.instructions-list {
		list-style-type: disc;
		list-style-position: inside;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		color: #a0a0b0;
		font-size: 0.9375rem;
	}

	.hint-box {
		margin-top: 1rem;
		padding: 1rem;
		border-radius: 8px;
		font-size: 0.9375rem;
		font-weight: 500;
	}

	.hint-box.hint-green {
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.3);
		color: #10b981;
	}

	.hint-box.hint-yellow {
		background: rgba(245, 158, 11, 0.1);
		border: 1px solid rgba(245, 158, 11, 0.3);
		color: #f59e0b;
	}

	/* Forms */
	.config-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #a0a0b0;
	}

	.form-input,
	.form-select {
		padding: 0.75rem 1rem;
		font-size: 0.9375rem;
		background: #0f172a;
		color: #e0e0f0;
		border: 2px solid #32303e;
		border-radius: 8px;
		min-height: 44px;
	}

	.form-input:focus,
	.form-select:focus {
		outline: none;
		border-color: #3b82f6;
	}

	.form-select option {
		background: #0f172a;
		color: #e0e0f0;
	}

	.audio-toggle {
		width: 100%;
		padding: 0.75rem 1rem;
		font-size: 0.9375rem;
		font-weight: 500;
		background: #0f172a;
		color: #a0a0b0;
		border: 2px solid #32303e;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.15s ease;
		min-height: 44px;
	}

	.audio-toggle:hover {
		border-color: #3b82f6;
		color: #e0e0f0;
	}

	/* Action Buttons */
	.action-buttons {
		display: flex;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.action-btn {
		flex: 1;
		padding: 0.875rem 1.5rem;
		font-size: 1rem;
		font-weight: 600;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.15s ease;
		min-height: 48px;
		border: none;
	}

	.action-btn.primary {
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		color: #fff;
	}

	.action-btn.primary:hover {
		box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
	}

	.action-btn.success {
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		color: #fff;
	}

	.action-btn.success:hover {
		box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
	}

	.action-btn.danger {
		background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
		color: #fff;
	}

	.action-btn.secondary {
		background: transparent;
		color: #a0a0b0;
		border: 2px solid #32303e;
	}

	.action-btn.secondary:hover {
		border-color: #3b82f6;
		color: #3b82f6;
	}

	.action-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Test Area (keep tailwind classes for now, will be styled via globals) */

	/* Number Input Styling */
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.page-container {
			padding: 1rem;
		}

		.page-title {
			font-size: 1.5rem;
		}

		.config-grid {
			grid-template-columns: 1fr;
		}

		.action-buttons {
			flex-direction: column;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.action-btn,
		.audio-toggle {
			transition: none;
		}
	}
</style>
