<script lang="ts">
	import { sdmtStore } from '$lib/stores/sdmt.svelte';

	let symbolDigitKey = $derived(sdmtStore.symbolDigitKey);
	let symbolSize = $derived(sdmtStore.symbolSize);
	let theme = $derived(sdmtStore.theme);
	let colorScheme = $derived(sdmtStore.colorScheme);
	let symbolCount = $derived(sdmtStore.getSymbolCount());

	// Symbol size in pixels (smaller for key display)
	const symbolSizePx = $derived.by(() => {
		const sizes = {
			small: 36,  // Smaller than test symbols
			medium: 48,
			large: 60
		};
		return sizes[symbolSize];
	});

	// Color scheme classes for key backgrounds
	const keyColorClass = $derived.by(() => {
		const colorClasses = {
			blue: 'bg-neuratos-blue-50 border-neuratos-blue-200 dark:bg-neuratos-blue-900 dark:border-neuratos-blue-700',
			green: 'bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700',
			purple: 'bg-purple-50 border-purple-200 dark:bg-purple-900 dark:border-purple-700',
			teal: 'bg-teal-50 border-teal-200 dark:bg-teal-900 dark:border-teal-700'
		};
		return colorClasses[colorScheme];
	});
</script>

<div class="sdmt-key-container" class:dark={theme === 'dark'}>
	<div class="key-header mb-3">
		<h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
			🔑 Referencia Kulcs
		</h3>
		<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
			Használd ezt a kulcsot a válaszadáshoz
		</p>
	</div>

	<div
		class="key-grid grid-cols-3"
		class:sm:grid-cols-6={symbolCount === 6}
		class:sm:grid-cols-9={symbolCount === 9}
	>
		{#each symbolDigitKey as item (item.symbolIndex)}
			<div class="key-item {keyColorClass}">
				<div
					class="symbol-container"
					style="width: {symbolSizePx}px; height: {symbolSizePx}px;"
				>
					{@html item.svgHtml}
				</div>
				<div class="digit-display">
					{item.digit}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.sdmt-key-container {
		@apply w-full;
	}

	.key-header {
		@apply text-center;
	}

	.key-grid {
		@apply grid gap-2;
	}

	.key-item {
		@apply flex flex-col items-center justify-center;
		@apply border-2 rounded-lg p-2;
		@apply transition-all duration-200;
		@apply hover:shadow-md;
	}

	.symbol-container {
		@apply flex items-center justify-center;
		@apply mb-2;
	}

	.symbol-container :global(svg) {
		@apply w-full h-full;
	}

	.digit-display {
		@apply text-2xl font-bold;
		@apply text-gray-800 dark:text-gray-100;
		@apply bg-white dark:bg-gray-800;
		@apply rounded-md px-3 py-1;
		@apply shadow-sm;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.key-grid {
			@apply gap-1.5;
		}

		.key-item {
			@apply p-1.5;
		}

		.digit-display {
			@apply text-xl px-2 py-0.5;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.key-item {
			transition: none;
		}
	}
</style>
