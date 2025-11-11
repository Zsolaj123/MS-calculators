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

<div class="container mx-auto px-4 py-8 max-w-5xl">
	<!-- Header with Language Switcher -->
	<div class="flex justify-between items-center mb-6">
		<div>
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
				{t(pasat.testTitle)}
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400">
				{t(pasat.testSubtitle)}
			</p>
		</div>
		<LanguageSwitcher />
	</div>

	<!-- About PASAT Section -->
	{#if showInstructions && !isActive}
		<div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
			<h2 class="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
				{t(pasat.whatIsPASAT)}
			</h2>
			<p class="text-blue-800 dark:text-blue-200 mb-4">
				{t(pasat.whatIsPASATText)}
			</p>

			<h3 class="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
				{t(pasat.purposeTitle)}
			</h3>
			<p class="text-blue-800 dark:text-blue-200">
				{t(pasat.purposeText)}
			</p>
		</div>

		<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
				{t(pasat.instructionsTitle)}
			</h2>
			<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
				{#each tArray(pasat.instructionsList) as instruction, idx (idx)}
					<li>{instruction}</li>
				{/each}
			</ul>

			<div class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded">
				<p class="text-green-800 dark:text-green-200 font-medium">
					{t(pasat.practiceInstructions)}
				</p>
			</div>

			<div class="mt-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded">
				<p class="text-yellow-800 dark:text-yellow-200 font-medium">
					{t(pasat.mainTestInstructions)}
				</p>
			</div>
		</div>
	{/if}

	<!-- Configuration Section -->
	{#if showConfig && !isActive}
		<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
				{t(pasat.configurationTitle)}
			</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<!-- Version Selection -->
				<div>
					<label for="version" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						{t(pasat.selectVersion)}
					</label>
					<select
						id="version"
						bind:value={selectedVersion}
						onchange={handleVersionChange}
						class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
					>
						<option value="pasat3">{t(pasat.versions.pasat3)}</option>
						<option value="pasat2">{t(pasat.versions.pasat2)}</option>
					</select>
				</div>

				<!-- Age Input -->
				<div>
					<label for="age" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
						class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
					/>
				</div>

				<!-- Education Input -->
				<div>
					<label for="education" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
						class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
					/>
				</div>

				<!-- Audio Settings -->
				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						{t(pasat.audioSettings)}
					</label>
					<button
						type="button"
						onclick={toggleMute}
						class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						{isMuted ? t(pasat.unmuteAudio) : t(pasat.muteAudio)}
						{isMuted ? '🔇' : '🔊'}
					</button>
				</div>
			</div>

			<!-- Start Buttons -->
			<div class="mt-6 flex gap-4">
				<button
					type="button"
					onclick={handleStartPractice}
					class="flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
				>
					{t(pasat.startPractice)}
				</button>
				<button
					type="button"
					onclick={handleSkipPractice}
					class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
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
	/* Additional custom styles if needed */
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
