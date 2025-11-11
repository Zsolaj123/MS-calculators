<script lang="ts">
	import { i18n } from '$lib/stores/i18n.svelte';

	function toggleLanguage() {
		i18n.toggle();
	}

	// Get current language for display
	const currentLang = $derived(i18n.lang.toUpperCase());
	const nextLang = $derived(i18n.lang === 'hu' ? 'EN' : 'HU');
</script>

<button
	type="button"
	onclick={toggleLanguage}
	class="language-switcher"
	aria-label="Switch language"
	title="Switch to {nextLang}"
>
	<span class="current-lang">{currentLang}</span>
	<svg
		class="switch-icon"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
	</svg>
</button>

<style>
	.language-switcher {
		@apply flex items-center gap-2;
		@apply px-3 py-2 rounded-lg;
		@apply bg-white dark:bg-gray-800;
		@apply border-2 border-gray-300 dark:border-gray-600;
		@apply text-gray-700 dark:text-gray-300;
		@apply font-semibold text-sm;
		@apply transition-all duration-200;
		@apply hover:bg-gray-50 dark:hover:bg-gray-700;
		@apply hover:border-neuratos-blue-500;
		@apply focus:outline-none focus:ring-2 focus:ring-neuratos-blue-500 focus:ring-offset-2;
		@apply active:scale-95;
	}

	.current-lang {
		@apply text-neuratos-blue-600 dark:text-neuratos-blue-400;
		@apply font-bold;
		@apply min-w-[2rem];
		@apply text-center;
	}

	.switch-icon {
		@apply w-4 h-4;
		@apply text-gray-500 dark:text-gray-400;
	}

	.language-switcher:hover .switch-icon {
		@apply text-neuratos-blue-600 dark:text-neuratos-blue-400;
	}
</style>
