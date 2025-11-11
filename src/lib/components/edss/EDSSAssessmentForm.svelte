<script lang="ts">
	import { edssStore } from '$lib/stores/edss.svelte';
	import { FUNCTIONAL_SYSTEMS, AMBULATION_OPTIONS } from '$lib/data/edss/functional-systems';
	import type { EDSSFunctionalSystems } from '$lib/types';

	let functionalSystems = $derived(edssStore.functionalSystems);
	let ambulation = $derived(edssStore.ambulation);

	// Track which sections are expanded
	let expandedSections = $state<Record<string, boolean>>({
		pyramidal: true,
		cerebellar: false,
		brainstem: false,
		sensory: false,
		bowelBladder: false,
		visual: false,
		cerebral: false
	});

	function toggleSection(system: string) {
		expandedSections[system] = !expandedSections[system];
	}

	function handleFunctionalSystemChange(
		system: keyof EDSSFunctionalSystems,
		event: Event
	) {
		const value = parseInt((event.target as HTMLSelectElement).value);
		edssStore.setFunctionalSystemScore(system, value);
	}

	function handleAmbulationChange(event: Event) {
		const value = parseInt((event.target as HTMLSelectElement).value);
		edssStore.setAmbulation(value);
	}

	function handleCalculate() {
		try {
			edssStore.calculateScore();
		} catch (error) {
			alert(`Hiba az EDSS számítás során: ${error}`);
		}
	}

	// Get icon for functional system
	function getSystemIcon(system: string): string {
		const icons: Record<string, string> = {
			pyramidal: '💪',
			cerebellar: '⚖️',
			brainstem: '🧠',
			sensory: '👋',
			bowelBladder: '🚽',
			visual: '👁️',
			cerebral: '🤔'
		};
		return icons[system] || '📊';
	}
</script>

<div class="edss-assessment-form">
	<h2 class="text-2xl font-bold mb-6 text-neuratos-blue-700">
		📋 Funkcionális Rendszerek Értékelése
	</h2>

	<!-- Functional Systems -->
	<div class="functional-systems space-y-4 mb-8">
		{#each Object.entries(FUNCTIONAL_SYSTEMS) as [systemKey, systemDef] (systemKey)}
			<div class="system-card">
				<button
					type="button"
					class="system-header"
					onclick={() => toggleSection(systemKey)}
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">{getSystemIcon(systemKey)}</span>
						<div class="text-left flex-1">
							<h3 class="font-semibold text-lg">{systemDef.name}</h3>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								{systemDef.description}
							</p>
						</div>
						<div class="score-badge">
							{functionalSystems[systemKey as keyof EDSSFunctionalSystems]}
						</div>
					</div>
					<span class="expand-icon" class:expanded={expandedSections[systemKey]}>
						▼
					</span>
				</button>

				{#if expandedSections[systemKey]}
					<div class="system-content">
						<label for={systemKey} class="block text-sm font-medium mb-2">
							Válassz fokozatot (0-{systemDef.maxScore}):
						</label>
						<select
							id={systemKey}
							value={functionalSystems[systemKey as keyof EDSSFunctionalSystems]}
							onchange={(e) => handleFunctionalSystemChange(systemKey as keyof EDSSFunctionalSystems, e)}
							class="select w-full"
						>
							{#each systemDef.options as option (option.value)}
								<option value={option.value}>
									{option.label}
								</option>
							{/each}
						</select>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Ambulation Assessment -->
	<div class="ambulation-section mb-8">
		<h2 class="text-2xl font-bold mb-4 text-neuratos-blue-700">
			🚶 Járóképesség Értékelése
		</h2>
		<div class="system-card">
			<div class="system-content">
				<label for="ambulation" class="block text-sm font-medium mb-2">
					Válaszd ki a beteg járóképességét legjobban leíró opciót:
				</label>
				<select
					id="ambulation"
					value={ambulation}
					onchange={handleAmbulationChange}
					class="select w-full"
				>
					{#each AMBULATION_OPTIONS as option (option.value)}
						<option value={option.value}>
							{option.label}
						</option>
					{/each}
				</select>
				<p class="text-xs text-gray-500 mt-2">
					💡 A járóképesség értékelése kritikus az EDSS 4.0 feletti pontszámok meghatározásában
				</p>
			</div>
		</div>
	</div>

	<!-- Calculate Button -->
	<div class="flex justify-center">
		<button
			type="button"
			onclick={handleCalculate}
			class="btn btn-primary px-8 py-4 text-lg"
		>
			🧮 EDSS Számítás
		</button>
	</div>
</div>

<style>
	.edss-assessment-form {
		@apply w-full;
	}

	.system-card {
		@apply bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden;
		@apply border border-gray-200 dark:border-gray-700;
	}

	.system-header {
		@apply w-full p-4 flex items-center justify-between;
		@apply hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors;
		@apply cursor-pointer;
	}

	.score-badge {
		@apply bg-neuratos-blue-500 text-white;
		@apply rounded-full w-12 h-12 flex items-center justify-center;
		@apply font-bold text-xl;
	}

	.expand-icon {
		@apply text-gray-400 transition-transform duration-200 ml-4;
	}

	.expand-icon.expanded {
		@apply rotate-180;
	}

	.system-content {
		@apply p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700;
	}

	.ambulation-section {
		@apply border-t-4 border-neuratos-blue-300 pt-6;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.system-header {
			@apply p-3;
		}

		.score-badge {
			@apply w-10 h-10 text-lg;
		}
	}
</style>
