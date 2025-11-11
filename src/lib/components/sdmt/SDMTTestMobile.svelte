<script lang="ts">
	import { sdmtStore } from '$lib/stores/sdmt.svelte';
	import { onMount, onDestroy } from 'svelte';

	let currentSymbol = $derived(sdmtStore.getCurrentSymbol());
	let symbolCount = $derived(sdmtStore.getSymbolCount());
	let symbolDigitKey = $derived(sdmtStore.symbolDigitKey);
	let timeLeft = $derived(sdmtStore.timeLeft);
	let isPractice = $derived(sdmtStore.currentMode === 'practice');
	let isPaused = $derived(sdmtStore.isPaused);
	let lastAnswerCorrect = $derived(sdmtStore.lastAnswerCorrect);
	let currentScore = $derived(isPractice ? sdmtStore.state.practiceScore : sdmtStore.score);
	let currentIndex = $derived(sdmtStore.currentItemIndex);
	let theme = $derived(sdmtStore.theme);
	let colorScheme = $derived(sdmtStore.colorScheme);

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

	// Color scheme classes
	const buttonColorClass = $derived.by(() => {
		const colorClasses = {
			blue: 'bg-neuratos-blue-500 active:bg-neuratos-blue-700',
			green: 'bg-green-500 active:bg-green-700',
			purple: 'bg-purple-500 active:bg-purple-700',
			teal: 'bg-teal-500 active:bg-teal-700'
		};
		return colorClasses[colorScheme];
	});

	const keyColorClass = $derived.by(() => {
		const colorClasses = {
			blue: 'bg-neuratos-blue-50 dark:bg-neuratos-blue-900',
			green: 'bg-green-50 dark:bg-green-900',
			purple: 'bg-purple-50 dark:bg-purple-900',
			teal: 'bg-teal-50 dark:bg-teal-900'
		};
		return colorClasses[colorScheme];
	});
</script>

<div class="sdmt-mobile-container" class:dark={theme === 'dark'}>
	<!-- Top Section: Symbol Key -->
	<div class="symbol-key-section">
		<div class="key-grid">
			{#each symbolDigitKey as item (item.symbolIndex)}
				<div class="key-item {keyColorClass}">
					<div class="key-symbol">
						{@html item.svgHtml}
					</div>
					<div class="key-digit">
						{item.digit}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Status Bar -->
	<div class="status-bar">
		<div class="status-left">
			{#if !isPractice}
				<div class="timer" class:timer-warning={timeLeft <= 10}>
					⏱️ {formatTime(timeLeft)}
				</div>
			{:else}
				<div class="practice-label">
					🎓 Gyakorlás {currentIndex + 1}/10
				</div>
			{/if}
		</div>
		<div class="status-right">
			<div class="score">
				✓ {currentScore}
			</div>
		</div>
	</div>

	<!-- Middle Section: Current Symbol -->
	<div class="current-symbol-section">
		<!-- Visual Feedback Overlay -->
		{#if lastAnswerCorrect !== null}
			<div
				class="feedback-overlay"
				class:feedback-correct={lastAnswerCorrect}
				class:feedback-incorrect={!lastAnswerCorrect}
			>
				{#if lastAnswerCorrect}
					<div class="feedback-icon">✓</div>
				{:else}
					<div class="feedback-icon">✗</div>
				{/if}
			</div>
		{/if}

		<!-- Pause Overlay -->
		{#if isPaused}
			<div class="pause-overlay">
				<div class="pause-content">
					<div class="pause-icon">⏸️</div>
					<h3 class="pause-title">Szünet</h3>
					<p class="pause-time">Maradék idő: {formatTime(timeLeft)}</p>
					<button onclick={togglePause} class="resume-button {buttonColorClass}">
						▶️ Folytatás
					</button>
				</div>
			</div>
		{/if}

		{#if currentSymbol}
			<div class="symbol-display">
				{@html currentSymbol.svgHtml}
			</div>
		{:else}
			<div class="no-symbol">
				<p>Nincs több feladat</p>
			</div>
		{/if}
	</div>

	<!-- Bottom Section: Number Keypad -->
	<div class="keypad-section">
		<div class="keypad-grid">
			{#each buttons as digit (digit)}
				<button
					type="button"
					class="keypad-button {buttonColorClass}"
					onclick={() => handleAnswer(digit)}
					disabled={isPaused}
				>
					{digit}
				</button>
			{/each}
		</div>

		<!-- Pause Button (only for actual test) -->
		{#if !isPractice}
			<button
				type="button"
				onclick={togglePause}
				class="pause-button"
			>
				{#if isPaused}
					▶️ Folytatás
				{:else}
					⏸️ Szünet
				{/if}
			</button>
		{/if}
	</div>
</div>

<style>
	.sdmt-mobile-container {
		@apply w-full h-screen flex flex-col;
		@apply bg-gradient-to-b from-gray-50 to-gray-100;
		@apply dark:from-gray-900 dark:to-gray-800;
	}

	/* Top Section: Symbol Key */
	.symbol-key-section {
		@apply flex-shrink-0 px-2 py-3;
		@apply bg-white dark:bg-gray-800;
		@apply border-b-2 border-gray-200 dark:border-gray-700;
		@apply shadow-sm;
	}

	.key-grid {
		@apply grid grid-cols-9 gap-1;
		@apply max-w-screen-lg mx-auto;
	}

	.key-item {
		@apply flex flex-col items-center justify-center;
		@apply rounded-md p-1;
		@apply transition-colors duration-150;
	}

	.key-symbol {
		@apply w-6 h-6 mb-0.5;
	}

	.key-symbol :global(svg) {
		@apply w-full h-full;
	}

	.key-digit {
		@apply text-xs font-bold;
		@apply text-gray-700 dark:text-gray-300;
	}

	/* Status Bar */
	.status-bar {
		@apply flex-shrink-0 flex items-center justify-between;
		@apply px-4 py-2;
		@apply bg-white dark:bg-gray-800;
		@apply border-b border-gray-200 dark:border-gray-700;
	}

	.status-left,
	.status-right {
		@apply flex items-center gap-3;
	}

	.timer {
		@apply text-sm font-bold tabular-nums;
		@apply text-neuratos-blue-600 dark:text-neuratos-blue-400;
	}

	.timer-warning {
		@apply text-red-600 dark:text-red-400;
		animation: pulse 1s ease-in-out infinite;
	}

	.practice-label {
		@apply text-sm font-medium;
		@apply text-gray-600 dark:text-gray-400;
	}

	.score {
		@apply text-sm font-bold;
		@apply text-green-600 dark:text-green-400;
	}

	/* Middle Section: Current Symbol */
	.current-symbol-section {
		@apply flex-1 relative flex items-center justify-center;
		@apply px-4 py-8;
		@apply overflow-hidden;
	}

	.symbol-display {
		@apply w-full max-w-[280px] aspect-square;
		@apply flex items-center justify-center;
		animation: symbolFadeIn 200ms ease-out;
	}

	.symbol-display :global(svg) {
		@apply w-full h-full;
		filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
	}

	.no-symbol {
		@apply text-center text-gray-500 dark:text-gray-400;
	}

	@keyframes symbolFadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Feedback Overlay */
	.feedback-overlay {
		@apply absolute inset-0 z-20 flex items-center justify-center;
		@apply pointer-events-none;
		animation: feedbackPulse 400ms ease-in-out;
	}

	.feedback-correct {
		@apply bg-green-500 bg-opacity-20;
	}

	.feedback-incorrect {
		@apply bg-red-500 bg-opacity-20;
	}

	.feedback-icon {
		@apply text-8xl font-bold;
	}

	.feedback-correct .feedback-icon {
		@apply text-green-600 dark:text-green-400;
	}

	.feedback-incorrect .feedback-icon {
		@apply text-red-600 dark:text-red-400;
	}

	@keyframes feedbackPulse {
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
		@apply bg-gray-900 bg-opacity-90 backdrop-blur-sm;
	}

	.pause-content {
		@apply flex flex-col items-center;
		@apply bg-white dark:bg-gray-800 rounded-2xl;
		@apply p-8 shadow-2xl;
		@apply max-w-xs w-full mx-4;
	}

	.pause-icon {
		@apply text-6xl mb-4;
	}

	.pause-title {
		@apply text-2xl font-bold mb-2;
		@apply text-gray-900 dark:text-gray-100;
	}

	.pause-time {
		@apply text-sm text-gray-600 dark:text-gray-400 mb-6;
	}

	.resume-button {
		@apply w-full py-3 px-6 rounded-lg;
		@apply text-white font-bold text-lg;
		@apply shadow-lg;
		@apply transition-all duration-150;
	}

	/* Bottom Section: Keypad */
	.keypad-section {
		@apply flex-shrink-0 px-4 pb-6 pt-4;
		@apply bg-white dark:bg-gray-800;
		@apply border-t-2 border-gray-200 dark:border-gray-700;
		@apply shadow-inner;
	}

	.keypad-grid {
		@apply grid grid-cols-3 gap-3 mb-4;
		@apply max-w-md mx-auto;
	}

	.keypad-button {
		@apply aspect-square rounded-xl;
		@apply text-white text-3xl font-bold;
		@apply shadow-lg;
		@apply transition-all duration-100;
		@apply disabled:opacity-50 disabled:cursor-not-allowed;
		@apply focus:outline-none focus:ring-4 focus:ring-offset-2;
		@apply active:scale-95;
	}

	.pause-button {
		@apply w-full py-3 px-4 rounded-lg;
		@apply bg-gray-200 dark:bg-gray-700;
		@apply text-gray-800 dark:text-gray-200;
		@apply font-semibold text-sm;
		@apply shadow-md;
		@apply transition-all duration-150;
		@apply focus:outline-none focus:ring-2 focus:ring-gray-400;
		@apply active:scale-95;
		@apply max-w-md mx-auto block;
	}

	/* Pulse animation for timer warning */
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	/* Tablet landscape adjustments */
	@media (min-width: 640px) and (orientation: landscape) {
		.sdmt-mobile-container {
			@apply flex-row;
		}

		.symbol-key-section {
			@apply w-1/4 border-b-0 border-r-2;
		}

		.key-grid {
			@apply grid-cols-3 gap-2;
		}

		.key-symbol {
			@apply w-8 h-8;
		}

		.current-symbol-section {
			@apply w-1/2;
		}

		.keypad-section {
			@apply w-1/4 border-t-0 border-l-2;
		}

		.keypad-grid {
			@apply gap-2;
		}

		.keypad-button {
			@apply text-2xl;
		}
	}

	/* Extra small mobile screens */
	@media (max-width: 360px) {
		.key-symbol {
			@apply w-5 h-5;
		}

		.key-digit {
			@apply text-[10px];
		}

		.keypad-button {
			@apply text-2xl;
		}

		.symbol-display {
			@apply max-w-[220px];
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.feedback-overlay,
		.symbol-display {
			animation: none;
		}

		.keypad-button,
		.resume-button {
			transition: none;
		}

		.timer-warning {
			animation: none;
		}
	}

	/* Safe area insets for notched devices */
	@supports (padding: env(safe-area-inset-bottom)) {
		.keypad-section {
			padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
		}

		.symbol-key-section {
			padding-top: calc(0.75rem + env(safe-area-inset-top));
		}
	}
</style>
