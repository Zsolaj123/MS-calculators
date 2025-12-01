<script lang="ts">
	import { sdmtStore } from '$lib/stores/sdmt.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { VoiceInput } from '$lib/components/ui';

	let currentSymbol = $derived(sdmtStore.getCurrentSymbol());
	let symbolCount = $derived(sdmtStore.getSymbolCount());
	let timeLeft = $derived(sdmtStore.timeLeft);
	let isPractice = $derived(sdmtStore.currentMode === 'practice');
	let isPaused = $derived(sdmtStore.isPaused);
	let lastAnswerCorrect = $derived(sdmtStore.lastAnswerCorrect);
	let currentScore = $derived(isPractice ? sdmtStore.state.practiceScore : sdmtStore.score);
	let currentIndex = $derived(sdmtStore.currentItemIndex);
	let symbolSize = $derived(sdmtStore.symbolSize);
	let theme = $derived(sdmtStore.theme);
	let colorScheme = $derived(sdmtStore.colorScheme);
	let inputMode = $derived(sdmtStore.inputMode);
	let voiceLanguage = $derived(sdmtStore.voiceLanguage);

	// Generate button array based on symbol count
	let buttons = $derived(Array.from({ length: symbolCount }, (_, i) => i + 1));

	// Format time left as MM:SS
	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	// Handle number button click
	function handleAnswer(digit: number) {
		if (isPaused) return;
		sdmtStore.submitAnswer(digit);
	}

	// Handle keyboard input
	function handleKeydown(event: KeyboardEvent) {
		if (isPaused) return;

		const key = event.key;
		const digit = parseInt(key);

		if (digit >= 1 && digit <= symbolCount) {
			event.preventDefault();
			handleAnswer(digit);
		} else if (key === ' ' || key === 'Escape') {
			event.preventDefault();
			togglePause();
		}
	}

	// Toggle pause state
	function togglePause() {
		if (!isPractice) {
			if (isPaused) {
				sdmtStore.resumeTest();
			} else {
				sdmtStore.pauseTest();
			}
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeydown);
	});

	// Symbol size in pixels
	const symbolSizePx = sdmtStore.getSymbolSizePixels();

	// Color scheme classes (derived to be reactive)
	const buttonColorClass = $derived.by(() => {
		const colorClasses = {
			blue: 'bg-neuratos-blue-500 hover:bg-neuratos-blue-600 active:bg-neuratos-blue-700',
			green: 'bg-green-500 hover:bg-green-600 active:bg-green-700',
			purple: 'bg-purple-500 hover:bg-purple-600 active:bg-purple-700',
			teal: 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700'
		};
		return colorClasses[colorScheme];
	});
</script>

<div class="sdmt-test-container" class:dark={theme === 'dark'}>
	<!-- Practice/Test Header -->
	<div class="test-header mb-6">
		<div class="flex justify-between items-center">
			<div class="test-info">
				<h2 class="text-2xl font-bold text-neuratos-blue-700 dark:text-neuratos-blue-300">
					{#if isPractice}
						🎓 Gyakorlás
					{:else}
						🧪 Teszt
					{/if}
				</h2>
				<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
					{#if isPractice}
						10 gyakorló feladat - Nincs időkorlát
					{:else}
						90 másodperc - Válaszolj gyorsan és pontosan!
					{/if}
				</p>
			</div>

			{#if !isPractice}
				<div class="timer-display">
					<div
						class="text-4xl font-bold tabular-nums"
						class:text-red-600={timeLeft <= 10}
						class:text-yellow-600={timeLeft > 10 && timeLeft <= 30}
						class:text-neuratos-blue-600={timeLeft > 30}
					>
						{formatTime(timeLeft)}
					</div>
				</div>
			{/if}
		</div>

		<!-- Progress Bar -->
		<div class="progress-section mt-4">
			<div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
				<span>Helyes válaszok: <strong class="text-neuratos-blue-600 dark:text-neuratos-blue-400">{currentScore}</strong></span>
				{#if isPractice}
					<span>Feladat: {currentIndex + 1} / 10</span>
				{:else}
					<span>Válaszolt: {currentIndex}</span>
				{/if}
			</div>
			{#if isPractice}
				<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
					<div
						class="bg-neuratos-blue-500 h-2 rounded-full transition-all duration-300"
						style="width: {((currentIndex) / 10) * 100}%"
					></div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Main Test Area -->
	<div class="test-area relative">
		<!-- Visual Feedback Overlay -->
		{#if lastAnswerCorrect !== null}
			<div
				class="feedback-overlay"
				class:feedback-correct={lastAnswerCorrect}
				class:feedback-incorrect={!lastAnswerCorrect}
			>
				{#if lastAnswerCorrect}
					<div class="feedback-icon text-6xl">✓</div>
				{:else}
					<div class="feedback-icon text-6xl">✗</div>
				{/if}
			</div>
		{/if}

		<!-- Pause Overlay -->
		{#if isPaused}
			<div class="pause-overlay">
				<div class="pause-card">
					<h3 class="text-2xl font-bold mb-4">⏸️ Szünet</h3>
					<p class="text-gray-600 dark:text-gray-300 mb-6">
						A teszt szünetel. Maradék idő: <strong>{formatTime(timeLeft)}</strong>
					</p>
					<button onclick={togglePause} class="btn btn-primary w-full">
						▶️ Folytatás
					</button>
				</div>
			</div>
		{/if}

		<!-- Current Symbol Display -->
		{#if currentSymbol}
			<div class="symbol-display-card">
				<p class="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
					Melyik szám tartozik ehhez a szimbólumhoz?
				</p>
				<div
					class="current-symbol"
					style="width: {symbolSizePx}px; height: {symbolSizePx}px;"
				>
					{@html currentSymbol.svgHtml}
				</div>
			</div>
		{:else}
			<div class="no-symbol-message">
				<p class="text-gray-500 dark:text-gray-400">Nincs több feladat</p>
			</div>
		{/if}

		<!-- Input Area: Number Pad or Voice Input -->
		{#if inputMode === 'voice'}
			<div class="voice-input-area mt-8">
				<VoiceInput
					onResult={handleAnswer}
					language={voiceLanguage}
					disabled={isPaused}
					maxDigit={symbolCount}
				/>
				<p class="voice-hint">
					{voiceLanguage === 'hu-HU'
						? '💡 Mondj egy számot 1-től ' + symbolCount + '-ig'
						: '💡 Say a number from 1 to ' + symbolCount}
				</p>
			</div>
		{:else}
			<div class="number-pad mt-8 grid-cols-3">
				{#each buttons as digit (digit)}
					<button
						type="button"
						class="number-button {buttonColorClass}"
						onclick={() => handleAnswer(digit)}
						disabled={isPaused}
					>
						{digit}
					</button>
				{/each}
			</div>
		{/if}

		<!-- Controls -->
		{#if !isPractice}
			<div class="test-controls mt-6">
				<button
					type="button"
					onclick={togglePause}
					class="btn btn-secondary w-full"
				>
					{#if isPaused}
						▶️ Folytatás
					{:else}
						⏸️ Szünet
					{/if}
				</button>
			</div>
		{/if}
	</div>

	<!-- Keyboard Shortcuts Help -->
	<div class="keyboard-help mt-6">
		<p class="text-xs text-gray-500 dark:text-gray-400 text-center">
			{#if inputMode === 'keyboard'}
				💡 Billentyűzet: Használd az <kbd>1</kbd>-<kbd>{symbolCount}</kbd> gombokat a válaszadáshoz.
			{:else}
				🎤 Hangvezérlés aktív - Mondd ki a számot!
			{/if}
			{#if !isPractice}
				<kbd>SPACE</kbd> vagy <kbd>ESC</kbd> a szünethez.
			{/if}
		</p>
	</div>
</div>

<style>
	.sdmt-test-container {
		@apply w-full max-w-3xl mx-auto p-6;
	}

	.test-header {
		@apply bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm;
	}

	.timer-display {
		@apply bg-gradient-to-br from-neuratos-blue-50 to-neuratos-blue-100 dark:from-gray-700 dark:to-gray-800;
		@apply rounded-lg px-6 py-4 shadow-sm;
	}

	.test-area {
		@apply bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm;
	}

	.symbol-display-card {
		@apply flex flex-col items-center justify-center;
		@apply bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800;
		@apply rounded-xl p-8 min-h-[200px];
	}

	.current-symbol {
		@apply flex items-center justify-center;
		@apply bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md;
		@apply transition-all duration-200;
	}

	.current-symbol :global(svg) {
		@apply w-full h-full;
	}

	.number-pad {
		@apply grid gap-3;
	}

	.voice-input-area {
		@apply flex flex-col items-center;
	}

	.voice-hint {
		@apply mt-4 text-sm text-gray-500 dark:text-gray-400 text-center;
	}

	.number-button {
		@apply text-white text-2xl font-bold rounded-lg;
		@apply min-h-[60px] min-w-[60px] sm:min-h-[70px] sm:min-w-[70px];
		@apply transition-all duration-150 ease-in-out;
		@apply shadow-md hover:shadow-lg active:shadow-sm;
		@apply disabled:opacity-50 disabled:cursor-not-allowed;
		@apply focus:outline-none focus:ring-4 focus:ring-offset-2;
	}

	.test-controls {
		@apply flex gap-3;
	}

	/* Feedback Overlay */
	.feedback-overlay {
		@apply absolute inset-0 z-20 flex items-center justify-center;
		@apply pointer-events-none;
		animation: fadeInOut 400ms ease-in-out;
	}

	.feedback-correct {
		@apply bg-green-500 bg-opacity-20;
	}

	.feedback-incorrect {
		@apply bg-red-500 bg-opacity-20;
	}

	.feedback-icon {
		@apply font-bold;
	}

	.feedback-correct .feedback-icon {
		@apply text-green-600 dark:text-green-400;
	}

	.feedback-incorrect .feedback-icon {
		@apply text-red-600 dark:text-red-400;
	}

	@keyframes fadeInOut {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(0.9);
		}
	}

	/* Pause Overlay */
	.pause-overlay {
		@apply absolute inset-0 z-30 flex items-center justify-center;
		@apply bg-gray-900 bg-opacity-75 backdrop-blur-sm;
	}

	.pause-card {
		@apply bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl;
		@apply max-w-md w-full mx-4;
	}

	.no-symbol-message {
		@apply flex items-center justify-center min-h-[200px];
		@apply text-xl font-medium;
	}

	.keyboard-help kbd {
		@apply bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono;
	}

	/* Dark mode adjustments */
	.dark .test-area {
		@apply border border-gray-700;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.sdmt-test-container {
			@apply p-4;
		}

		.test-header {
			@apply p-4;
		}

		.test-area {
			@apply p-4;
		}

		.symbol-display-card {
			@apply p-4;
		}

		.timer-display {
			@apply px-4 py-3;
		}

		.timer-display .text-4xl {
			@apply text-3xl;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.feedback-overlay {
			animation: none;
		}

		.number-button,
		.current-symbol {
			transition: none;
		}
	}
</style>
